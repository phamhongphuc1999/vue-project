<script setup lang="ts">
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import useAuthorizedWordApi from '@/hooks/useAuthorizedWordApi'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import useWordStore from '@/stores/word-store'
import PairDetailView from '@/view/WordPage/PairDetail/PairDetailView.vue'
import { useHead } from '@unhead/vue'
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

useHead({
  title: 'Word App | Detail',
})

const { t } = useLocalTranslate()
const { authorizedApi } = useAuthorizedWordApi()
const wordStore = useWordStore()
const route = useRoute()
const categoryId = route.params['id'] as string | undefined

watchEffect(async () => {
  if (authorizedApi && categoryId) {
    const _checkData = categoryId ? wordStore.pairs[parseInt(categoryId)] : undefined
    if (!_checkData) {
      const data = await authorizedApi.getDetailPairs(categoryId)
      wordStore.updatePairs(parseInt(categoryId), data.data)
    }
  }
})

const displayName = computed(() => {
  if (categoryId) {
    const categories = wordStore.categories
    const category = categories[parseInt(categoryId)]
    return category ? category.title : categoryId
  }
  return ''
})
</script>

<template>
  <AppBreadcrumb
    :items="[
      { id: 'home', label: t('page.home'), to: '/word' },
      { id: displayName, label: displayName },
    ]"
  />
  <p>
    The language switching feature is disabled in WordApp, instead, the language is showed English
    automatically
  </p>
  <PairDetailView />
</template>
