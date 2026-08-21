---
title: CapsLock 使用指南
linkTitle: 文档
description: 安装 CapsLock Enhancement，理解 Hyper 与十六个控制平面，并查阅全部按键映射。
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

CapsLock Enhancement 让 {{< kbd "⇪" >}} 同时承担两种职责：单击发送
{{< kbd "⎋" >}}，按住则成为 {{< kbd "✱" >}} Hyper 修饰键。Hyper 与左侧四个
修饰键组合后，可以寻址十六个控制平面，双手无需离开键盘热区。

![CapsLock 零号控制平面](/img/keyboard-hero.webp)
{class="only-light" caption="零号控制平面：单独按住 ⇪ 时的布局。它背后还有十五个由左侧修饰键选择的平面。"}

![CapsLock 零号控制平面](/img/keyboard-hero-dark.webp)
{class="only-dark" caption="零号控制平面：单独按住 ⇪ 时的布局。它背后还有十五个由左侧修饰键选择的平面。"}

> [!TIP]
> [交互式配置器](/zh/customizer/)直接读取当前 V3 JSON，是检查任意控制平面
> 按键、定制应用启动快捷键最快的方式，并且可以导出一份可直接导入的配置。

## 十类按键 {#families}

上面的键位图按用途着色，因此一个键的邻居就大致告诉你它做什么。整份配置由十条
彼此独立的 Karabiner 规则组成，一类一条，可以逐条启用。

| 类目 | 颜色 | 作用 | 映射数 |
| :-- | :-- | :-- | :--: |
| [基础功能](/zh/docs/getting-started/#hyper) | 蓝色 | 单击 {{< kbd "⇪" >}} 发送 {{< kbd "⎋" >}}，按住则是 {{< kbd "✱" >}} Hyper，另含输入法切换 | 4 |
| [导航](/zh/docs/navigation/#navigation) | 粉色 | Vim 式移动、选择、标签页与窗口切换、指针与滚轮 | 102 |
| [删除](/zh/docs/navigation/#deletion) | 棕色 | `NM,.` 按字符、词、行删除，手不必离开核心区 | 12 |
| [鼠标键](/zh/docs/navigation/#mousekey) | 小键盘 | 把数字小键盘变成一只完整的鼠标 | 63 |
| [窗口管理](/zh/docs/workflows/#window-control) | 淡蓝 | 关闭与轮换标签页、窗口、应用与桌面；睡眠、锁屏、注销 | 19 |
| [应用捷径](/zh/docs/workflows/#applications) | 黄色 | 在三个平面上启动或切换六个应用 | 18 |
| [终端控制](/zh/docs/workflows/#terminal-control) | 绿色 | 终端信号、IDE 运行控制、Vim 与 Tmux 前缀、Codex 与 Claude | 10 |
| [剪贴板](/zh/docs/workflows/#clipboard) | 紫色 | {{< kbd "6" >}}–{{< kbd "0" >}} 上的五个额外文本剪贴板 | 10 |
| [字符变换](/zh/docs/workflows/#shifter) | 橙色 | 把括号与代码标点挪到核心区附近 | 16 |
| [功能键](/zh/docs/reference/#functional) | 青色 | 截图、媒体、亮度、键盘背光与音量 | 28 |
{caption="capslock.json 中的十条规则，以及各自承载的映射数量"}

## 选择阅读路径 {#pick-a-path}

第一次使用建议按顺序阅读，也可以直接跳到需要的类目。每一页末尾都有通往下一页
的链接。
