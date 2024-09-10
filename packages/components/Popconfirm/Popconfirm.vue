<script setup lang="ts">
import { ref, computed } from 'vue'
import { addUnit } from '@sunlit-ui/utils'
import { useLocale } from '@sunlit-ui/hooks'
import type { TooltipInstance } from '../Tooltip'
import type { PopconfirmProps, PopconfirmEmits } from './types'

import NTooltip from '../Tooltip/Tooltip.vue'
import NButton from '../Button/Button.vue'
import NIcon from '../icon/Icon.vue'

defineOptions({
  name: 'NPopconfirm',
})

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '',
  confirmButtonType: 'primary',
  icon: 'question-circle',
  iconColor: '#f90',
  hideAfter: 200,
  width: 150,
})

const emits = defineEmits<PopconfirmEmits>()
const tooltipRef = ref<TooltipInstance>()
const style = computed(() => ({ width: addUnit(props.width) }))

const locale = useLocale()

function hidePopper() {
  tooltipRef.value?.hide()
}

function confrim(e: MouseEvent) {
  emits('confirm', e)
  hidePopper()
}

function cancel(e: MouseEvent) {
  emits('cancel', e)
  hidePopper()
}
</script>

<template>
  <n-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="n-popconfirm" :style="style">
        <div class="n-popconfirm__main">
          <n-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="n-popconfirm__action">
          <n-button
            class="n-popconfirm__cancel"
            size="small"
            :type="cancelButtonType"
            @click="cancel"
          >
            {{ cancelButtonText || locale.t('popconfirm.cancelButtonText') }}
          </n-button>
          <n-button
            class="n-popconfirm__confirm"
            size="small"
            :type="confirmButtonType"
            @click="confrim"
          >
            {{ confirmButtonText || locale.t('popconfirm.confirmButtonText') }}
          </n-button>
        </div>
      </div>
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </n-tooltip>
</template>

<style scoped>
@import './style.css';
</style>
