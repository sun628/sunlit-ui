import { defineConfig } from 'vite';
import { readdir, readdirSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import { defer, delay, filter, map } from 'lodash-es';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import shell from 'shelljs';
import ModifyFiles from './ModifyFiles';
import terser from '@rollup/plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const TRY_MOVE_STYLES_DELAY = 800 as const;

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

function moveStyles() {
  readdir('./dist/es/theme', (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv('./dist/es/theme', './dist'));
  });
}

export default defineConfig({
  plugins: [
    vue(),
    // 生成类型文件
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
    ModifyFiles({
      rmFiles: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyles,
    }),
    terser({
      // compress`: 压缩选项对象
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ['log'],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },

      // `mangle`: 混淆选项对象
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: 'dist/es',
    cssCodeSplit: true, // CSS 代码拆分
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
          if (assetInfo.type === 'asset' && /\.(css)$/i.test(assetInfo.name as string)) {
            return 'theme/[name].[ext]';
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks';
          }
          if (id.includes('/packages/utils') || id.includes('plugin-vue:export-helper')) {
            return 'utils';
          }
          for (const dirName of getDirectoriesSync('../components')) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName;
            }
          }
        },
      },
    },
  },
});
