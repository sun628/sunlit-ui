import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import { filter, includes, map } from 'lodash-es';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
export default defineConfig({
  plugins: [
    vue(),

    // 生成类型文件
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
  ],
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'sunlit-ui',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (includes(id, 'node_modules')) return 'vendor';

          if (includes(id, '/packages/hooks')) return 'hooks';

          if (includes(id, '/packages/utils') || includes(id, 'plugin-vue:export-helper'))
            return 'utils';

          for (const item of getDirectoriesSync('../components')) {
            if (includes(id, `/packages/components/${item}`)) return item;
          }
        },
      },
    },
  },
});
