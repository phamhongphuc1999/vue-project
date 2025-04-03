<script setup lang="ts">
import { LS } from '@/configs/constance'
import { ROUTE } from '@/configs/layout-config'
import useAuthorizedWordApi from '@/hooks/useAuthorizedWordApi'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import useWordStore from '@/stores/word-store'
import CategoryView from '@/view/WordPage/CategoryView/CategoryView.vue'
import { useHead } from '@unhead/vue'
import moment from 'moment'
import Breadcrumb from 'primevue/breadcrumb'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

useHead({ title: 'Word App | Home' })

const { t } = useLocalTranslate()
const { authorizedApi } = useAuthorizedWordApi()
const wordStore = useWordStore()
const router = useRouter()

watchEffect(async () => {
  if (authorizedApi) {
    const query = router.currentRoute.value.query
    const page = (query['page'] ?? 0) as number
    const categories = await authorizedApi.getCategories({ pageNumber: page })
    const { total, items } = categories.data
    wordStore.setCategories(items, total)
  }
})

watchEffect(() => {
  const expire = localStorage.getItem(LS.TOKEN_EXPIRE)
  if (expire == undefined || moment(expire).isBefore(new Date())) router.push(ROUTE.LOGIN)
})
</script>

<template>
  <Breadcrumb :model="[{ label: t('page.word') }]" />
  <p>
    The language switching feature is disabled in WordApp, instead, the language is showed English
    automatically
  </p>
  <CategoryView />
</template>
