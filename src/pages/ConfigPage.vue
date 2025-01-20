<script setup lang="ts">
import ThemeButton from '@/components/Button/ThemeButton.vue'
import LanguageSelect from '@/components/Select/LanguageSelect.vue'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import Breadcrumb from 'primevue/breadcrumb'

const { t } = useLocalTranslate()
</script>

<template>
  <Breadcrumb :model="[{ label: t('page.config') }]" />
  <ThemeButton />
  <LanguageSelect />
</template>
