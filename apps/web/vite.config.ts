import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
// Vitest's defineConfig is Vite's plus the `test` options.
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    // three.js alone is ~560 kB; it loads lazily after the page is visible.
    chunkSizeWarningLimit: 600,
  },
  test: {
    // Playwright runs the e2e folder; Vitest only runs unit tests.
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
})
