import reactRefresh from '@vitejs/plugin-react-refresh';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { defineConfig } from 'vitest/config';

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
    environment: 'jsdom',
    globals: true,
    setupFiles: './ui-src/setupTests.ts', // Caminho para o arquivo setup
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], // include your test files
    exclude: ['ui-src/main.tsx', 'ui-src/App.tsx']
  },
  optimizeDeps: {
    exclude: ['ui-src/assets/icons', 'ui-src/main.tsx']
  }
})
