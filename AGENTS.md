# AGENTS.md

`caps.vonng.com` is the standalone bilingual product and documentation site
for Capslock Enhancement. It uses Hugo Extended and the OINK theme.

## OINK build baseline

As of 2026-11-07, this site uses OINK v1.5.1, Hugo Extended 0.168.0, and Go 1.27.3.
Keep CI and local builds on this baseline. Do not enable `--panicOnWarning`
or `HUGO_PANICONWARNING`; keep warnings visible and review them. The upstream
LibSass deprecation warning is accepted. No external Sass compiler is required.

## Content and URL conventions

- The product home at `/` and `/zh/` is an OINK landing page. Its sections are
  composed in `data/home/en.yaml` and `data/home/zh.yaml`; the paired
  `content/_index.*.md` pages carry only front matter plus a short body used by
  the search index and the `llms.txt` output.
- The bilingual manual lives under `content/docs/` and renders at `/docs/`
  and `/zh/docs/`, with one paired page per topic.
- The interactive configurator uses the paired `content/customizer.*.md` pages
  and renders at `/customizer/` and `/zh/customizer/`.
- Keep English `.md` and Simplified Chinese `.zh.md` content in pairs, and keep
  the two `data/home/*.yaml` files structurally identical.
- Internal links are root-relative; Chinese links include `/zh/`. Landing
  section URLs are language-relative instead (`docs/getting-started/`), because
  OINK resolves them with `relLangURL`.
- The current Karabiner configuration is the checked-in
  `data/capslock-v3.json`, copied from the Capslock source repository during a
  content sync. The configurator reads this file at Hugo build time.
- Mapping and control-plane counts quoted on the landing page and in the manual
  are derived from `data/capslock-v3.json`; recount them whenever that file is
  resynchronized. Where the upstream README and the shipped configuration
  disagree, the configuration wins — the manual documents what a reader's
  keyboard will actually do.
- The two testimonials on the landing page reproduce the user emails in full,
  from `static/img/feedback.jpg` and `static/img/feedback_zh.jpg`. Do not
  paraphrase or trim them.

## Authority and synchronization

The source documentation and current configuration live in `~/www/Capslock`.
Use its current working-tree content as the semantic authority when updating
the split pages under `content/docs/`; do not collapse the manual back into the
root page or move landing copy out of `data/home/`. Synchronize these surfaces:

- the paired topic pages under `content/docs/`
- `content/customizer.md` and `content/customizer.zh.md`
- `static/img/`
- `assets/css/capslock-configurator.css`
- `assets/js/capslock-configurator.js`
- `layouts/_shortcodes/capslock-configurator.html`
- `mac_v3/capslock.json` to `data/capslock-v3.json`

`static/img/keyboard-hero.webp` and `static/img/keyboard-hero-dark.webp` are the
exception: they are site-owned assets derived from the synchronized
`static/img/keyboard.jpg`, trimmed for the landing hero and the manual's
theme-aware figures. Regenerate them after a `static/img/` sync with:

```sh
magick static/img/keyboard.jpg -fuzz 2% -trim +repage -resize 1600x \
  -quality 88 -define webp:method=6 static/img/keyboard-hero.webp
magick static/img/keyboard.jpg -colorspace HSL -channel B -negate +channel \
  -colorspace sRGB -fuzz 2% -trim +repage -resize 1600x +level 9%,96% \
  -modulate 108,112 -quality 88 -define webp:method=6 \
  static/img/keyboard-hero-dark.webp
```

Do not alter the source repository as part of a site-only migration.

## Theme boundary

- OINK owns navigation, the responsive shell, the landing page, table of
  contents, offline search, language switching, dark mode, page actions,
  analytics, comments, and shared content shortcuts.
- The home page uses OINK's landing registry only. Do not add a local
  `layouts/index.html` or a home partial; express a new idea as another
  built-in section in `data/home/*.yaml` instead. The single landing style this
  site owns is the hero wordmark rule in `assets/scss/_styles_project.scss`,
  scoped to `:lang(zh)`: Chinese sets 让 CapsLock over a tracked-out 再次伟大,
  so both lines are justified to one measure, while English breaks into three
  ragged lines and needs no help. Keep every `title_lines` entry a plain string
  so the lockup stays one ink colour.
- Landing copy above the family cards must fit on one line at 1440px: hero
  lines, metric labels and descriptions, section descriptions, and every
  capability title, motto, bullet and value. Long points become extra short
  bullets rather than wrapped ones. `bin/check_landing_lines.mjs` measures it.
- OINK's regular docs shell owns all pages under `content/docs/`; do not fork
  or copy its docs layouts locally.
- Manual pages use native components rather than hand-written HTML: `kbd` for
  every shortcut, `> [!NOTE]`-style callouts, `steps`, `cards`, `badge`, and
  table `{caption=…}` lines.
- The one deliberate raw-HTML exception is the Karabiner import link. Hugo's
  Markdown link renderer rewrites a `karabiner://` href to `#ZgotmplZ`, so both
  install pages write `<a class="td-import-link" href="karabiner://…">` and the
  site styles that class. A raw anchor keeps the scheme; a Markdown link
  silently loses it.
- Keep mapping tables no wider than five or six columns. A ten-column table
  collapses into unreadable wrapping inside the docs shell; split it by plane
  group instead.
- `layouts/customizer.html` and the `capslock-configurator` shortcode are the
  only product-specific interactive view. Keep its CSS and JavaScript scoped
  under `.caps-configurator`.
- `assets/scss/_styles_project.scss` is limited to manual and configurator
  adjustments plus the `.only-light` / `.only-dark` figure pair. Both
  theme-image selectors must stay anchored on `html`, because OINK also sets
  `data-bs-theme` on individual elements.
- Do not copy general layouts or runtimes from OINK into this repository.
- Local development uses a command-scoped module replacement for the sibling
  `../oink` checkout; published builds use the exact module revision in
  `go.mod` without generating a workspace file.

## Verification and publishing

- Run `make check` after content, layout, asset, or configuration changes. It
  performs a production Hugo build plus source, rendered-Markdown, internal
  link, route, and configurator-data checks.
- Run `make check-local` only when intentionally validating the sibling OINK
  checkout instead of the pinned release.
- Inspect `/`, `/zh/`, `/docs/`, `/zh/docs/`, `/customizer/`, and
  `/zh/customizer/` in a browser at desktop and mobile widths, in both colour
  schemes, after a migration; smoke-test every split documentation route as
  part of link QA.
- Do not treat a local Hugo build as a hosted deployment.
- Verify the remote repository before any push or deployment.
- `.github/workflows/ci.yaml` only builds and verifies. Publishing happens on
  Cloudflare Pages, outside this repository; do not add a GitHub Pages deploy
  step back.

## Analytics and comments

- Google Analytics is configured through Hugo's own service key,
  `services.googleAnalytics.id`; OINK emits the tag from the internal template.
- Comments are giscus, configured in `params.comments`. They are enabled on
  manual pages through the `content/docs/` cascade and deliberately switched
  off on the home and configurator pages.

## License

Capslock Enhancement, its documentation, site-specific assets, and
configuration are distributed under Apache License 2.0. OINK and third-party
software retain their own notices and licenses.

## Git 内容与大文件规则

用户于 2026-10-10 明确的通用仓库规则：

- 仓库默认保存源代码、配置和必要的轻量文档、元数据。构建产物、可执行文件、软件包、容器/虚拟机镜像、下载压缩包、数据库导出和大体积原始数据默认不进入 Git；文本格式的数据大文件同样需要检查。
- 在工作树内下载或生成上述文件之前，先选择仓库外的制品/数据位置，或补上合理的 `.gitignore` 规则并验证实际路径已被忽略，防止暂存和代理恢复/差异快照将它们写入 Git 对象库。
- 暂存、提交前检查新增文件的大小、类型和 staged 文件列表，只加入本次需要的源文件；不得用强制添加绕过忽略规则。优先保留来源清单、校验值及可复现的下载/构建方法。
- 对二进制素材、数据集或生成文件是否应纳入版本控制拿不准时，先问用户，再暂存或提交；确需例外时也先取得用户明确指示。
- 本规则不授权删除已有文件、stash、恢复快照或改写 Git 历史。忽略规则不会清除已存在的 Git 对象，历史清理需要单独明确范围。
