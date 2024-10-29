<template>
  <div>
    <n-popconfirm title="提示" @confirm="popconfirm">
      <n-button type="primary" :loading="loading">按钮</n-button>
    </n-popconfirm>

    <div>
      <n-tooltip
        ref="tooltipRef"
        placement="right-end"
        :popper-options="{ placement: 'right-end', strategy: 'fixed' }"
      >
        <n-button icon="arrow-up">tooltip</n-button>
        <template #content>弹出部分</template>
      </n-tooltip>
    </div>
    <n-dropdown type="primary" :items="dropdownItems" split-button>dropdown</n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NButton,
  NTooltip,
  NPopconfirm,
  NDropdown,
  type DropdownItemProps,
} from 'sunlit-ui'
const dropdownItems = ref<Array<DropdownItemProps>>([
  {
    label: 'Option A',
    // name: 'a'
  },
  {
    label: 'Option B',
    // name: 'b'
  },
  {
    label: 'Option C',
    // name: 'c',
    divided: true,
  },
])

const loading = ref(false)
function popconfirm() {
  console.log('confirm')
}
</script>
