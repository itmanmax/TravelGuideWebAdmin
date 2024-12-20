import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_MODE === '1' 
          ? process.env.VITE_REMOTE_API_URL 
          : process.env.VITE_LOCAL_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
