<template>
  <n-popconfirm title="提示" @confirm="popconfirm">
    <n-button type="primary" :loading="loading">按钮</n-button>
  </n-popconfirm>
</template>

<script setup lang="ts">
import { NButton, NPopconfirm } from 'sunlit-ui'
import { ref } from 'vue'
const loading = ref(false)
function popconfirm() {
  console.log('confirm')
}
</script>
