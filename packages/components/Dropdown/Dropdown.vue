<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { omit, isNil } from 'lodash-es'
import type {
  DropdownProps,
  DropdownEmits,
  DropdownInstance,
  DropdownItemProps,
  DropdownContext,
} from './types'
import { useId, useDisabledStyle } from '@sunlit-ui/hooks'
import { DROPDOWN_CTX_KEY } from './constants'
import type { TooltipInstance } from '../Tooltip/types'

import { type ButtonInstance, NButton, NButtonGroup } from '../Button'
import DropdownItem from './DropdownItem.vue'
import NTooltip from '../Tooltip/Tooltip.vue'

defineOptions({
  name: 'NDropdown',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[],
})
const emits = defineEmits<DropdownEmits>()
const slots = defineSlots()

const tooltipRef = ref<TooltipInstance>()
const triggerRef = ref<ButtonInstance>()

const tooltipProps = computed(() =>
  omit(props, ['items', 'hideAfterClick', 'size', 'type', 'splitButton'])
)

function handleItemClick(e: DropdownItemProps) {
  props.hideOnClick && tooltipRef.value?.hide()
  !isNil(e.command) && emits('command', e.command)
}

!TEST && useDisabledStyle()
defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
})

provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
})
</script>

<template>
  <div
    class="n-dropdown"
    :id="`dropdown-${useId().value}`"
    :class="{ 'is-disabled': props.disabled }"
  >
    <n-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef"
      @visible-change="$emit('visible-change', $event)"
    >
      <n-button-group :type="type" :size="size" :disabled="disabled" v-if="splitButton">
        <n-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </n-button>
        <n-button ref="triggerRef" icon="angle-down" />
      </n-button-group>
      <slot v-else name="default"></slot>

      <template #content>
        <ul class="n-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command ?? useId().value">
              <dropdown-item v-bind="item" />
            </template>
          </slot>
        </ul>
      </template>
    </n-tooltip>
  </div>
</template>

<style scoped>
@import './style.css';

:deep(.n-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}
</style>
