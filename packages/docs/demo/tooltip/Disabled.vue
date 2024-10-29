<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>

<template>
  <n-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
  >
    <n-button @click="disabled = !disabled">
      click to {{ disabled ? 'active' : 'close' }} tooltip function
    </n-button>
  </n-tooltip>
</template>
