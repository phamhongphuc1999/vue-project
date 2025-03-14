<script setup lang="ts">
import { watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import CommonContainer from './components/CommonContainer.vue'
import FooterView from './components/Layout/FooterView.vue'
import HeaderView from './components/Layout/HeaderView.vue'
import { LS } from './configs/constance'
import type { LanguageType, ThemeMode } from './global'
import useConfigStore from './stores/config-store'
import useUserStore from './stores/user-store'

const configStore = useConfigStore()
const userStore = useUserStore()

watchEffect(() => {
  const themeMode = localStorage.getItem(LS.THEME) as ThemeMode | undefined
  const language = localStorage.getItem(LS.LANGUAGE) as LanguageType | undefined
  configStore.initLocalStorage({ themeMode, language })

  const accessToken = localStorage.getItem(LS.ACCESS_TOKEN) as string | undefined
  userStore.setAccessToken(accessToken)
})
</script>

<template>
  <HeaderView />
  <CommonContainer class="mb-[50px] h-full min-h-[calc(100vh-55px)] pt-[100px]">
    <RouterView />
  </CommonContainer>
  <FooterView />
</template>
