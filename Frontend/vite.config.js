import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/products': 'http://localhost:5000',           //whenever we visit /api it will be prefixed with http://localhost:5000
    },
  },
})
