import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],

  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui')) return 'vendor-mui'
            return 'vendor'
          }
        },
      },
    },
  },
})
