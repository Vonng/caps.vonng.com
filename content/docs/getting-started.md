---
title: Install and Hyper Basics
linkTitle: Install & Hyper
description: Install Karabiner-Elements, import CapsLock Enhancement, and understand tap, hold, and control planes.
icon: fa-solid fa-bolt
weight: 10
---

CapsLock Enhancement V3 {{< badge text="current" tone="success" >}} targets
macOS and [Karabiner-Elements](https://karabiner-elements.pqrs.org/). There is
nothing else to install: the configuration is a set of complex-modification
rules that Karabiner interprets, so nothing new runs in the background and
nothing is compiled on your machine.

> [!NOTE]
> This guide was verified with Karabiner-Elements 16.1.0 in August 2026, whose
> support matrix covers macOS 13 Ventura through macOS 27 on Intel and Apple
> silicon. Check the official site for the current release.

## Install {#install}

{{% steps %}}

### Install Karabiner-Elements {#install-karabiner}

Download the DMG from the [official site](https://karabiner-elements.pqrs.org/)
and run `Karabiner-Elements.pkg`, or install the cask:

```bash
brew install --cask karabiner-elements
```

Open Karabiner-Elements Settings and follow its prompts in System Settings.
Allow the privileged and non-privileged background services, Accessibility,
Input Monitoring, and the Driver Extension. Under **Virtual Keyboard**, select
the layout matching your physical keyboard. The
[official installation guide](https://karabiner-elements.pqrs.org/docs/getting-started/installation/)
explains what each permission is for.

### Import the rules {#import}

Open the import link below — any browser hands it straight to
Karabiner-Elements:

<a class="td-import-link" href="karabiner://karabiner/assets/complex_modifications/import?url=https://raw.githubusercontent.com/Vonng/Capslock/main/mac_v3/capslock.json"><i class="fa-solid fa-file-import" aria-hidden="true"></i> Import CapsLock Enhancement V3.1</a>

Or paste the URL yourself:

```text
karabiner://karabiner/assets/complex_modifications/import?url=https://raw.githubusercontent.com/Vonng/Capslock/main/mac_v3/capslock.json
```

Choose **Import**, allow Karabiner-Elements to open, then enable the rules you
want under **Settings → Complex Modifications**. The ten rules are independent,
so a family you have no use for can simply stay off.

Then tap {{< kbd "⇪" >}} — it should send {{< kbd "⎋" >}} — and hold it while
pressing {{< kbd "H" >}} {{< kbd "J" >}} {{< kbd "K" >}} {{< kbd "L" >}}: the
cursor moves. You are on plane zero.

{{% /steps %}}

> [!TIP]
> Two alternatives lead to the same place. The
> [Karabiner gallery page](https://ke-complex-modifications.pqrs.org/#caps_lock_enhancement)
> has an **Import** button of its own, and for a fully offline install you can
> drop [`capslock.json`](https://raw.githubusercontent.com/Vonng/Capslock/main/mac_v3/capslock.json)
> into `~/.config/karabiner/assets/complex_modifications/` and pick
> **Add predefined rule**. Karabiner-EventViewer shows what any key actually
> emits if something looks wrong.

## Tap, hold, and Hyper {#hyper}

Caps Lock now has two behaviours that never collide, because one is decided on
release and the other while the key is down.

| Gesture | Output | Purpose |
| :-- | :-- | :-- |
| Tap {{< kbd "⇪" >}} | {{< kbd "⎋" >}} Escape | Escape without leaving the home row |
| Hold {{< kbd "⇪" >}} | {{< kbd "✱" >}} Hyper | Enter the base control plane |
| {{< kbd "✱" "⎋" >}} | {{< kbd "⇪" >}} Caps Lock | Toggle the original Caps Lock state |
| {{< kbd "✱" "␣" >}} | {{< kbd "⌃" "␣" >}} | Switch input source |
| {{< kbd "✱" "⌘" "␣" >}} | {{< kbd "⌃" "⌘" "␣" >}} | Emoji and symbols picker |
{caption="Everything Caps Lock used to do is still one chord away"}

{{< kbd "✱" >}} is not a private signal. Karabiner rewrites the held Caps Lock
into all four **right-side** modifiers at once —
{{< kbd "⌘" "⌥" "⌃" "⇧" >}} — which has two consequences worth understanding:

- **Other software still sees an ordinary chord.** Alfred, Moom, Magnet,
  Raycast and your IDE receive {{< kbd "⌃" "⌥" "⇧" "⌘" >}} plus a key and can
  bind it like any other shortcut.
- **Anything CapsLock Enhancement does not claim passes straight through.**
  {{< kbd "✱" "A" >}} has no rule of its own precisely so that a window manager
  can own it. The same trick works for any key you want to hand to another app.

## Sixteen control planes {#control-planes}

While Hyper stays held, the four **left-side** modifiers act as four binary
switches. Read them as four bits and you get planes 0–15:

{{< kbd "⌘" >}} = 1 · {{< kbd "⌥" >}} = 2 · {{< kbd "⌃" >}} = 4 ·
{{< kbd "⇧" >}} = 8.

| Plane | Left modifiers | Mappings | What lives there |
| :--: | :-- | :--: | :-- |
| 0 | {{< kbd "✱" >}} | 89 | The daily layer: movement, deletion, apps, terminal, symbols |
| 1 | {{< kbd "✱" "⌘" >}} | 59 | Selection, second-choice apps, clipboard copy |
| 2 | {{< kbd "✱" "⌥" >}} | 38 | Pointer movement and third-choice apps |
| 3 | {{< kbd "✱" "⌘" "⌥" >}} | 8 | Word and paragraph selection |
| 4 | {{< kbd "✱" "⌃" >}} | 12 | Desktop and window management |
| 5 | {{< kbd "✱" "⌘" "⌃" >}} | — | Free |
| 6 | {{< kbd "✱" "⌥" "⌃" >}} | — | Free |
| 7 | {{< kbd "✱" "⌘" "⌥" "⌃" >}} | — | Free |
| 8 | {{< kbd "✱" "⇧" >}} | 25 | App, window and tab switching |
| 9 | {{< kbd "✱" "⌘" "⇧" >}} | 21 | Accelerated wheel |
| 10 | {{< kbd "✱" "⌥" "⇧" >}} | 21 | Accelerated pointer |
| 11 | {{< kbd "✱" "⌘" "⌥" "⇧" >}} | — | Free |
| 12 | {{< kbd "✱" "⌃" "⇧" >}} | 9 | Wheel |
| 13 | {{< kbd "✱" "⌘" "⌃" "⇧" >}} | — | Free |
| 14 | {{< kbd "✱" "⌥" "⌃" "⇧" >}} | — | Free |
| 15 | {{< kbd "✱" "⌘" "⌥" "⌃" "⇧" >}} | — | Free |
{caption="Every plane in V3.1, how many mappings it carries, and the theme it follows"}

Nine planes are populated; seven are free space for rules of your own. Open the
[configurator](/customizer/) to browse the same sixteen rows interactively and
see what each key does on the plane you select.

The planes are not arbitrary. Across the whole configuration the same modifier
keeps the same meaning, which is why the layout can be learned once rather than
memorized key by key:

| Modifier | Consistent meaning |
| :-- | :-- |
| {{< kbd "⌘" >}} | Extend the action — select instead of move, copy instead of paste, the second application |
| {{< kbd "⌥" >}} | Leave the text world — pointer, wheel, the third application |
| {{< kbd "⌃" >}} | Talk to the window server — desktops, Mission Control, screen state |
| {{< kbd "⇧" >}} | Switch containers — apps, windows, tabs; or accelerate a pointer action |

## Compatibility {#compatibility}

- The layout is drawn for **ANSI** keyboards and works the same on built-in
  Apple keyboards and external ones. ISO layouts work too, but the two keys
  that differ physically may land somewhere unexpected.
- The [MouseKey](/docs/navigation/#mousekey) family needs a numeric keypad.
  Everything else works on a tenkeyless board.
- Older macOS releases need an archived Karabiner-Elements build, which this
  guide does not cover.

> [!WARNING]
> macOS reserves a few system-wide chords of its own. The most common clash is
> {{< kbd "⌘" "⌥" "⌃" "⇧" "." >}}, which can open a diagnostics dialog — see
> [issue #30](https://github.com/Vonng/Capslock/issues/30). Remap the system
> shortcut if it conflicts with a plane you use.

## Next {#next}

Continue with [navigation, deletion, and mouse control](/docs/navigation/).
