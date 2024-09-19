import { resolve } from 'path'
import { defineConfig } from 'vite'
import { modifyFiles } from '@sunlit-ui/vite-plugins'

import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: ['./**/*.ts'],
      exclude: ['./vite.config.ts'],
    }),
    modifyFiles({
      rmFiles: ['./dist'],
    }),
  ],
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'hooks',
      fileName: 'index',
      formats: ['es'],
    },
  },
})
