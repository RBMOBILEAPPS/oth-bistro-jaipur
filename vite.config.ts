import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isProd = process.env.NODE_ENV === 'production'
const repoBase = '/oth-bistro-jaipur/'

export default defineConfig({
  base: isProd ? repoBase : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
