import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      tinymce: path.resolve(__dirname, 'node_modules/tinymce'),
    }
  },
  optimizeDeps: {
    include: [
      'tinymce/tinymce',
      'tinymce/icons/default',
      'tinymce/themes/silver',
      'tinymce/models/dom',
      'tinymce/plugins/code',
      'tinymce/plugins/lists',
      'tinymce/plugins/link',
      'tinymce/plugins/table',
      'tinymce/plugins/paste' // 여기에 추가
    ]
  }
})
