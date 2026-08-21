#!/usr/bin/env python3
"""Validate rendered Capslock routes, assets, fragments, and canonical targets.

Run this after Hugo has built the site. External hosts are deliberately not
requested: this gate proves the site's own link contract without making a local
build depend on third-party availability.
"""

from __future__ import annotations

import argparse
import collections
import html.parser
import pathlib
import re
import sys
import urllib.parse


SITE_URL = "https://capslock.vonng.com"
SITE_HOSTS = {"capslock.vonng.com", "www.capslock.vonng.com"}
REQUIRED_ROUTES = {
    "/",
    "/zh/",
    "/docs/",
    "/zh/docs/",
    "/docs/getting-started/",
    "/zh/docs/getting-started/",
    "/docs/navigation/",
    "/zh/docs/navigation/",
    "/docs/workflows/",
    "/zh/docs/workflows/",
    "/docs/reference/",
    "/zh/docs/reference/",
    "/customizer/",
    "/zh/customizer/",
}
FORBIDDEN_MARKERS = {"PG Exporter", "exp.pgsty.com", "pg_exporter"}
REQUIRED_LANGUAGES = {
    "/": "en-US",
    "/docs/": "en-US",
    "/docs/getting-started/": "en-US",
    "/docs/navigation/": "en-US",
    "/docs/workflows/": "en-US",
    "/docs/reference/": "en-US",
    "/customizer/": "en-US",
    "/zh/": "zh-CN",
    "/zh/docs/": "zh-CN",
    "/zh/docs/getting-started/": "zh-CN",
    "/zh/docs/navigation/": "zh-CN",
    "/zh/docs/workflows/": "zh-CN",
    "/zh/docs/reference/": "zh-CN",
    "/zh/customizer/": "zh-CN",
}
REQUIRED_CONFIGURATOR_SELECTORS = (
    'data-capslock-configurator',
    'data-capslock-config',
    'data-plane-table',
    'data-export-config',
)
LINK_ATTRIBUTES = {"href", "src"}
SKIP_SCHEMES = {"data", "javascript", "mailto", "tel", "blob"}


class DocumentParser(html.parser.HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.links: list[str] = []
        self.redirect_target: str | None = None
        self.html_lang: str | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = {key.lower(): value for key, value in attrs if value is not None}
        if tag == "html":
            self.html_lang = attributes.get("lang")
        if tag == "meta" and attributes.get("http-equiv", "").lower() == "refresh":
            match = re.search(r"(?:^|;)\s*url\s*=\s*(.+)\s*$", attributes.get("content", ""), re.I)
            if match:
                self.redirect_target = match.group(1).strip(" \"'")
        for key, value in attrs:
            if value is None:
                continue
            if key == "id" or (tag == "a" and key == "name"):
                self.ids.add(value)
            if key in LINK_ATTRIBUTES:
                self.links.append(value.strip())


def parse_document(path: pathlib.Path) -> DocumentParser:
    parser = DocumentParser()
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))
    parser.close()
    return parser


def route_for_file(public: pathlib.Path, path: pathlib.Path) -> str:
    relative = path.relative_to(public).as_posix()
    if relative == "index.html":
        return "/"
    if relative.endswith("/index.html"):
        return "/" + relative[: -len("index.html")]
    return "/" + relative


def target_candidates(public: pathlib.Path, route: str) -> list[pathlib.Path]:
    route = urllib.parse.unquote(route)
    relative = route.lstrip("/")
    direct = public / relative
    candidates: list[pathlib.Path] = []
    if route.endswith("/") or direct.suffix == "":
        candidates.append(direct / "index.html")
    else:
        candidates.append(direct)
    if direct.suffix == "" and relative:
        candidates.append(public / f"{relative}.html")
    return candidates


def resolve_internal_url(source_route: str, raw_url: str) -> tuple[str, str] | None:
    if not raw_url or raw_url == "#":
        return None
    parsed = urllib.parse.urlsplit(raw_url)
    if parsed.scheme.lower() in SKIP_SCHEMES:
        return None
    if parsed.netloc and parsed.hostname not in SITE_HOSTS:
        return None
    if parsed.scheme and parsed.scheme not in {"http", "https"}:
        return None

    base = f"{SITE_URL}{source_route}"
    absolute = urllib.parse.urlsplit(urllib.parse.urljoin(base, raw_url))
    if absolute.hostname and absolute.hostname not in SITE_HOSTS:
        return None
    return absolute.path or "/", urllib.parse.unquote(absolute.fragment)


def main() -> int:
    argument_parser = argparse.ArgumentParser()
    argument_parser.add_argument("public", nargs="?", default="public", type=pathlib.Path)
    args = argument_parser.parse_args()
    public = args.public.resolve()
    if not public.is_dir():
        argument_parser.error(f"rendered site directory does not exist: {public}")

    html_files = sorted(public.rglob("*.html"))
    documents: dict[pathlib.Path, DocumentParser] = {
        path.resolve(): parse_document(path) for path in html_files
    }

    failures: dict[str, list[str]] = collections.defaultdict(list)
    rendered_routes = {route_for_file(public, path) for path in html_files}
    for route in sorted(REQUIRED_ROUTES - rendered_routes):
        failures[f"missing required route {route}"].append("site contract")

    for route, expected_language in REQUIRED_LANGUAGES.items():
        route_file = next(
            (candidate.resolve() for candidate in target_candidates(public, route) if candidate.is_file()),
            None,
        )
        if route_file is None:
            continue
        actual_language = documents[route_file].html_lang
        if actual_language != expected_language:
            failures[
                f"route {route} has lang {actual_language!r}, expected {expected_language!r}"
            ].append("site contract")

    for route in ("/customizer/", "/zh/customizer/"):
        route_file = next(
            (candidate.resolve() for candidate in target_candidates(public, route) if candidate.is_file()),
            None,
        )
        if route_file is None:
            continue
        source = route_file.read_text(encoding="utf-8", errors="replace")
        for selector in REQUIRED_CONFIGURATOR_SELECTORS:
            if selector not in source:
                failures[f"configurator route {route} is missing {selector}"].append(route)

    for source_path in html_files:
        source = source_path.read_text(encoding="utf-8", errors="replace")
        source_route = route_for_file(public, source_path)
        for marker in FORBIDDEN_MARKERS:
            if marker in source:
                failures[f"placeholder marker {marker!r}"].append(source_route)

    config_path = public.parent / "data" / "capslock-v3.json"
    if not config_path.is_file():
        failures["missing configurator data data/capslock-v3.json"].append("site contract")
    else:
        try:
            import json

            config = json.loads(config_path.read_text(encoding="utf-8"))
            if not isinstance(config.get("rules"), list) or not config["rules"]:
                failures["configurator data has no rules"].append("data/capslock-v3.json")
        except (OSError, ValueError) as error:
            failures[f"invalid configurator data: {error}"].append("data/capslock-v3.json")

    checked = 0
    for source_path, document in documents.items():
        source_route = route_for_file(public, source_path)
        for raw_url in document.links:
            target = resolve_internal_url(source_route, raw_url)
            if target is None:
                continue
            checked += 1
            route, fragment = target
            candidates = target_candidates(public, route)
            existing = next((candidate.resolve() for candidate in candidates if candidate.is_file()), None)
            if existing is None:
                failures[f"missing target {route}"].append(source_route)
                continue
            if existing.suffix.lower() == ".html":
                target_document = documents.get(existing)
                if target_document is None:
                    target_document = parse_document(existing)
                    documents[existing] = target_document
                if target_document.redirect_target:
                    failures[
                        f"non-canonical redirect target {route} -> {target_document.redirect_target}"
                    ].append(source_route)
                    continue
            if fragment and existing.suffix.lower() == ".html":
                if fragment not in target_document.ids:
                    failures[f"missing fragment {route}#{fragment}"].append(source_route)

    if failures:
        print(f"internal link check failed: {len(failures)} distinct target errors", file=sys.stderr)
        for problem, sources in sorted(failures.items()):
            unique_sources = sorted(set(sources))
            sample = ", ".join(unique_sources[:5])
            remainder = len(unique_sources) - 5
            if remainder > 0:
                sample += f", and {remainder} more"
            print(f"- {problem} <- {sample}", file=sys.stderr)
        return 1

    print(f"internal link check passed: {checked} rendered internal references across {len(html_files)} HTML files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
