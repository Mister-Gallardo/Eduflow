import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['apps/*/src/**/*.test.ts', 'apps/*/src/**/*.test.tsx', 'packages/*/src/**/*.test.ts'],
    setupFiles: ['./setupTests.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'apps/web/src'),
    },
  },
})
