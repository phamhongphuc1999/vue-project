<script lang="ts" setup>
import type { CategoryApiType, CategoryType } from '@/global'
import useAuthorizedApi from '@/hooks/useAuthorizedApi'
import useWordStore from '@/stores/word-store'

const props = defineProps<{ item: CategoryType; onClose: () => void }>()

const { authorizedApi } = useAuthorizedApi()
const wordStore = useWordStore()

async function onDeleteClick() {
  try {
    if (authorizedApi) {
      await authorizedApi.del<boolean>(`/category?categoryId=${props.item.id}`)
      const categories = await authorizedApi.get<CategoryApiType>('/category')
      wordStore.setCategories(categories.data)
    }
    props.onClose()
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <button
    :onclick="onDeleteClick"
    class="border-gray-[100] my-[1rem] rounded-[8px] border-[1px] px-[8px] py-[4px]"
  >
    confirm delete category {{ item.id }}
  </button>
</template>
