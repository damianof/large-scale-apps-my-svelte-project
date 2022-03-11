/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  envDir: './src/',
  resolve: {
    alias: {
      // @ts-ignore
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  }
})
