<template>
  <Editor
      v-model="content"
      :api-key="apiKey"
      :init="editorInit"
  />
</template>

<script setup>
import { ref } from 'vue'
import Editor from '@tinymce/tinymce-vue' // 반드시 default export 사용!

const apiKey = "1q1dkuycsrajbx9wkzym5sazs7fmx2exutv7bm2378ny04wh"
const content = ref('') // 꼭 ref로 감싸야 함

// const apiKey = 'no-api-key' // 테스트용, 실제 키 아니어도 UI 뜨는지 확인용
// const content = ref('<p>Hello TinyMCE</p>')


const editorInit = {
  width: 800,
  height: 600,
  menubar: true,
  plugins: 'lists link image code',
  toolbar:
      'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | code',
  branding: false,
}
</script>

<style>
.preview {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-top: 1rem;
  background: #f9f9f9;
}
</style>