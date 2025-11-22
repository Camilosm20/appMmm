import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Ensure Sass can find project SCSS files by adding src to includePaths
        // and use a shorter import for the injected variables file.
        additionalData: '@use "scss/_variables" as *;',
        includePaths: [path.resolve(__dirname, 'src')]
      }
    }
  },
  resolve: {
    alias: {
      scss: path.resolve(__dirname, 'src/scss')
    }
  }
})
