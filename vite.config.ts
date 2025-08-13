import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const GH_BASE = '/contact-manager-react-js/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? GH_BASE : '/',
  plugins: [react()],
}))
