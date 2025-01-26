<script setup lang="ts">
import type { CategoryApiType } from '@/global'
import useAuthorizedApi from '@/hooks/useAuthorizedApi'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import useWordStore from '@/stores/word-store'
import CategoryView from '@/view/WordPage/CategoryView.vue'
import Breadcrumb from 'primevue/breadcrumb'
import { watchEffect } from 'vue'

const { t } = useLocalTranslate()
const { authorizedApi } = useAuthorizedApi()
const wordStore = useWordStore()

watchEffect(async () => {
  if (authorizedApi) {
    const categories = await authorizedApi.get<CategoryApiType>('/category')
    wordStore.setCategories(categories.data)
  }
})
</script>

<template>
  <Breadcrumb :model="[{ label: t('page.word') }]" />
  <CategoryView />
</template>
