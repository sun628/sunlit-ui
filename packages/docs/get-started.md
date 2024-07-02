---
search: false
next:
  link: /components/button
  text: Button 按钮
---

# 快速上手

## 安装

```bash
pnpm i sunlit-ui
```

## 开始使用

**全局使用**

```js
// 引入所有组件
import SunlitUI from 'sunlit-ui';
// 引入样式
import 'sunlit-ui/dist/index.css';

import App from './App.vue';
// 全局使用
createApp(App).use(SunlitUI).mount('#app');
```

```vue
<template>
  <n-button>我是 Button</n-button>
</template>
```

**按需加载**

Sunlit-UI 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <n-button>我是 Button</n-button>
</template>
<script>
import { NButton } from ' sunlit-ui';
export default {
  components: { NButton },
};
</script>
```

:::
api-table src=components/Button/types.ts
:::

## 其他

::: details

- Vite + Vitest + Vitepress 工具链
- monorepo 分包管理
- github actions 实现 CI/CD 自动化部署
- 大模型辅助：使用大模型辅助完成需求分析，设计思路，快速实现组件，提升开发效率。
  :::
