import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import manifest from './src/manifest.js'
import DefineOptions from 'unplugin-vue-define-options/vite'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const production = mode === 'production'

  return {
    resolve: {
      alias: {
        '@risen': path.resolve(path.resolve(), 'src/risen'),
        '@batchscript': path.resolve(path.resolve(), 'src/batchscript'),
      },
    },
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        input: {
          panel: path.resolve(path.resolve(), 'panel.html'),
          risen: path.resolve(path.resolve(), 'risen.html'),
          batchscript: path.resolve(path.resolve(), 'batchscript.html'),
        },
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },
    plugins: [crx({ manifest }), vue(),DefineOptions()],
  }
})
