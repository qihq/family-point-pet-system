# Apricot UI（家庭温暖主题）

此目录提供无需 Figma 的前端落地包：Design Tokens、CSS 主题与可交互预览（含儿童模式）。

## 文件
- `tokens.apricot.json`：设计令牌（颜色/间距/圆角/动效/控件尺寸）。
- `theme.css`：CSS 变量 + 基础组件样式（按钮/输入/卡片/表格/徽章）。
- `preview.html`：可直接打开的交互预览，右上角可切换“儿童模式”。

## 使用（任意前端栈）
在你的页面 `<head>` 引入 `theme.css`：

```html
<link rel="stylesheet" href="/docs/ui/theme.css">
```

切换儿童模式：

```js
// 默认模式
document.documentElement.removeAttribute('data-mode');
// 儿童模式
document.documentElement.setAttribute('data-mode', 'kid');
```

## 设计要点（复述）
- 主色杏桃橘：`#FF8E6E`，对比强化色：`#F1785A`；背景：`#FFF7F0`；卡片：`#FFF2E8`；文本：`#2D2A26`。
- 组件：圆角 12（儿童 16），控件高度 44（儿童 48），悬停提亮 6–8%，按下 0.98 压感。
- 可访问性：焦点环、键盘可达、对比度 ≥ 4.5:1；尊重 `prefers-reduced-motion`。

## Tailwind（如需）
如使用 Tailwind，可将 `tokens.apricot.json` 映射到 `theme.colors`、`borderRadius`、`spacing` 并用 CSS Variables 注入运行时切换。

## 后续
- 如果你之后开通了 Figma，我们可把本 token JSON 导入 Figma Variables，并补齐组件变体与页面模板。
- 也可继续在代码侧扩展组件（如 Toast/Modal/向导）。
