import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: serverUrl,
        changeOrigin: true,
      },
      '/socket.io/': {
        target: serverUrl,
        ws: true,
      }
    }
  }
})