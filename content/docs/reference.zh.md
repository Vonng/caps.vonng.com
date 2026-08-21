---
title: 系统功能与参考
linkTitle: 系统与参考
description: 功能键、截图、符号、控制平面记法、版本、定制与问题排查。
icon: fa-solid fa-table-list
weight: 40
---

本页集中收录更适合查阅、而不是顺序学习的映射与项目资料。

## 功能键与系统控制 {#functional}

F1–F12 默认作为标准功能键；按住 Hyper 时发送对应的媒体或系统功能。青色区块
覆盖整个顶行以及截图键。

| 按键 | Hyper 动作 | + {{< kbd "⌘" >}} |
| :--: | :-- | :-- |
| {{< kbd "`" >}} | 区域截图到剪贴板 | 区域截图到文件 |
| {{< kbd "F1" >}} / {{< kbd "F2" >}} | 亮度降低 / 提高 | 桌面 1 / 2 |
| {{< kbd "F3" >}} | 调度中心 | 桌面 3 |
| {{< kbd "F4" >}} | Spotlight | — |
| {{< kbd "F5" >}} / {{< kbd "F6" >}} | 键盘灯降低 / 提高 | — |
| {{< kbd "F7" >}} / {{< kbd "F8" >}} / {{< kbd "F9" >}} | 上一首 / 播放暂停 / 下一首 | — |
| {{< kbd "F10" >}} / {{< kbd "F11" >}} / {{< kbd "F12" >}} | 静音 / 音量降低 / 提高 | — |
| {{< kbd "F13" >}} | 全屏截图到剪贴板 | 全屏截图到文件 |
| {{< kbd "F14" >}} | 截图菜单 | 旧款 Touch Bar 截图 |
| {{< kbd "F15" >}} | 播放 / 暂停 | — |
{caption="Karabiner-Elements 15.1 及以上版本遵循 系统设置 → 键盘 → 键盘快捷键… → 功能键 的设置"}

截图键遵循同一条约定：单独的 Hyper 组合把截图放进**剪贴板**，再加
{{< kbd "⌘" >}} 则写成桌面上的**文件**。

| 组合 | 实际发出 | 结果 |
| :-- | :-- | :-- |
| {{< kbd "✱" "`" >}} | {{< kbd "⌃" "⇧" "⌘" "4" >}} | 框选区域 → 剪贴板 |
| {{< kbd "✱" "⌘" "`" >}} | {{< kbd "⇧" "⌘" "4" >}} | 框选区域 → 文件 |
| {{< kbd "✱" "F13" >}} | {{< kbd "⌃" "⇧" "⌘" "3" >}} | 整屏 → 剪贴板 |
| {{< kbd "✱" "⌘" "F13" >}} | {{< kbd "⇧" "⌘" "3" >}} | 整屏 → 文件 |
| {{< kbd "✱" "F14" >}} | {{< kbd "⇧" "⌘" "5" >}} | 截图与录屏菜单 |

> [!NOTE]
> 使用 {{< kbd "⌘" "F1" >}}–{{< kbd "⌘" "F3" >}} 前，请先在**系统设置 → 键盘
> → 键盘快捷键… → 调度中心**中启用桌面 1/2/3 快捷键，macOS 默认是关闭的。
> Touch Bar 行为只适用于旧款 Touch Bar Mac，参见
> [官方故障排除说明](https://karabiner-elements.pqrs.org/docs/help/troubleshooting/touch-bar-function-keys/)。

全尺寸键盘上的六键导航区提供同样三项系统控制的细粒度版本 —— 它发出的是
{{< kbd "⇧" "⌥" >}} 加媒体键，也就是 macOS 自带的四分之一步长修饰键。

| 导航区按键 | 动作 |
| :-- | :-- |
| {{< kbd "Insert" >}} / {{< kbd "⌦" >}} | 平滑提高 / 降低屏幕亮度 |
| {{< kbd "↖" >}} / {{< kbd "↘" >}} | 平滑提高 / 降低键盘灯亮度 |
| {{< kbd "Page Up" >}} / {{< kbd "Page Down" >}} | 平滑提高 / 降低音量 |
{caption="步进为 F1–F12 上整档调节的四分之一"}

## 符号 {#symbols}

| 符号 | 名称 | 符号 | 名称 |
| :--: | :-- | :--: | :-- |
| {{< kbd "⇪" >}} | Caps Lock | {{< kbd "✱" >}} | Hyper |
| {{< kbd "⎋" >}} | Escape | {{< kbd "␣" >}} | 空格 |
| {{< kbd "⌘" >}} | Command | {{< kbd "⌥" >}} | Option |
| {{< kbd "⌃" >}} | Control | {{< kbd "⇧" >}} | Shift |
| {{< kbd "↩" >}} | Return | {{< kbd "⌤" >}} | 数字键盘 Enter |
| {{< kbd "⇥" >}} {{< kbd "⇤" >}} | Tab / 反向 Tab | {{< kbd "⇭" >}} | Num Lock |
| {{< kbd "←" >}} {{< kbd "↓" >}} {{< kbd "↑" >}} {{< kbd "→" >}} | 方向键 | {{< kbd "↖" >}} {{< kbd "↘" >}} | Home / End |
| {{< kbd "⇞" >}} {{< kbd "⇟" >}} | Page Up / Page Down | {{< kbd "⌫" >}} {{< kbd "⌦" >}} | 删除 / 向前删除 |
| ⏫ ⏬ | 加速 / 减速 | 🖲️ | 鼠标滚轮 |
| 🖱️L / 🖱️R / 🖱️M | 鼠标键 1 / 2 / 3 | 🖱️B / 🖱️F | 鼠标键 4 / 5，后退与前进 |
{caption="本手册与键位图中使用的全部记法"}

{{< kbd "✱" >}} 是 Heavy Asterisk。普通星号的 ASCII 码正好是 42 —— 生命、
宇宙以及任何事情的终极答案。

## 一条规则长什么样 {#rule-anatomy}

配置里的每一条映射都是同一个形状。读懂一条，整个文件就都可读了，下面的
[定制](#customize)一节也就不再吓人：

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

`mandatory` 里那四个 `right_*` 修饰键就是 Hyper 本身 —— 它们出现在每一条规则
里。旁边还有什么（这里是 `left_control`）就决定了控制平面。`to` 则是应用最终
收到的东西。

## 版本历史 {#versions}

| 版本 | 年份 | 平台 | 状态 |
| :-- | :-- | :-- | :-- |
| [Mac V3](https://github.com/Vonng/Capslock/tree/main/mac_v3/) | 2021–至今 | Karabiner-Elements | {{< badge text="活跃维护" tone="success" >}} |
| [Mac V2](https://github.com/Vonng/Capslock/tree/main/mac_v2/) | 2017–2021 | Karabiner-Elements | {{< badge text="已归档" >}} |
| [Mac V1](https://github.com/Vonng/Capslock/tree/main/mac_v1/) | 2015–2017 | Karabiner（旧版） | {{< badge text="已归档" >}} |
| [Windows](https://github.com/Vonng/Capslock/tree/main/win) | 2013–2015 | AutoHotkey | {{< badge text="已归档" >}} |

V2 只用到了少数几个平面。V3 引入四位二进制的平面模型，布局才得以扩展到 282
条映射而不至于变得随意。

随后 V3.1 有意调整了一些老用户会察觉的默认值：

- 剪贴板移到 {{< kbd "6" >}}–{{< kbd "0" >}}，{{< kbd "1" >}}–{{< kbd "5" >}} 不再是槽位；
- {{< kbd "C" >}} 与 {{< kbd "⌘" "C" >}} 启动 Codex 和 Claude；
- Spotlight 与 Alfred 5 取代 Launchpad 和 Alfred 4；
- {{< kbd "F13" >}} 与 {{< kbd "F14" >}} 改为截图，不再是上一首 / 下一首；
- {{< kbd "⌘" "D" >}} 执行的是**定义**，而不是打开词典。

Windows 上的 AutoHotkey 版本仍以
[预编译程序](https://github.com/Vonng/Capslock/tree/main/win)与
[源码](https://github.com/Vonng/Capslock/blob/main/win/CapsLock.ahk)形式保留在
仓库中，但不再针对当前 Windows 版本测试。

## 定制配置 {#customize}

{{< cards >}}
{{< card title="交互式配置器" link="/zh/customizer/" icon="fa-solid fa-sliders" badge="无需工具" >}}
浏览全部十六个平面，查看任意按键真实的 Karabiner 输出，修改黄色按键背后的应用
名称，并导出一份可以直接导入的 JSON 文件。
{{< /card >}}
{{< card title="编辑 YAML 源文件" link="https://github.com/Vonng/Capslock/tree/main/mac_v3" icon="fa-solid fa-code" badge="完全控制" >}}
Fork 仓库，编辑可读性更好的 `mac_v3/capslock.yml`，然后重新生成 JSON。
Karabiner 规则模式支持的任何写法在这里都可以使用。
{{< /card >}}
{{< /cards >}}

YAML 是唯一的事实来源，JSON 由它生成。重新生成只需要一条命令，以及
[yq v4](https://github.com/mikefarah/yq)：

```shell
make -C mac_v3 compile
```

一个不错的入门定制是占用七个空闲平面之一：复制任意一条规则，改掉 `mandatory`
里的左侧修饰键，你就拥有了一整个键盘、且不与任何现有映射冲突的空间 ——
5 号平面（{{< kbd "✱" "⌘" "⌃" >}}）与 7 号平面（{{< kbd "✱" "⌘" "⌥" "⌃" >}}）
都是完全空的。

请始终保持 YAML 与生成的 JSON 同步：本站与 Karabiner 陈列馆发布的都是那份 JSON。

## 常见问题与排查 {#faq}

**某个组合完全没反应。**

先检查 **Settings → Complex Modifications**：十条规则是分别启用的，刚导入时
一条都没开。如果规则已启用，就打开 Karabiner-EventViewer 再按一次 —— 它会显示
真正到达系统的按键，从而区分「规则没生效」和「应用吞掉了这个快捷键」。

**Caps Lock 能发 Escape，但别的都不管用。**

这是只启用了第一条规则的典型症状。`CapsLock to Hyper` 只提供单击 Escape 与
按住 Hyper，Hyper 之后能做什么，靠的是另外九条规则。

**为什么某些组合会触发 macOS 系统诊断？**

[Issue #30](https://github.com/Vonng/Capslock/issues/30) 记录了
{{< kbd "⌘" "⌥" "⌃" "⇧" "." >}} 可能触发 macOS 系统诊断。若与自定义平面冲突，
请重新映射该系统快捷键。

**为什么没有 Linux 支持？**

Linux 桌面环境差异较大，作者本人主要通过 macOS 终端使用 Linux。原生支持可以
使用 `xmodmap` 等工具实现，欢迎贡献。

**仓库中为什么保留旧 macOS 版本？**

旧版 Karabiner 使用 XML；macOS Sierra 以后由 Karabiner-Elements 接替，因此
旧配置继续保留给历史系统。

**这套设计是原创的吗？**

最早的 AutoHotkey 版本可追溯到 2013 年，第一个 Mac 版本发布于 2015 年。
当前配置长期收录于 Karabiner-Elements
[复杂规则陈列馆](https://ke-complex-modifications.pqrs.org/#caps_lock_enhancement)。

## 项目 {#project}

CapsLock Enhancement 由 [Vonng](https://vonng.com/) 维护，采用
[Apache License 2.0](https://github.com/Vonng/Capslock/blob/main/LICENSE)。
源码、版本与问题跟踪位于 [GitHub](https://github.com/Vonng/Capslock)。
