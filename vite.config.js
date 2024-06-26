import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@': resolve(__dirname, 'src'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@components': resolve(__dirname, 'src/components/'),
    }
  },
  plugins: [vue()],
})
