import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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

    server: {
      port: +env.PORT,
    },
    preview: {
      port: +env.PORT,
    },
  }
})
