---
title: Windows and Developer Workflows
linkTitle: Developer Workflows
description: Switch applications and windows, launch tools, send terminal commands, use extra clipboards, and type code symbols.
icon: fa-solid fa-terminal
weight: 30
---

CapsLock Enhancement dedicates several colour-coded zones to the actions that
interrupt a developer's flow most often: switching windows, launching tools,
sending terminal signals, parking text somewhere, and typing punctuation.

> [!IMPORTANT]
> Every chord on this page assumes {{< kbd "✱" >}} Hyper is held.

## Window control {#window-control}

{{< kbd "⇥" >}} {{< kbd "Q" >}} {{< kbd "W" >}} {{< kbd "A" >}}
{{< kbd "S" >}} form the azure block on the left of the keyboard. They close
and cycle things, from a single tab up to the whole login session.

| Key | Hyper | + {{< kbd "⌘" >}} | + {{< kbd "⌥" >}} | + {{< kbd "⌃" >}} | + {{< kbd "⇧" >}} |
| :--: | :-- | :-- | :-- | :-- | :-- |
| {{< kbd "⇥" >}} | Next app | Previous app | Next desktop | — | Next tab |
| {{< kbd "Q" >}} | Quit app | Quit app | — | Lock screen | Log out |
| {{< kbd "W" >}} | Close window | Close window | Display sleep | — | Sleep |
| {{< kbd "A" >}} | *Window manager* | Mission Control | Show desktop | Spotlight | — |
| {{< kbd "S" >}} | Next tab | Previous tab | Next window | Previous window | — |
{caption="Closing and cycling, from a tab to the whole session"}

Two rows deserve a note.

{{< kbd "✱" "A" >}} is intentionally **not** mapped. Because Hyper is
{{< kbd "⌃" "⌥" "⇧" "⌘" >}} on the right-hand side, an unmapped key passes
straight through to whatever application is listening. Bind
{{< kbd "⌃" "⌥" "⇧" "⌘" "A" >}} inside [Moom](https://manytricks.com/moom/),
[Magnet](https://magnet.crowdcafe.com/) or any other window manager and it
becomes your layout key. [Slate](https://github.com/jigish/slate) is kept only
as a historical example.

Sleep is not a keystroke but a shell command: {{< kbd "✱" "⇧" "W" >}} runs
`pmset sleepnow` and {{< kbd "✱" "⌥" "W" >}} runs `pmset displaysleepnow`.
Karabiner needs no extra permission for these, but they will not fire if a
modal dialog is blocking input.

## Application shortcuts {#applications}

The yellow keys launch or focus six applications on three planes. Each rule is
a plain `open -a` shell command, which means the target is matched by
application *name* — exactly what makes them safe to rewrite.

| Key | Hyper | + {{< kbd "⌘" >}} | + {{< kbd "⌥" >}} |
| :--: | :-- | :-- | :-- |
| {{< kbd "E" >}} | Safari | Finder | Mail |
| {{< kbd "R" >}} | iTerm2 | Preview | Terminal |
| {{< kbd "T" >}} | Visual Studio Code | Typora | Notes |
| {{< kbd "Y" >}} | Siri | Karabiner-Elements | Amphetamine |
| {{< kbd "F" >}} | Alfred 5 | Dash | Dictionary |
| {{< kbd "G" >}} | IntelliJ IDEA | Chrome | Calendar |
{caption="Defaults only — every one of these eighteen names is meant to be changed"}

> [!TIP]
> The [interactive configurator](/customizer/) rewrites any of these names in
> the browser and exports a JSON file you can import directly, without cloning
> the repository or installing anything.

Because `open -a` both launches and focuses, one key does the job of a dock
icon and a {{< kbd "⌘" "⇥" >}} hunt. If an application is already frontmost,
pressing its key again does nothing — it does not toggle.

## Terminal and IDE control {#terminal-control}

The green keys put the control chords a shell uses constantly under your right
hand, so the left hand never has to contort into
{{< kbd "⌃" >}} + a letter mid-sentence.

| Key | Hyper | + {{< kbd "⌘" >}} |
| :--: | :-- | :-- |
| {{< kbd "D" >}} | {{< kbd "⌃" "D" >}} · send EOF | {{< kbd "⌃" "⌘" "D" >}} · look up the word under the pointer |
| {{< kbd "Z" >}} | {{< kbd "⌃" "Z" >}} · SIGTSTP, suspend the job | {{< kbd "F5" >}} · start debugging |
| {{< kbd "X" >}} | {{< kbd "⌃" "R" >}} · run in the IDE | {{< kbd "⌃" "F5" >}} · run without debugging |
| {{< kbd "C" >}} | Open Codex | Open Claude |
| {{< kbd "V" >}} | {{< kbd "⌃" "V" >}} · Vim block-visual / literal prefix | — |
| {{< kbd "B" >}} | {{< kbd "⌃" "B" >}} · [Tmux](https://github.com/tmux/tmux/wiki) prefix | — |
{caption="Terminal signals, IDE run controls, and the two prefix keys"}

{{< kbd "✱" "C" >}} and {{< kbd "✱" "⌘" "C" >}} are `open -a` commands like the
yellow keys, so they can be repointed at whichever assistant you use.

> [!NOTE]
> {{< kbd "✱" "Z" >}} and {{< kbd "✱" "X" >}} deliberately do **not** shadow
> {{< kbd "⌘" "Z" >}} undo or {{< kbd "⌘" "X" >}} cut: those need no Hyper, so
> both spellings coexist on the same physical keys.

## Five text clipboards {#clipboard}

Number keys {{< kbd "6" >}}–{{< kbd "0" >}} become five independent text
clipboards. {{< kbd "✱" "⌘" >}} plus a number copies the current selection into
that slot; {{< kbd "✱" >}} plus the number pastes it back.

| Chord | What happens |
| :-- | :-- |
| {{< kbd "✱" "⌘" "6" >}} … {{< kbd "✱" "⌘" "0" >}} | Copy the selection, then `pbpaste > ~/.clip6` … `~/.clip0` |
| {{< kbd "✱" "6" >}} … {{< kbd "✱" "0" >}} | `cat ~/.clip6 \| pbcopy`, then paste |
{caption="Each slot is one file in your home directory"}

Two things follow from that implementation, and both are useful:

- **The slots survive logout, reboot, and the system clipboard.** They are
  ordinary files, so `cat ~/.clip7` reads one from a shell and any editor can
  fill one without touching the keyboard at all.
- **They hold plain text only.** Copying an image or a file into a slot stores
  whatever `pbpaste` renders as text, not the original object.

> [!NOTE]
> V3.1 deliberately uses five slots on {{< kbd "6" >}}–{{< kbd "0" >}}. Older
> configurations also used {{< kbd "1" >}}–{{< kbd "5" >}}, so check your
> habits before upgrading.

## Code-oriented shifter {#shifter}

The orange keys move the punctuation a programmer types all day within reach of
the home row — no {{< kbd "⇧" >}} gymnastics for brackets.

| Key | Hyper | + {{< kbd "⌘" >}} | + {{< kbd "⌥" >}} |
| :--: | :--: | :--: | :--: |
| {{< kbd "-" >}} | `_` | Zoom out | — |
| {{< kbd "=" >}} | `+` | Zoom in | — |
| {{< kbd "[" >}} | `(` | `{` | `<` |
| {{< kbd "]" >}} | `)` | `}` | `>` |
| {{< kbd ";" >}} | `:` | `!` | — |
| {{< kbd "'" >}} | `=` | `=` | — |
| {{< kbd "/" >}} | Toggle comment | — | — |
| {{< kbd `\` >}} | Toggle comment | — | — |
{caption="Three bracket pairs on two keys, and := and != under one hand"}

The bracket keys are the payoff: {{< kbd "[" >}} and {{< kbd "]" >}} give all
three pairs — round, curly and angle — from the same two positions. And because
{{< kbd ";" >}} and {{< kbd "'" >}} sit side by side, `:` `=` and `!` `=` are
adjacent rolls, which is how Go and Rust assignment and comparison end up
faster to type than on a bare keyboard.

Both {{< kbd "✱" "/" >}} and {{< kbd "✱" `\` >}} emit {{< kbd "⌘" "/" >}}, the
comment shortcut nearly every editor and IDE shares.

## Next {#next}

Use [system functions and reference](/docs/reference/) for function keys,
screenshots, glyphs, version history, and troubleshooting.
