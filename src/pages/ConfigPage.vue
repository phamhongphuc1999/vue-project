<script setup lang="ts">
import ThemeButton from '@/components/Button/ThemeButton.vue'
import LanguageSelect from '@/components/Select/LanguageSelect.vue'
import { APP_NAME } from '@/configs/constance'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import useConfigStore from '@/stores/config-store'
import { useHead } from '@unhead/vue'
import Breadcrumb from 'primevue/breadcrumb'

useHead({
  title: `${APP_NAME} | Config`,
})

const { t } = useLocalTranslate()
const config = useConfigStore()
</script>

<template>
  <Breadcrumb :model="[{ label: t('page.config') }]" />
  <div class="flex gap-2">
    <ThemeButton />
    <p>{{ t(`theme.${config.themeMode}`) }}</p>
  </div>
  <div class="mt-[16px] flex items-center gap-4">
    <LanguageSelect />
    <p>{{ t(`language.${config.language}`) }}</p>
  </div>
</template>
