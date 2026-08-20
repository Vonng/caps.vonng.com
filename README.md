# Capslock Enhancement Documentation

[![Website](https://img.shields.io/badge/website-capslock.vonng.com-17385c?style=flat-square)](https://capslock.vonng.com/)
[![Theme target](https://img.shields.io/badge/OINK-v0.6.0-17385c?style=flat-square)](https://github.com/pgsty/oink)
[![License](https://img.shields.io/badge/license-Apache--2.0-17385c?style=flat-square)](LICENSE)

This repository publishes the bilingual Capslock Enhancement guide and its
interactive Karabiner configurator with Hugo Extended and OINK 0.5.1.

The product source, Karabiner JSON, and canonical documentation live in
[`Vonng/Capslock`](https://github.com/Vonng/Capslock). This site intentionally
keeps only the content and assets needed to build `capslock.vonng.com`.

## Local development

Install Git, Go, and Hugo Extended 0.160.1 or newer. With the OINK checkout at
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

- `layouts/index.html` renders the existing long-form guide at the language
  root instead of OINK's data-driven landing page.
- `layouts/customizer.html` gives the configurator a full-width OINK shell.
- `layouts/_shortcodes/capslock-configurator.html` reads the checked-in
  Karabiner JSON and loads the scoped configurator assets.

All general navigation, search, responsive shell, dark mode, table of contents,
language switching, page actions, and comments come from OINK.

## License

Capslock Enhancement, this documentation, and the site-specific configuration
are licensed under the [Apache License 2.0](LICENSE). OINK and bundled
third-party components retain their own licenses and notices.
