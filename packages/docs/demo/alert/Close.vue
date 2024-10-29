<script setup>
import { message } from 'sunlit-ui'

function handleClose() {
  message.info('close callback')
}
</script>
<template>
  <div class="basic block">
    <n-alert title="Unclosable alert" type="success" :closable="false" />
    <n-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
