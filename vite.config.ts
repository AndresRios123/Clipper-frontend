import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Agregamos server.proxy para que las peticiones /api/* del frontend se redirijan al backend en http://localhost:3000
  server: {
    proxy: {
      // "/api" : "http://localhost:3000",
      "/api" : "https://clipper-backend-gys9.onrender.com",
    }
  }
})