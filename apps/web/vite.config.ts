import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import path from 'path'
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

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

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
              if (id.includes('framer-motion') || id.includes('motion')) return 'vendor-motion'
              if (id.includes('react-dom')) return 'vendor-react'
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
