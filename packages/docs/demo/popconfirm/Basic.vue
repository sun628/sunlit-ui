<script setup lang="ts">
import { ja, ko, en, zhCn, zhTw, ErConfigProvider } from 'sunlit-ui'
import { get } from 'lodash-es'

import { computed, ref } from 'vue'

const language = ref('')
const langMap = {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
} as const
const locale = computed(() => get(langMap, language.value))
const changelang = () => {
  const l = ['zhCn', 'zhTw', 'ko', 'en', 'ja']
  language.value = l[(l.indexOf(language.value) + 1) % l.length]
}
</script>
<template>
  <n-button @click="changelang" type="info" style="margin-right: 20px">
    change language
  </n-button>
  <n-config-provider :locale="locale">
    <n-popconfirm title="Are you shure to delete this item?">
      <n-button>Delete</n-button>
    </n-popconfirm>
  </n-config-provider>
</template>
