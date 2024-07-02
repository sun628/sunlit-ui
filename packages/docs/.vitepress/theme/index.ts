import type { App } from 'vue';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import DefaultTheme from 'vitepress/theme';
import SunlitUI from 'sunlit-ui';

import '@vitepress-demo-preview/component/dist/style.css';
// import 'sunlit-ui/dist/index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', ElementPlusContainer);
    app.use(SunlitUI);
  },
};
