---
title: Navigation, Deletion, and Mouse
linkTitle: Navigation & Mouse
description: Move and select text, delete by semantic unit, and control the pointer or wheel without leaving the keyboard.
icon: fa-solid fa-compass
weight: 20
---

The pink and brown areas around the home row carry CapsLock Enhancement's most
frequent operations. The navigation and deletion families together carry 114
of the 282 mappings in V3.1 — this is the part of the layout worth learning
first.

> [!IMPORTANT]
> Unless stated otherwise, every chord on this page assumes {{< kbd "✱" >}}
> Hyper is held. "+ {{< kbd "⌘" >}}" therefore means
> {{< kbd "✱" "⌘" >}} plus the listed key.

## The navigator block {#navigation}

{{< kbd "H" >}} {{< kbd "J" >}} {{< kbd "K" >}} {{< kbd "L" >}} move left,
down, up, and right, exactly as in Vim. Directly above them,
{{< kbd "U" >}} {{< kbd "I" >}} {{< kbd "O" >}} {{< kbd "P" >}} extend the same
idea to whole pages and lines: Page Up, Home, End, Page Down.

Those eight keys are the only ones mapped on nine different planes. Each group
of planes below covers one job, and together they account for 72 of the 282
mappings in V3.1.

### Moving and selecting text {#selection}

The text layer follows one rule: hold {{< kbd "⌘" >}} and a movement becomes a
selection, because the rule emits the same arrow key with {{< kbd "⇧" >}}
added. Adding {{< kbd "⌥" >}} on top widens the unit — a character becomes a
word, a line becomes three lines, half a line becomes the whole line.

| Key | Hyper | + {{< kbd "⌘" >}} | + {{< kbd "⌘" "⌥" >}} |
| :--: | :-- | :-- | :-- |
| {{< kbd "H" >}} | Left | Select left | Select word left |
| {{< kbd "J" >}} | Down | Select line down | Select three lines down |
| {{< kbd "K" >}} | Up | Select line up | Select three lines up |
| {{< kbd "L" >}} | Right | Select right | Select word right |
| {{< kbd "U" >}} | Page Up | Select page up | Select page up |
| {{< kbd "I" >}} | Home | Select to line start | Select the line, end to start |
| {{< kbd "O" >}} | End | Select to line end | Select the line, start to end |
| {{< kbd "P" >}} | Page Down | Select page down | Select page down |
{caption="Planes 0, 1 and 3 — move, select, select more"}

That is why {{< kbd "✱" "⌘" "⌥" "I" >}} jumps to the end of the line and then
selects back to its start: it is the fastest way to grab exactly one line
without touching the mouse.

### Switching apps, windows, tabs and desktops {#switching}

{{< kbd "⇧" >}} moves between *containers* — the thing you are looking at
rather than the text inside it — while {{< kbd "⌃" >}} talks to the window
server.

| Chord | Emits | Effect |
| :-- | :-- | :-- |
| {{< kbd "✱" "⇧" "J" >}} / {{< kbd "✱" "⇧" "K" >}} | {{< kbd "⌘" "⇥" >}} / {{< kbd "⌘" "⇧" "⇥" >}} | Next / previous application |
| {{< kbd "✱" "⇧" "H" >}} / {{< kbd "✱" "⇧" "L" >}} | {{< kbd "⌃" "⇧" "⇥" >}} / {{< kbd "⌃" "⇥" >}} | Previous / next tab |
| {{< kbd "✱" "⇧" "I" >}} / {{< kbd "✱" "⇧" "O" >}} | {{< kbd "⌘" "⇧" "`" >}} / {{< kbd "⌘" "`" >}} | Previous / next window of the same app |
| {{< kbd "✱" "⇧" "U" >}} / {{< kbd "✱" "⇧" "P" >}} | {{< kbd "⌘" "⌥" "-" >}} / {{< kbd "⌘" "⌥" "=" >}} | Zoom out / in |
| {{< kbd "✱" "⌃" "H" >}} / {{< kbd "✱" "⌃" "L" >}} | {{< kbd "⌃" "←" >}} / {{< kbd "⌃" "→" >}} | Previous / next desktop |
| {{< kbd "✱" "⌃" "K" >}} / {{< kbd "✱" "⌃" "O" >}} | {{< kbd "⌃" "↑" >}} | Mission Control |
| {{< kbd "✱" "⌃" "J" >}} | {{< kbd "⌃" "↓" >}} | Application windows of the focused app |
| {{< kbd "✱" "⌃" "I" >}} | {{< kbd "⌘" "H" >}} | Hide the current app |
| {{< kbd "✱" "⌃" "U" >}} | {{< kbd "⌃" "⌘" "F" >}} | Toggle full screen |
| {{< kbd "✱" "⌃" "P" >}} | {{< kbd "⌘" "␣" >}} | Spotlight |
{caption="What the ⇧ and ⌃ columns actually send"}

> [!NOTE]
> Tab switching relies on {{< kbd "⌃" "⇥" >}}, which most browsers and editors
> honour but a few apps do not. Window cycling uses {{< kbd "⌘" "`" >}}, the
> standard macOS "move focus to next window" shortcut — confirm it is enabled
> under **System Settings → Keyboard → Keyboard Shortcuts…**.

### Pointer and wheel from the home row {#home-row-mouse}

Four more planes turn the same eight keys into a mouse, without your hands
moving at all. {{< kbd "⇧" >}} is the accelerator in both modes.

| Key | + {{< kbd "⌥" >}}<br>Pointer | + {{< kbd "⌥" "⇧" >}}<br>Pointer, fast | + {{< kbd "⌃" "⇧" >}}<br>Wheel | + {{< kbd "⌘" "⇧" >}}<br>Wheel, fast |
| :--: | :-- | :-- | :-- | :-- |
| {{< kbd "H" >}} | Pointer left | Pointer left | Wheel left | Wheel left |
| {{< kbd "J" >}} | Pointer down | Pointer down | Wheel down | Wheel down |
| {{< kbd "K" >}} | Pointer up | Pointer up | Wheel up | Wheel up |
| {{< kbd "L" >}} | Pointer right | Pointer right | Wheel right | Wheel right |
| {{< kbd "U" >}} | Left button | Left button | Wheel right | Wheel right |
| {{< kbd "I" >}} | Right button | Right button | Wheel up | Wheel up |
| {{< kbd "O" >}} | Back button | Back button | Wheel down | Wheel down |
| {{< kbd "P" >}} | Forward button | Forward button | Wheel left | Wheel left |
{caption="Planes 2, 10, 12 and 9 — the two fast planes double the speed of the plane beside them"}

| Plane | Pointer speed | Wheel speed |
| :-- | :--: | :--: |
| {{< kbd "⌥" >}} / {{< kbd "⌃" "⇧" >}} | 1600 | 64 |
| {{< kbd "⌥" "⇧" >}} / {{< kbd "⌘" "⇧" >}} | 3200 | 128 |
{caption="Speed is Karabiner's mouse_key unit, not pixels"}

The middle mouse button is the one exception: it lives on
{{< kbd "✱" "⌥" "↩" >}} rather than on a navigator key.

## Arrow-key mouse control {#arrow-mouse}

The physical arrow keys drive the pointer too, which is often quicker than
reaching for the home-row layer. Here {{< kbd "⌥" >}} slows down and
{{< kbd "⌘" >}} speeds up, in both pointer and wheel modes.

| Chord | Result | Speed |
| :-- | :-- | :-- |
| {{< kbd "✱" >}} + arrows | Move the pointer | 1600 |
| {{< kbd "✱" "⌥" >}} + arrows | Move slowly | 800 |
| {{< kbd "✱" "⌘" >}} + arrows | Move quickly | 4200 |
| {{< kbd "✱" "⇧" >}} + arrows | Scroll the wheel | 64 |
| {{< kbd "✱" "⇧" "⌥" >}} + arrows | Scroll slowly | 32 |
| {{< kbd "✱" "⇧" "⌘" >}} + arrows | Scroll quickly | 256 |
{caption="Three pointer speeds and three wheel speeds on the arrow cluster"}

All five mouse buttons sit on {{< kbd "↩" >}}:

| Chord | Button |
| :-- | :-- |
| {{< kbd "✱" "↩" >}} | Left click |
| {{< kbd "✱" "⌘" "↩" >}} | Right click |
| {{< kbd "✱" "⌥" "↩" >}} | Middle click |
| {{< kbd "✱" "⇧" "↩" >}} | Back |
| {{< kbd "✱" "⌃" "↩" >}} | Forward |

## Semantic deletion {#deletion}

{{< kbd "N" >}} {{< kbd "M" >}} {{< kbd "," >}} {{< kbd "." >}} sit directly
below the navigation keys. The pair on the left deletes *backwards*, the pair
on the right deletes *forwards*, and the unit grows as you add modifiers.

| Key | Hyper | + {{< kbd "⌘" >}} | + {{< kbd "⌥" >}} |
| :--: | :-- | :-- | :-- |
| {{< kbd "N" >}} | Delete the previous word | Delete back to the line start | Delete back to the line start |
| {{< kbd "M" >}} | Delete the previous character | Delete the previous word | Move the line down |
| {{< kbd "," >}} | Delete the next character | Delete the next word | Move the line up |
| {{< kbd "." >}} | Delete the next word | Delete forward to the line end | Delete back to the line start |
{caption="N and M delete backwards from the cursor, comma and period forwards"}

Two rows break the pattern deliberately. {{< kbd "✱" "⌥" "N" >}} and
{{< kbd "✱" "⌥" "." >}} both send {{< kbd "⌘" "⌫" >}}, clearing everything from
the cursor back to the start of the line, so the outer keys of the block are
the "throw this line away" pair. And {{< kbd "✱" "⌥" "M" >}} /
{{< kbd "✱" "⌥" "," >}} do not delete at all: they emit
{{< kbd "⌥" "⇧" "↓" >}} and {{< kbd "⌥" "⇧" "↑" >}}, the move-line-down/up
shortcut that IntelliJ, VS Code and most editors share.

## Numeric keypad as a mouse {#mousekey}

If your keyboard has a keypad, Hyper turns the whole block into a mouse. The
digits give eight directions around a neutral {{< kbd "5" >}}; the top row
scrolls; the bottom and right edges are the five buttons.

| Keypad keys | Mapping |
| :-- | :-- |
| {{< kbd "7" >}} {{< kbd "8" >}} {{< kbd "9" >}} {{< kbd "4" >}} {{< kbd "6" >}} {{< kbd "1" >}} {{< kbd "2" >}} {{< kbd "3" >}} | Eight pointer directions, including the diagonals |
| {{< kbd "5" >}} | Stop — sends a zero-velocity pointer event |
| {{< kbd "/" >}} {{< kbd "=" >}} | Wheel up / down |
| {{< kbd "Num Lock" >}} {{< kbd "*" >}} | Wheel sideways |
| {{< kbd "0" >}} | Left click |
| {{< kbd "." >}} | Middle click |
| {{< kbd "⌤" >}} | Right click |
| {{< kbd "+" >}} / {{< kbd "-" >}} | Forward / back |
{caption="Hyper plus the keypad: pointer, wheel, and all five buttons"}

The same speed modifiers apply as everywhere else: {{< kbd "⌥" >}} slows the
pointer to roughly half, {{< kbd "⌘" >}} doubles it, and adding
{{< kbd "⇧" >}} converts pointer motion into wheel motion at the matching
speed.

## Next {#next}

Continue with [windows, applications, terminal controls, clipboards, and
symbols](/docs/workflows/).
