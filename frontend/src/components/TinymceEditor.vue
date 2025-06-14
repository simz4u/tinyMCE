<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import Editor from '@tinymce/tinymce-vue'

const doc = new Y.Doc()
const wsProvider = new WebsocketProvider('ws://localhost:1234', 'unique-room-id', doc)
const yText = doc.getText('shared-text')

const apiKey = "1q1dkuycsrajbx9wkzym5sazs7fmx2exutv7bm2378ny04wh"
const editorContent = ref('')

let isUpdatingFromYjs = false

wsProvider.on('status', event => {
  console.log('WebSocket status:', event.status)
})

watch(editorContent, (newVal, oldVal) => {
  console.log('[watch] editorContent changed:', { oldVal, newVal })
  if (isUpdatingFromYjs) {
    console.log('[watch] update ignored due to Yjs source')
    return
  }
  if (yText.toString() !== newVal) {
    console.log('[watch] syncing content to Yjs')
    yText.delete(0, yText.length)
    yText.insert(0, newVal)
  }
})

onMounted(() => {
  console.log('[onMounted] Registering Yjs observer')
  yText.observe(() => {
    console.log('[Yjs observe] document changed')
    isUpdatingFromYjs = true
    const newContent = yText.toString()
    if (editorContent.value !== newContent) {
      console.log('[Yjs observe] updating editorContent from Yjs', newContent)
      editorContent.value = newContent
    }
    isUpdatingFromYjs = false
  })
})

onBeforeUnmount(() => {
  console.log('[onBeforeUnmount] cleaning up')
  wsProvider.destroy()
  doc.destroy()
})
</script>

<template>
  <Editor
      id="tiny-editor"
      :api-key="apiKey"
      v-model="editorContent"
      :init="{
      width: 860,
      height: 600,
      menubar: false,
      plugins: ['link', 'table'],
      toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | link table'
    }"
  />
</template>
