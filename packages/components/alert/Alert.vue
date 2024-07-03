<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from './types';
import { typeIconMap } from '@sunlit-ui/utils';
import { computed, ref } from 'vue';
import NIcon from '../icon/Icon.vue';

defineOptions({
  name: 'NAlert',
});

const props = withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  type: 'info',
  closable: true,
});

const emits = defineEmits<AlertEmits>();
const slots = defineSlots();

const visible = ref(true);

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');
const withDescription = computed(() => props.description || slots.default);

function close() {
  visible.value = false;
  emits('close');
}

function open() {
  visible.value = true;
}

defineExpose<AlertInstance>({
  close,
  open,
});
</script>

<template>
  <transition name="n-alert-fade">
    <div
      v-show="visible"
      class="n-alert"
      role="alert"
      :class="{
        [`n-alert__${type}`]: type,
        [`n-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <n-icon
        v-if="showIcon"
        class="n-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="n-alert__content">
        <span
          class="n-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="n-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="n-alert__close" v-if="closable">
          <n-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>
