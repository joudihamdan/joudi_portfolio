import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ensure no modules are accidentally externalized
      external: [],
      output: {
        // Properly bundle all dependencies
        globals: {}
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['framer-motion', 'react', 'react-dom']
  }
})

