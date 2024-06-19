<template>
  <component
    :is="tag"
    :ref="_ref"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    class="n-button"
    :class="{
      [`n-button--${type}`]: type,
      [`n-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';

defineOptions({ name: 'NButton' });

withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
});

const slots = defineSlots();

const _ref = ref<HTMLButtonElement | null>();
</script>

