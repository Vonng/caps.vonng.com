# AGENTS.md

`caps.vonng.com` is the standalone bilingual documentation site for Capslock
Enhancement. It uses Hugo Extended and the OINK theme.

## Content and URL conventions

- The English manual is `content/_index.md` and renders at `/`.
- The Simplified Chinese peer is `content/_index.zh.md` and renders at `/zh/`.
- The interactive configurator uses the paired `content/customizer.*.md` pages
  and renders at `/customizer/` and `/zh/customizer/`.
- Keep English `.md` and Simplified Chinese `.zh.md` content in pairs.
- Internal links are root-relative; Chinese links include `/zh/`.
- The current Karabiner configuration is the checked-in
  `data/capslock-v3.json`, copied from the Capslock source repository during a
  content sync. The configurator reads this file at Hugo build time.

## Authority and synchronization

The source documentation and current configuration live in
`~/www/Capslock`. Copy the current working-tree versions of these surfaces when
updating the site:

- `content/_index.md` and `content/_index.zh.md`
- `content/customizer.md` and `content/customizer.zh.md`
- `static/img/`
- `assets/css/capslock-configurator.css`
- `assets/js/capslock-configurator.js`
- `layouts/_shortcodes/capslock-configurator.html`
- `mac_v3/capslock.json` to `data/capslock-v3.json`

Do not alter the source repository as part of a site-only migration.

## Theme boundary

- OINK owns navigation, responsive shell, table of contents, offline search,
  language switching, dark mode, page actions, comments, and shared content
  shortcodes.
- `layouts/index.html` is intentionally local because the root URL is the
  manual itself, while OINK's default home template expects landing-page data.
- `layouts/customizer.html` and the `capslock-configurator` shortcode are the
  only product-specific interactive view. Keep its CSS and JavaScript scoped
  under `.caps-configurator`.
- Do not copy general layouts or runtimes from OINK into this repository.
- Local development uses the sibling `../oink` checkout through the generated,
  ignored `go.work`; published builds use the exact module revision in
  `go.mod`.

## Verification and publishing

- Run `make check` after content, layout, asset, or configuration changes. It
  performs a warning-strict Hugo build plus source, rendered-Markdown, internal
  link, route, and configurator-data checks.
- Run `make check-local` only when intentionally validating the sibling OINK
  checkout instead of the pinned release.
- Inspect `/`, `/zh/`, `/customizer/`, and `/zh/customizer/` in a browser at
  desktop and mobile widths after a migration.
- Do not treat a local Hugo build as a hosted deployment.
- Verify the remote repository before any push or deployment.

## License

Capslock Enhancement, its documentation, site-specific assets, and
configuration are distributed under Apache License 2.0. OINK and third-party
software retain their own notices and licenses.
