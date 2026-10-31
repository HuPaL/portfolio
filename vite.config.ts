import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import templateCompilerOptions from '@tresjs/core/template-compiler-options'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({ ...templateCompilerOptions }),
    tailwindcss(),
    vueDevTools(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      // Tree-shakeable slice of three.js, see src/scene/three-lite.ts.
      // The exact-match regex leaves `three/src/*` and `three/addons/*` untouched.
      { find: /^three$/, replacement: fileURLToPath(new URL('./src/scene/three-lite.ts', import.meta.url)) },
    ],
  },
})
