# Button 组件

## 基础使用

使用 `type`, `plain`, `round` 和 `circle` 来定义按钮的样式。

## 禁用按钮

`disabled` 属性决定按钮是否禁用。

## 链接按钮

**警告**：`type="text"` 已被弃用，并将在 3.0.0 版本中移除，请考虑切换到新的 API。

2.2.1 版本中新增了 API `link`，您可以使用 `type` API 来设置链接按钮的主题。

### 基础链接按钮

### 禁用链接按钮

## 文本按钮

**提示**：自 2.2.0 版本起，文本按钮已升级为新设计，如果您想使用旧版本的按钮样式，您可能需要查看链接。

API 也已更新，因为 `type` 属性也代表按钮的样式。所以我们为文本按钮创建了新的 API `text: boolean`。

### 基础文本按钮

### 背景色始终开启

### 禁用文本按钮

## 图标按钮

使用图标为按钮添加更多含义。您可以单独使用图标以节省空间，或与文本一起使用。

使用 `icon` 属性添加图标。您可以在 Element Plus 图标组件中找到图标列表。使用 `<i>` 标签将图标添加到文本的右侧。也可以使用自定义图标。

## 按钮组

以按钮组的形式显示，可用于组合一系列相似的操作。

使用 `<el-button-group>` 标签组合您的按钮。

## 加载按钮

点击按钮加载数据后，按钮将显示加载状态。

设置 `loading` 属性为 `true` 以显示加载状态。

**提示**：您可以使用 `loading` 插槽或 `loadingIcon` 自定义加载组件。`loading` 插槽的优先级高于 `loadingIcon`。

## 尺寸

除了默认尺寸外，Button 组件还提供了三种额外的尺寸供您在不同场景中选择。

使用 `size` 属性设置附加尺寸 `large`, `small`。

## 自定义元素标签 2.3.4

您可以自定义元素标签，例如 button, div, a, router-link, nuxt-link。

## 自定义颜色 beta

您可以自定义按钮颜色。

我们将自动计算悬停颜色和激活颜色。

## Button API

### Button 属性

| 名称              | 描述                                              | 类型                   | 默认值  |
| ----------------- | ------------------------------------------------- | ---------------------- | ------- |
| size              | 按钮尺寸                                          | `enum`                 | —       |
| type              | 按钮类型                                          | `enum`                 | —       |
| plain             | 确定是否为朴素按钮                                | `boolean`              | false   |
| text 2.2.0        | 确定是否为文本按钮                                | `boolean`              | false   |
| bg 2.2.0          | 确定文本按钮的背景色是否始终开启                  | `boolean`              | false   |
| link 2.2.1        | 确定是否为链接按钮                                | `boolean`              | false   |
| round             | 确定是否为圆角按钮                                | `boolean`              | false   |
| circle            | 确定是否为圆形按钮                                | `boolean`              | false   |
| loading           | 确定是否为加载状态                                | `boolean`              | false   |
| loading-icon      | 自定义加载图标组件                                | `string` / `Component` | Loading |
| disabled          | 禁用按钮                                          | `boolean`              | false   |
| icon              | 图标组件                                          | `string` / `Component` | —       |
| autofocus         | 与原生按钮的 `autofocus` 相同                     | `boolean`              | false   |
| native-type       | 与原生按钮的 `type` 相同                          | `enum`                 | button  |
| auto-insert-space | 自动在两个中文字符之间插入空格                    | `boolean`              | —       |
| color             | 自定义按钮颜色，自动计算 `hover` 和 `active` 颜色 | `string`               | —       |
| dark              | 暗模式，自动将 `color` 转换为暗模式颜色           | `boolean`              | false   |
| tag 2.3.4         | 自定义元素标签                                    | `string` / `Component` | button  |

### Button 插槽

| 名称    | 描述           |
| ------- | -------------- |
| default | 自定义默认内容 |
| loading | 自定义加载组件 |
| icon    | 自定义图标组件 |

### Button 公开

| 名称           | 描述           | 类型     |
| -------------- | -------------- | -------- |
| ref            | 按钮 HTML 元素 | `object` |
| size           | 按钮尺寸       | `object` |
| type           | 按钮类型       | `object` |
| disabled       | 按钮禁用       | `object` |
| shouldAddSpace | 是否添加空格   | `object` |

## ButtonGroup API

### ButtonGroup 属性

| 名称 | 描述                     | 类型   | 默认值 |
| ---- | ------------------------ | ------ | ------ |
| size | 控制此按钮组内按钮的尺寸 | `enum` | —      |
| type | 控制此按钮组内按钮的类型 | `enum` | —      |

### ButtonGroup 插槽

| 名称    | 描述             | 子标签 |
| ------- | ---------------- | ------ |
| default | 自定义按钮组内容 | Button |

## 来源

组件 • 文档

## 贡献者
