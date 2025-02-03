<script setup lang="ts">
import { APP_NAME } from '@/configs/constance'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import { useHead } from '@unhead/vue'
import Breadcrumb from 'primevue/breadcrumb'

useHead({
  title: `${APP_NAME} | Home`,
})

const { t } = useLocalTranslate()
</script>

<template>
  <Breadcrumb :model="[{ label: t('page.home') }]" />
</template>
