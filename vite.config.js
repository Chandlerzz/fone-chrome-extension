import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import manifest from './src/manifest.js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const production = mode === 'production'

  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        input:{
          panel:path.resolve(path.resolve(),"panel.html")
        },
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },
    plugins: [crx({ manifest }), vue()],
  }
})
