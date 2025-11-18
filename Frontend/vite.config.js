import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Use a project-relative POSIX path so Sass can resolve it in Vite
        additionalData: '@use "src/scss/_variables.scss" as *;'
      }
    }
  },
  resolve: {
    alias: {
      scss: path.resolve(__dirname, 'src/scss')
    }
  }
})
