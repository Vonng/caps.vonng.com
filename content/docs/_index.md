---
title: CapsLock Guide
linkTitle: Docs
description: Install CapsLock Enhancement, understand Hyper and its sixteen control planes, and look up every mapping.
type: docs
body_class: capslock-docs
icon: fa-solid fa-book-open
weight: 10
sidebar_expanded: true
sidebar_root_for: self
sidebar_root_link_self: true
section_index: cards
section_index_columns: 2
page_context_menu: false
cascade:
  type: docs
  body_class: capslock-docs
  comments: true
  feedback: false
  page_context_menu: false
---

CapsLock Enhancement turns {{< kbd "⇪" >}} into two keys at once: tap it for
{{< kbd "⎋" >}}, or hold it as the {{< kbd "✱" >}} Hyper modifier. Combine
Hyper with the four left-side modifiers to address sixteen control planes
without moving your hands away from the keyboard's hot zone.

![CapsLock control plane zero](/img/keyboard-hero.webp)
{class="only-light" caption="Control plane 0: the layout you get by holding ⇪ on its own. Fifteen more planes sit behind the left-side modifiers."}

![CapsLock control plane zero](/img/keyboard-hero-dark.webp)
{class="only-dark" caption="Control plane 0: the layout you get by holding ⇪ on its own. Fifteen more planes sit behind the left-side modifiers."}

> [!TIP]
> The [interactive configurator](/customizer/) reads the current V3 JSON. It is
> the fastest way to inspect one key on any plane, or to change an application
> shortcut and export a configuration you can import straight away.

## Ten families of keys {#families}

The keyboard map above is colour-coded by purpose, so a key's neighbourhood
tells you roughly what it does before you look anything up. The configuration
ships as ten independent Karabiner rules, one per family, and you enable them
one by one.

| Family | Colour | What it does | Mappings |
| :-- | :-- | :-- | :--: |
| [Basic](/docs/getting-started/#hyper) | Blue | Tap {{< kbd "⇪" >}} for {{< kbd "⎋" >}}, hold it for {{< kbd "✱" >}} Hyper, plus input-source switching | 4 |
| [Navigation](/docs/navigation/#navigation) | Pink | Vim-style movement, selection, tab and window switching, pointer and wheel | 102 |
| [Deletion](/docs/navigation/#deletion) | Brown | `NM,.` delete by character, word or line without moving your hand | 12 |
| [MouseKey](/docs/navigation/#mousekey) | Keypad | The numeric keypad as a complete mouse | 63 |
| [Window](/docs/workflows/#window-control) | Azure | Close and cycle tabs, windows, apps and desktops; sleep, lock, log out | 19 |
| [Application](/docs/workflows/#applications) | Yellow | Launch or focus six applications across three planes | 18 |
| [Terminal](/docs/workflows/#terminal-control) | Green | Terminal signals, IDE run controls, Vim and Tmux prefixes, Codex and Claude | 10 |
| [Clipboard](/docs/workflows/#clipboard) | Purple | Five extra text clipboards on {{< kbd "6" >}}–{{< kbd "0" >}} | 10 |
| [Shifter](/docs/workflows/#shifter) | Orange | Brackets, braces and code punctuation within reach of the home row | 16 |
| [Functional](/docs/reference/#functional) | Cyan | Screenshots, media, brightness, keyboard light and volume | 28 |
{caption="The ten rules in capslock.json, and how many mappings each one carries"}

## Pick a path {#pick-a-path}

Read in order if this is your first visit, or jump straight to the family you
need. Every page ends with a link to the next one.
