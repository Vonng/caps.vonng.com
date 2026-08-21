---
title: 安装与 Hyper 基础
linkTitle: 安装与基础
description: 安装 Karabiner-Elements、导入 CapsLock Enhancement，并理解单击、按住与控制平面。
icon: fa-solid fa-bolt
weight: 10
---

CapsLock Enhancement V3 {{< badge text="当前版本" tone="success" >}} 面向 macOS
与 [Karabiner-Elements](https://karabiner-elements.pqrs.org/)。除此之外没有别的
东西需要安装：这套配置就是一组由 Karabiner 解释执行的复杂修饰规则，不会新增
常驻进程，也不需要在你的机器上编译任何东西。

> [!NOTE]
> 本文在 2026 年 8 月使用 Karabiner-Elements 16.1.0 验证，该版本的支持范围覆盖
> Intel 与 Apple 芯片上的 macOS 13 Ventura 至 macOS 27。当前版本请以官网为准。

## 安装 {#install}

{{% steps %}}

### 安装 Karabiner-Elements {#install-karabiner}

从[官方网站](https://karabiner-elements.pqrs.org/)下载 DMG 并运行
`Karabiner-Elements.pkg`，或者直接使用 Homebrew：

```bash
brew install --cask karabiner-elements
```

打开 Karabiner-Elements Settings，按照系统设置提示，允许特权与非特权后台服务、
辅助功能、输入监控与驱动扩展。在 **Virtual Keyboard** 中选择与物理键盘一致的
布局。各项权限的作用见
[官方安装指南](https://karabiner-elements.pqrs.org/docs/getting-started/installation/)。

### 导入规则 {#import}

打开下面这个导入链接 —— 任意浏览器都会把它直接交给 Karabiner-Elements：

<a class="td-import-link" href="karabiner://karabiner/assets/complex_modifications/import?url=https://raw.githubusercontent.com/Vonng/Capslock/main/mac_v3/capslock.json"><i class="fa-solid fa-file-import" aria-hidden="true"></i> 导入 CapsLock Enhancement V3.1</a>

也可以自己粘贴这个 URL：

```text
karabiner://karabiner/assets/complex_modifications/import?url=https://raw.githubusercontent.com/Vonng/Capslock/main/mac_v3/capslock.json
```

点击 **Import**，允许浏览器打开 Karabiner-Elements，再在
**Settings → Complex Modifications** 中启用需要的规则。十条规则彼此独立，
用不到的类目可以不启用。

随后单击 {{< kbd "⇪" >}}，它应当发送 {{< kbd "⎋" >}}；按住它再依次按
{{< kbd "H" >}} {{< kbd "J" >}} {{< kbd "K" >}} {{< kbd "L" >}}，光标随之移动。
此时你已经在零号平面上了。

{{% /steps %}}

> [!TIP]
> 另有两条等价路径。[Karabiner 陈列馆页面](https://ke-complex-modifications.pqrs.org/#caps_lock_enhancement)
> 本身就有 **Import** 按钮；完全离线安装则可以把
> [`capslock.json`](https://raw.githubusercontent.com/Vonng/Capslock/main/mac_v3/capslock.json)
> 放进 `~/.config/karabiner/assets/complex_modifications/`，再选择
> **Add predefined rule**。如果哪个键行为不对，Karabiner-EventViewer 会显示它
> 实际发出了什么。

## 单击、按住与 Hyper {#hyper}

Caps Lock 现在有两种永不冲突的行为，因为一种在松开时判定，另一种在按住期间生效。

| 操作 | 输出 | 用途 |
| :-- | :-- | :-- |
| 单击 {{< kbd "⇪" >}} | {{< kbd "⎋" >}} Escape | 双手不离开核心区即可发送 Escape |
| 按住 {{< kbd "⇪" >}} | {{< kbd "✱" >}} Hyper | 进入零号控制平面 |
| {{< kbd "✱" "⎋" >}} | {{< kbd "⇪" >}} Caps Lock | 切换原始大写锁定状态 |
| {{< kbd "✱" "␣" >}} | {{< kbd "⌃" "␣" >}} | 切换输入法 |
| {{< kbd "✱" "⌘" "␣" >}} | {{< kbd "⌃" "⌘" "␣" >}} | 打开表情与符号面板 |
{caption="大写锁定原本的能力，全都还在一个组合键之内"}

{{< kbd "✱" >}} 并不是某种私有信号。Karabiner 把按住的 Caps Lock 改写成同时按下
**右侧**全部四个修饰键 —— {{< kbd "⌘" "⌥" "⌃" "⇧" >}}。这带来两个值得理解的
结果：

- **其他软件收到的仍然是普通组合键。** Alfred、Moom、Magnet、Raycast 以及各类
  IDE 收到的是 {{< kbd "⌃" "⌥" "⇧" "⌘" >}} 加一个字母，可以像绑定其他快捷键
  一样绑定它。
- **补完计划没有占用的键会原样透传。** {{< kbd "✱" "A" >}} 之所以没有自己的
  规则，正是为了把它让给窗口管理器。任何你想交给其他应用的键都可以照此办理。

## 十六个控制平面 {#control-planes}

Hyper 保持按下时，四个**左侧**修饰键充当四个二进制开关。把它们当成四个比特位
读，就得到 0–15 号平面：

{{< kbd "⌘" >}} = 1 · {{< kbd "⌥" >}} = 2 · {{< kbd "⌃" >}} = 4 ·
{{< kbd "⇧" >}} = 8。

| 平面 | 左侧修饰键 | 映射数 | 承载内容 |
| :--: | :-- | :--: | :-- |
| 0 | {{< kbd "✱" >}} | 89 | 日常层：移动、删除、应用、终端、符号 |
| 1 | {{< kbd "✱" "⌘" >}} | 59 | 选择、次选应用、剪贴板复制 |
| 2 | {{< kbd "✱" "⌥" >}} | 38 | 指针移动与第三组应用 |
| 3 | {{< kbd "✱" "⌘" "⌥" >}} | 8 | 按词、按段选择 |
| 4 | {{< kbd "✱" "⌃" >}} | 12 | 桌面与窗口管理 |
| 5 | {{< kbd "✱" "⌘" "⌃" >}} | — | 空闲 |
| 6 | {{< kbd "✱" "⌥" "⌃" >}} | — | 空闲 |
| 7 | {{< kbd "✱" "⌘" "⌥" "⌃" >}} | — | 空闲 |
| 8 | {{< kbd "✱" "⇧" >}} | 25 | 应用、窗口与标签页切换 |
| 9 | {{< kbd "✱" "⌘" "⇧" >}} | 21 | 加速滚轮 |
| 10 | {{< kbd "✱" "⌥" "⇧" >}} | 21 | 加速指针 |
| 11 | {{< kbd "✱" "⌘" "⌥" "⇧" >}} | — | 空闲 |
| 12 | {{< kbd "✱" "⌃" "⇧" >}} | 9 | 滚轮 |
| 13 | {{< kbd "✱" "⌘" "⌃" "⇧" >}} | — | 空闲 |
| 14 | {{< kbd "✱" "⌥" "⌃" "⇧" >}} | — | 空闲 |
| 15 | {{< kbd "✱" "⌘" "⌥" "⌃" "⇧" >}} | — | 空闲 |
{caption="V3.1 的全部十六个平面、各自的映射数量，以及它遵循的主题"}

九个平面已被使用，另外七个是留给你自己规则的空间。打开
[配置器](/zh/customizer/)可以交互式浏览同样的十六行，并查看所选平面上每个键
的实际行为。

平面的划分并不随意。在整份配置里，同一个修饰键始终保持同一种含义，这也是这套
布局可以「学一次」而不是「逐键背诵」的原因：

| 修饰键 | 一以贯之的含义 |
| :-- | :-- |
| {{< kbd "⌘" >}} | 加强当前动作 —— 从移动变成选择，从粘贴变成复制，切到第二个应用 |
| {{< kbd "⌥" >}} | 离开文本世界 —— 指针、滚轮、第三个应用 |
| {{< kbd "⌃" >}} | 与窗口服务器对话 —— 桌面、调度中心、屏幕状态 |
| {{< kbd "⇧" >}} | 切换容器 —— 应用、窗口、标签页；或者给指针动作加速 |

## 兼容性 {#compatibility}

- 这套布局以 **ANSI** 键盘为蓝本，内置键盘与外接键盘表现一致。ISO 布局同样可用，
  只是物理位置不同的那两个键可能落在意料之外的地方。
- [鼠标键](/zh/docs/navigation/#mousekey)需要一块数字小键盘，其余功能在
  87 键键盘上都能用。
- 更旧的 macOS 需要归档版本的 Karabiner-Elements，不在本指南覆盖范围内。

> [!WARNING]
> macOS 自己也保留了少量全局组合键，最常见的冲突是
> {{< kbd "⌘" "⌥" "⌃" "⇧" "." >}}，它可能唤起系统诊断对话框，参见
> [Issue #30](https://github.com/Vonng/Capslock/issues/30)。如果与你使用的
> 平面冲突，请重新映射该系统快捷键。

## 下一步 {#next}

继续阅读[导航、删除与鼠标控制](/zh/docs/navigation/)。
