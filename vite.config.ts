import { defineConfig } from 'vitest/config'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  root: './ui-src',
  plugins: [reactRefresh(), viteSingleFile()],
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: '../dist',
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },
  test: {
    environment: 'jsdom'
  },
  optimizeDeps: {
    exclude: ['ui-src/assets/icons', 'ui-src/main.tsx']
  }
})
