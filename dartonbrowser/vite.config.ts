import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Optimize build output
  build: {
    // Increase chunk size warning limit for the Dart compiled JS
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      // Don't bundle the Dart compiled JS into the main bundle
      // It's loaded separately as a script tag
      external: [/^\/dart\//],
    }
  },
  
  server: {
    // Open browser automatically in dev mode
    open: true,
  },
})
