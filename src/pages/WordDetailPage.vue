<script setup lang="ts">
import type { PairApiType } from '@/global'
import useAuthorizedApi from '@/hooks/useAuthorizedApi'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import useWordStore from '@/stores/word-store'
import { Breadcrumb } from 'primevue'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const { t } = useLocalTranslate()
const { authorizedApi } = useAuthorizedApi()
const wordStore = useWordStore()
const route = useRoute()
const categoryId = route.params['id'] as string | undefined

watchEffect(async () => {
  if (authorizedApi && categoryId) {
    const _checkData = wordStore.pairs[parseInt(categoryId)]
    if (!_checkData) {
      const data = await authorizedApi.get<PairApiType>(`/category/pairs?categoryId=${categoryId}`)
      wordStore.updatePairs(parseInt(categoryId), data.data)
    }
  }
})
</script>

<template>
  <Breadcrumb :model="[{ label: t('page.word') }, { label: categoryId }]" />
</template>
