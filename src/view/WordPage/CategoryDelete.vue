<script lang="ts" setup>
import useAuthorizedWordApi from '@/hooks/useAuthorizedWordApi'
import useWordStore from '@/stores/word-store'

const props = defineProps<{ id: number; onClose: () => void }>()

const { authorizedApi } = useAuthorizedWordApi()
const wordStore = useWordStore()

async function onDeleteClick() {
  try {
    if (authorizedApi) {
      await authorizedApi.deleteCategory(props.id)
      const categories = await authorizedApi.getCategories()
      wordStore.setCategories(categories.data.items, categories.data.total)
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
    confirm delete category {{ id }}
  </button>
</template>
