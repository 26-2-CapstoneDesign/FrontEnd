import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // /api 요청을 백엔드(스프링, 8080)로 넘김
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
})