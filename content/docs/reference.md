---
title: System Functions and Reference
linkTitle: System & Reference
description: Function keys, screenshots, symbols, control-plane notation, versions, customization, and troubleshooting.
icon: fa-solid fa-table-list
weight: 40
---

This page collects the mappings and project details you look up rather than
learn in sequence.

## Function and system keys {#functional}

F1–F12 behave as standard function keys by default; hold Hyper to send their
media or system functions instead. The cyan block covers the whole top row plus
the screenshot keys.

| Key | Hyper action | + {{< kbd "⌘" >}} |
| :--: | :-- | :-- |
| {{< kbd "`" >}} | Area screenshot to clipboard | Area screenshot to file |
| {{< kbd "F1" >}} / {{< kbd "F2" >}} | Brightness down / up | Desktop 1 / 2 |
| {{< kbd "F3" >}} | Mission Control | Desktop 3 |
| {{< kbd "F4" >}} | Spotlight | — |
| {{< kbd "F5" >}} / {{< kbd "F6" >}} | Keyboard light down / up | — |
| {{< kbd "F7" >}} / {{< kbd "F8" >}} / {{< kbd "F9" >}} | Previous / play-pause / next | — |
| {{< kbd "F10" >}} / {{< kbd "F11" >}} / {{< kbd "F12" >}} | Mute / volume down / volume up | — |
| {{< kbd "F13" >}} | Full screenshot to clipboard | Full screenshot to file |
| {{< kbd "F14" >}} | Screenshot menu | Legacy Touch Bar screenshot |
| {{< kbd "F15" >}} | Play / pause | — |
{caption="Karabiner-Elements 15.1 and later follow System Settings → Keyboard → Keyboard Shortcuts… → Function Keys"}

The screenshot keys follow one convention: the plain Hyper chord puts the
capture on the **clipboard**, and adding {{< kbd "⌘" >}} writes it to a
**file** on the desktop.

| Chord | Emits | Result |
| :-- | :-- | :-- |
| {{< kbd "✱" "`" >}} | {{< kbd "⌃" "⇧" "⌘" "4" >}} | Select an area → clipboard |
| {{< kbd "✱" "⌘" "`" >}} | {{< kbd "⇧" "⌘" "4" >}} | Select an area → file |
| {{< kbd "✱" "F13" >}} | {{< kbd "⌃" "⇧" "⌘" "3" >}} | Whole screen → clipboard |
| {{< kbd "✱" "⌘" "F13" >}} | {{< kbd "⇧" "⌘" "3" >}} | Whole screen → file |
| {{< kbd "✱" "F14" >}} | {{< kbd "⇧" "⌘" "5" >}} | Screenshot and recording menu |

> [!NOTE]
> Enable the Desktop 1/2/3 shortcuts under **System Settings → Keyboard →
> Keyboard Shortcuts… → Mission Control** before using
> {{< kbd "⌘" "F1" >}}–{{< kbd "⌘" "F3" >}}; macOS ships them disabled. Touch
> Bar behaviour applies only to legacy Touch Bar Macs — see the
> [official troubleshooting note](https://karabiner-elements.pqrs.org/docs/help/troubleshooting/touch-bar-function-keys/).

The six-key navigation cluster on a full-size keyboard gives the same three
system controls in smaller steps, by emitting {{< kbd "⇧" "⌥" >}} together with
the media key — macOS's own quarter-step modifier.

| Cluster keys | Action |
| :-- | :-- |
| {{< kbd "Insert" >}} / {{< kbd "⌦" >}} | Fine brightness up / down |
| {{< kbd "↖" >}} / {{< kbd "↘" >}} | Fine keyboard-light up / down |
| {{< kbd "Page Up" >}} / {{< kbd "Page Down" >}} | Fine volume up / down |
{caption="Quarter steps instead of the full increments on F1–F12"}

## Symbols {#symbols}

| Glyph | Name | Glyph | Name |
| :--: | :-- | :--: | :-- |
| {{< kbd "⇪" >}} | Caps Lock | {{< kbd "✱" >}} | Hyper |
| {{< kbd "⎋" >}} | Escape | {{< kbd "␣" >}} | Space |
| {{< kbd "⌘" >}} | Command | {{< kbd "⌥" >}} | Option |
| {{< kbd "⌃" >}} | Control | {{< kbd "⇧" >}} | Shift |
| {{< kbd "↩" >}} | Return | {{< kbd "⌤" >}} | Keypad Enter |
| {{< kbd "⇥" >}} {{< kbd "⇤" >}} | Tab / Back-tab | {{< kbd "⇭" >}} | Num Lock |
| {{< kbd "←" >}} {{< kbd "↓" >}} {{< kbd "↑" >}} {{< kbd "→" >}} | Arrow keys | {{< kbd "↖" >}} {{< kbd "↘" >}} | Home / End |
| {{< kbd "⇞" >}} {{< kbd "⇟" >}} | Page Up / Page Down | {{< kbd "⌫" >}} {{< kbd "⌦" >}} | Delete / Forward Delete |
| ⏫ ⏬ | Faster / slower | 🖲️ | Mouse wheel |
| 🖱️L / 🖱️R / 🖱️M | Buttons 1 / 2 / 3 | 🖱️B / 🖱️F | Buttons 4 / 5, back and forward |
{caption="The notation used across this manual and in the keyboard maps"}

The {{< kbd "✱" >}} symbol is a heavy asterisk. The ordinary asterisk has ASCII
code 42 — the answer to life, the universe, and everything.

## How a rule is written {#rule-anatomy}

Every mapping in the configuration has the same shape. Reading one makes the
whole file legible, and makes the [customization](#customize) section below far
less intimidating:

```yaml
- description: 'control + h = ctrl + left (prev desktop)'
  type: basic
  from:
    key_code: h
    modifiers:
      mandatory: [left_control, right_command, right_control, right_shift, right_option]
  to:
    - key_code: left_arrow
      modifiers: [left_control]
```

The four `right_*` modifiers in `mandatory` are Hyper itself — they appear in
every single rule. Whatever else sits beside them, `left_control` here, selects
the control plane. `to` is what the application actually receives.

## Version history {#versions}

| Version | Years | Platform | Status |
| :-- | :-- | :-- | :-- |
| [Mac V3](https://github.com/Vonng/Capslock/tree/main/mac_v3/) | 2021–present | Karabiner-Elements | {{< badge text="active" tone="success" >}} |
| [Mac V2](https://github.com/Vonng/Capslock/tree/main/mac_v2/) | 2017–2021 | Karabiner-Elements | {{< badge text="archived" >}} |
| [Mac V1](https://github.com/Vonng/Capslock/tree/main/mac_v1/) | 2015–2017 | Karabiner (legacy) | {{< badge text="archived" >}} |
| [Windows](https://github.com/Vonng/Capslock/tree/main/win) | 2013–2015 | AutoHotkey | {{< badge text="archived" >}} |

V2 used only a handful of planes. V3 introduced the four-bit plane model, which
is what let the layout grow to 282 mappings without becoming arbitrary.

V3.1 then intentionally changed several defaults that older users will notice:

- clipboards moved to {{< kbd "6" >}}–{{< kbd "0" >}}, and {{< kbd "1" >}}–{{< kbd "5" >}} are no longer slots;
- {{< kbd "C" >}} and {{< kbd "⌘" "C" >}} launch Codex and Claude;
- Spotlight and Alfred 5 replace Launchpad and Alfred 4;
- {{< kbd "F13" >}} and {{< kbd "F14" >}} provide screenshots instead of previous / next track;
- {{< kbd "⌘" "D" >}} performs **Define** rather than opening Dictionary.

The Windows AutoHotkey version remains in the repository as a
[pre-compiled binary](https://github.com/Vonng/Capslock/tree/main/win) and
[source](https://github.com/Vonng/Capslock/blob/main/win/CapsLock.ahk), but it
is not tested against current Windows releases.

## Customize the configuration {#customize}

{{< cards >}}
{{< card title="Interactive configurator" link="/customizer/" icon="fa-solid fa-sliders" badge="no tools needed" >}}
Browse all sixteen planes, inspect the real Karabiner output of any key, rename
the applications behind the yellow keys, and export a ready-to-import JSON file.
{{< /card >}}
{{< card title="Edit the YAML source" link="https://github.com/Vonng/Capslock/tree/main/mac_v3" icon="fa-solid fa-code" badge="full control" >}}
Fork the repository, edit the human-readable `mac_v3/capslock.yml`, and
regenerate the JSON. Any rule the Karabiner schema allows is available here.
{{< /card >}}
{{< /cards >}}

The YAML is the source of truth and the JSON is generated from it. Regenerating
takes one command and [yq v4](https://github.com/mikefarah/yq):

```shell
make -C mac_v3 compile
```

A good first customization is claiming one of the seven free planes. Copy any
rule, change the left modifier in `mandatory`, and you have a whole keyboard's
worth of space that nothing else uses — plane 5
({{< kbd "✱" "⌘" "⌃" >}}) and plane 7
({{< kbd "✱" "⌘" "⌥" "⌃" >}}) are both completely empty.

Keep the YAML and the generated JSON synchronized: the site and the Karabiner
gallery both publish the JSON.

## FAQ and troubleshooting {#faq}

**A chord does nothing at all.**

Check **Settings → Complex Modifications** first: the ten rules are enabled
individually, and a fresh import leaves nothing on. If the rule is enabled,
open Karabiner-EventViewer and press the chord — it shows exactly what reaches
the system, which distinguishes a missing rule from an application that
swallows the shortcut.

**Caps Lock sends Escape but nothing else works.**

That is the signature of enabling only the first rule. `CapsLock to Hyper`
provides tap-Escape and hold-Hyper; the other nine rules provide everything
that Hyper then does.

**Why can a chord trigger macOS diagnostics?**

[Issue #30](https://github.com/Vonng/Capslock/issues/30) documents that
{{< kbd "⌘" "⌥" "⌃" "⇧" "." >}} can trigger macOS diagnostics. Remap that
system shortcut if it conflicts with your chosen plane.

**Why is Linux not supported?**

Desktop environments differ substantially. The author primarily uses Linux
through a macOS terminal. Native support could be implemented with tools such
as `xmodmap`; contributions are welcome.

**Why does the repository contain older macOS versions?**

Legacy Karabiner used XML. Karabiner-Elements replaced it for macOS Sierra and
later, so the older configurations remain for historical systems.

**Is the design original?**

The first AutoHotkey version dates to 2013 and the first Mac version to 2015.
The current configuration is listed in the Karabiner-Elements
[complex-modifications gallery](https://ke-complex-modifications.pqrs.org/#caps_lock_enhancement).

## Project {#project}

CapsLock Enhancement is maintained by [Vonng](https://vonng.com/en/) and
distributed under the [Apache License 2.0](https://github.com/Vonng/Capslock/blob/main/LICENSE).
Source, releases, and issue tracking live on
[GitHub](https://github.com/Vonng/Capslock).
