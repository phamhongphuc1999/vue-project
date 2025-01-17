<script lang="ts" setup>
import useConfigStore from '@/stores/config-store.ts'

const { themeMode, switchTheme } = useConfigStore()
</script>

<template>
  <button v-if="themeMode == 'dark'" @click="() => switchTheme()">Dark</button>
  <button v-else @click="() => switchTheme()">Light</button>
</template>
