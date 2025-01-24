<script setup lang="ts">
import useLocalTranslate from '@/hooks/useLocalTranslate'
import Breadcrumb from 'primevue/breadcrumb'

const { t } = useLocalTranslate()
</script>

<template>
  <Breadcrumb :model="[{ label: t('page.word') }]" />
</template>
