<script setup lang="ts">
import { ref } from 'vue';

const activeNames = ref(['a', 'b']);
</script>

<template>
  <n-button type="primary" loading>按钮</n-button>
  <n-collapse v-model="activeNames">
    <n-collapse-item name="a" title="Title a">
      <div>this is content a</div>
    </n-collapse-item>
    <n-collapse-item name="b" title="title b">
      <div>this is content b</div>
    </n-collapse-item>
    <n-collapse-item name="c" title="title c  disable" disabled>
      <div>this is content c</div>
    </n-collapse-item>
  </n-collapse>
</template>
