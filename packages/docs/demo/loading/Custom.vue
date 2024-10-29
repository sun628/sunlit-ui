<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
const activeNames = ref(['1', '2'])
</script>
<template>
  <div class="container">
    <n-collapse v-model="activeNames">
      <n-collapse-item
        title="Consistency"
        name="1"
        v-loading="isLoading"
        n-loading-text="Loading..."
        n-loading-spinner="circle-notch"
        n-loading-background="rgba(250, 250, 250, 0.8)"
      >
        <div>
          Consistent with real life: in line with the process and logic of real life, and
          comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such as: design
          style, icons and texts, position of elements, etc.
        </div>
      </n-collapse-item>
      <n-collapse-item title="Feedback" name="2" v-loading="isLoading">
        <div>
          Operation feedback: enable the users to clearly perceive their operations by
          style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging elements of
          the page.
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style scoped>
:deep(.n-collapse-item) {
  padding: 10px;
}
</style>
