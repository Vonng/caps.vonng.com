# Capslock Enhancement Documentation

[![Website](https://img.shields.io/badge/website-capslock.vonng.com-17385c?style=flat-square)](https://capslock.vonng.com/)
[![Theme target](https://img.shields.io/badge/OINK-v1.3.0-17385c?style=flat-square)](https://github.com/pgsty/oink)
[![License](https://img.shields.io/badge/license-Apache--2.0-17385c?style=flat-square)](LICENSE)

This repository publishes the bilingual Capslock Enhancement guide and its
interactive Karabiner configurator with Hugo Extended and OINK 1.3.0.

The product source, Karabiner JSON, and canonical documentation live in
[`Vonng/Capslock`](https://github.com/Vonng/Capslock). This site intentionally
keeps only the content and assets needed to build `capslock.vonng.com`.

## Local development

Install Git, Go, and Hugo Extended 0.166.0 or newer. With the OINK checkout at
`../oink`, run:

```sh
make dev
```

This applies a one-command module replacement that points Hugo at the sibling
theme without creating `go.work`. To validate an intentional local theme change,
run:

```sh
make check-local
```

`make check` and `make serve` deliberately resolve the exact published OINK
version in `go.mod`.

## Site-specific extensions

- `data/home/en.yaml` and `data/home/zh.yaml` compose the product landing page
  at `/` and `/zh/` entirely from OINK's built-in landing sections. There is no
  local home layout.
- `content/docs/` contains the paired multi-page manual: overview,
  installation, navigation, developer workflows, and system/reference pages.
  Shortcuts use the theme's `kbd` component throughout.
- `layouts/customizer.html` gives the configurator a full-width OINK shell.
- `layouts/_shortcodes/capslock-configurator.html` reads the checked-in
  Karabiner JSON and loads the scoped configurator assets.
- `assets/scss/_styles_project.scss` holds only manual and configurator
  tweaks; every landing style comes from the theme.

All general navigation, search, responsive shell, dark mode, table of contents,
language switching, page actions, analytics, and comments come from OINK.

## Publishing

`.github/workflows/ci.yaml` runs `make check` on every push and pull request:
a warning-strict build plus the source, link, route and configurator-data
gates. It does not deploy. The site is published from Cloudflare Pages, which
builds `make build` into `public/`.

## License

Capslock Enhancement, this documentation, and the site-specific configuration
are licensed under the [Apache License 2.0](LICENSE). OINK and bundled
third-party components retain their own licenses and notices.
