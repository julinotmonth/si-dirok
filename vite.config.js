import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/', // Ubah dari '/si-dirok/' ke '/'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
