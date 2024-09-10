<script setup lang="ts">
import { type DropdownItemProps } from './types'
import { DROPDOWN_CTX_KEY } from './constants'
import { useId } from '@sunlit-ui/hooks'
import { inject, computed } from 'vue'

defineOptions({
  name: 'NDropdownItem',
})
const props = withDefaults(defineProps<DropdownItemProps>(), {
  divided: false,
  disabled: false,
  command: useId().value,
})

const ctx = inject(DROPDOWN_CTX_KEY)
const size = computed(() => ctx?.size.value)

function handleClick() {
  if (props.disabled) return
  ctx?.handleItemClick(props)
}
</script>

<template>
  <li v-if="divided" role="separator" class="divided-placeholder"></li>
  <li
    :id="`dropdown-item-${command ?? useId().value}`"
    :class="{
      'n-dropdown__item': true,
      ['n-dropdown__item--' + size]: size,
      'is-disabled': disabled,
      'is-divided': divided,
    }"
    @click="handleClick"
  >
    <slot>
      {{ label }}
    </slot>
  </li>
</template>

<style scoped>
@import './style.css';
</style>
