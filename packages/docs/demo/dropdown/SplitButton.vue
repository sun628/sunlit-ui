<script setup lang="ts">
import { type DropdownItemProps, message } from 'sunlit-ui'

const items: DropdownItemProps[] = [
  { command: '1', label: 'Action 1' },
  { command: '2', label: 'Action 2' },
  { command: '3', label: 'Action 3', disabled: true },
  { command: '4', label: 'Action 4', divided: true },
]

function handleClick() {
  message.info('button click')
}
</script>

<template>
  <div class="row">
    <n-dropdown :items="items">
      <n-button type="primary">
        Dropdown List
        <n-icon icon="angle-down" style="margin-left: 8px" />
      </n-button>
    </n-dropdown>
    <n-dropdown :items="items" type="primary" @click="handleClick" split-button>
      Dropdown List
    </n-dropdown>
  </div>
</template>

<style scoped>
.row div {
  margin-right: 16px;
}
</style>
