<script setup lang="ts">
import type { LanguageType } from '@/global'
import useConfigStore from '@/stores/config-store'
import Select, { type SelectChangeEvent } from 'primevue/select'
import { computed } from 'vue'

const config = useConfigStore()

const selectedLan = computed(() => {
  return { name: config.language, code: config.language }
})

function onLanguageChange(event: SelectChangeEvent) {
  const _value = event.value as { name: string; code: LanguageType }
  config.setLanguage(_value.code)
}
</script>

<template>
  <div class="flex justify-center">
    <Select
      v-on:change="onLanguageChange"
      v-model="selectedLan"
      :options="[
        { name: 'en', code: 'en' },
        { name: 'vi', code: 'vi' },
      ]"
      optionLabel="name"
    />
  </div>
</template>
