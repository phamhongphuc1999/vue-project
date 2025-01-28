<script setup lang="ts">
import { type CategoryType, type PairBaseType, type UpdatingPairType } from '@/global'
import useAuthorizedWordApi from '@/hooks/useAuthorizedWordApi'
import useWordStore from '@/stores/word-store'
import { twMerge } from 'tailwind-merge'
import { computed, ref, watchEffect } from 'vue'
import { uuid } from 'vue-uuid'

const { item, onClose } = defineProps<{ item: CategoryType; onClose: () => void }>()

const { authorizedApi } = useAuthorizedWordApi()
const wordStore = useWordStore()
const categoryTitle = ref(item.title)
const removedPairs = ref<{ [id: string]: PairBaseType }>({})
const newPairs = ref<{ [id: string]: PairBaseType }>({})
const tempPair = ref<Omit<PairBaseType, 'id'>>({ en: '', vi: '' })

const updatedPairs = computed<{ [id: string]: UpdatingPairType }>(() => {
  const oldPairs = wordStore.pairs[item.id]
  if (oldPairs) {
    const result: { [id: string]: UpdatingPairType } = {}
    for (const item of Object.values(oldPairs)) {
      result[item.en] = { ...item, mode: 'retain' }
    }
    for (const item of Object.values(newPairs.value)) {
      if (!result[item.en]) result[item.en] = { ...item, mode: 'new' }
    }
    for (const item of Object.values(removedPairs.value)) {
      if (result[item.en]) result[item.en] = { ...item, mode: 'delete' }
    }
    return result
  }
  return {}
})

watchEffect(async () => {
  if (authorizedApi) {
    const _checkData = wordStore.pairs[item.id]
    if (!_checkData) {
      const data = await authorizedApi.getDetailPairs(item.id)
      wordStore.updatePairs(item.id, data.data)
    }
  }
})

function addNewPair() {
  newPairs.value[tempPair.value.en] = { ...tempPair.value, id: uuid.v1() }
  tempPair.value = { en: '', vi: '' }
}

function deletePair(item: UpdatingPairType) {
  if (item.mode == 'new') delete newPairs.value[item.en]
  else if (item.mode == 'retain') removedPairs.value[item.en] = item
}

function keepPair(item: UpdatingPairType) {
  if (removedPairs.value[item.en]) delete removedPairs.value[item.en]
}

async function onConfirmClick() {
  try {
    const wordCheck: { [key: string]: boolean } = {}
    const oldPairs = wordStore.pairs[item.id]
    if (oldPairs) {
      for (const item of Object.values(oldPairs)) {
        wordCheck[item.en] = true
      }
      for (const item of Object.values(newPairs.value)) {
        wordCheck[item.en] = true
      }
      for (const item of Object.values(removedPairs.value)) {
        if (wordCheck[item.en]) delete wordCheck[item.en]
      }
    }
    if (categoryTitle.value.length > 0 && Object.values(wordCheck).length > 0 && authorizedApi) {
      await authorizedApi.updateCategory(item.id, {
        title: categoryTitle.value,
        pairs: Object.values(newPairs.value),
        removedIds: Object.values(removedPairs.value).map((item) => item.id),
      })
      const categories = await authorizedApi.getCategories()
      wordStore.setCategories(categories.data)
      onClose()
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="max-h-[60vh] overflow-y-scroll">
    <p>Category Id: {{ item.id }}</p>
    <div class="flex items-center gap-2">
      <p>Category title:</p>
      <input autocomplete="off" v-model="categoryTitle" />
    </div>
    <div
      v-for="item in Object.values(updatedPairs)"
      :key="item.id"
      :class="
        twMerge(
          'mt-[8px] rounded-[8px] border-[0.5px] p-[0.5rem]',
          item.mode == 'retain' && 'border-[green]',
          item.mode == 'delete' && 'border-[#000000]',
          item.mode == 'new' && 'border-[yellow]'
        )
      "
    >
      <div class="flex items-center gap-2">
        <p>{{ item.en }}</p>
        <p>{{ item.vi }}</p>
        <p>{{ item.mode }}</p>
        <button
          v-if="item.mode != 'delete'"
          :onclick="() => deletePair(item)"
          class="rounded-[4px] bg-gray-50 px-[8px] text-[#000000]"
        >
          Delete
        </button>
        <button
          v-if="item.mode == 'delete'"
          :onclick="() => keepPair(item)"
          class="rounded-[4px] bg-gray-50 px-[8px] text-[#000000]"
        >
          Keep
        </button>
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
    <div class="mt-[1rem] flex justify-end">
      <button
        class="border-gray-[100] mr-[0.5rem] rounded-[8px] border-[1px] px-[8px] py-[4px]"
        :onclick="onConfirmClick"
      >
        Confirm change
      </button>
      <button
        class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
        :onclick="onClose"
      >
        Close
      </button>
    </div>
  </div>
</template>
