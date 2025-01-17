<script setup lang="ts">
import { watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import CommonContainer from './components/CommonContainer.vue'
import FooterView from './components/Layout/FooterView.vue'
import HeaderView from './components/Layout/HeaderView.vue'
import { LS } from './configs/constance'
import type { ThemeMode } from './global'
import useConfigStore from './stores/config-store'

const configStore = useConfigStore()

watchEffect(() => {
  const themeMode = localStorage.getItem(LS.THEME) as ThemeMode | undefined
  configStore.initLocalStorage(themeMode)
})
</script>

<template>
  <HeaderView />
  <CommonContainer
    class="mb-[50px] flex h-full min-h-[calc(100vh-55px)] flex-col justify-between pt-[100px]"
  >
    <RouterView />
  </CommonContainer>
  <FooterView />
</template>
