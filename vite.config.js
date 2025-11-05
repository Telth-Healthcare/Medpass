import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@mui/x-date-pickers', '@mui/x-date-pickers/DatePicker']
    }
  }
})
