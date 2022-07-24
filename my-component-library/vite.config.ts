import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  envDir: './src/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/') //fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: "MyComponentLib",
      fileName: (format) => `my-component-lib.${format}.js`,
    },
    rollupOptions: {
      // svelte should not be bundle with the cmoponent library
      // tell vite that this is an external dependency
      external: ['svelte'],
      output: {
        // To expose global variables for use in the UMD builds
        // for external dependencies
        globals: {
          svelte: 'Svelte'
        }
      }
    }
  }
})
