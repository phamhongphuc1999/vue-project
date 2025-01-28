<script lang="ts" setup>
import type { PairBaseType } from '@/global'
import useAuthorizedWordApi from '@/hooks/useAuthorizedWordApi'
import useWordStore from '@/stores/word-store'
import { Dialog } from 'primevue'
import { ref } from 'vue'
import { uuid } from 'vue-uuid'

const isOpen = ref<boolean>(false)
const { authorizedApi } = useAuthorizedWordApi()
const wordStore = useWordStore()
const categoryTitle = ref('')
const pairs = ref<{ [id: string]: PairBaseType }>({})
const tempPair = ref<Omit<PairBaseType, 'id'>>({ en: '', vi: '' })

function addNewPair() {
  if (tempPair.value.en.length > 0 && tempPair.value.vi.length > 0) {
    const id = uuid.v1()
    pairs.value[id] = { id, en: tempPair.value.en, vi: tempPair.value.vi }
  }
}

async function onAddClick() {
  const check = categoryTitle.value.length > 0 && Object.values(pairs.value).length > 0
  if (authorizedApi && check) {
    await authorizedApi.addCategory({
      title: categoryTitle.value,
      pairs: Object.values(pairs.value),
    })
    const categories = await authorizedApi.getCategories()
    wordStore.setCategories(categories.data)
  }
}
</script>

<template>
  <button
    :onclick="() => (isOpen = true)"
    class="border-gray-[100] my-[1rem] rounded-[8px] border-[1px] px-[8px] py-[4px]"
  >
    add new category
  </button>
  <Dialog v-model:visible="isOpen" modal header="Add Category" :style="{ width: '25rem' }">
    <div class="flex items-center gap-2">
      <p>Category title</p>
      <input autocomplete="off" v-model="categoryTitle" />
    </div>
    <div
      v-for="item in Object.values(pairs)"
      :key="item.id"
      class="mt-[1rem] rounded-[8px] border-[0.5px] border-[red] p-[0.5rem]"
    >
      <div class="flex items-center gap-2">
        <p>{{ item.en }}</p>
        <p>And</p>
        <p>{{ item.vi }}</p>
      </div>
    </div>
    <div class="mt-[1rem] rounded-[8px] border-[0.5px] border-[red] p-[0.5rem]">
      <div class="flex items-center gap-2">
        <p>English</p>
        <input autocomplete="off" v-model="tempPair.en" />
      </div>
      <div class="mt-[1rem] flex items-center gap-2">
        <p>Vietnamese</p>
        <input autocomplete="off" v-model="tempPair.vi" />
      </div>
    </div>
    <button
      :onclick="addNewPair"
      class="border-gray-[100] my-[1rem] rounded-[8px] border-[1px] px-[8px] py-[4px]"
    >
      Add new pair
    </button>
    <button
      :onclick="() => onAddClick()"
      class="border-gray-[100] my-[1rem] rounded-[8px] border-[1px] px-[8px] py-[4px]"
    >
      Add
    </button>
  </Dialog>
</template>
