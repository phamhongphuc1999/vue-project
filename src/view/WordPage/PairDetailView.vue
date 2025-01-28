<script lang="ts" setup>
import type { CheckDataType } from '@/global'
import useWordStore from '@/stores/word-store'
import { twMerge } from 'tailwind-merge'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const wordStore = useWordStore()
const categoryId = route.params['id'] as string | undefined

const isDetail = ref<boolean>(false)
const result = ref<{ [id: number]: string }>({})
const checkData = ref<CheckDataType>({
  numberOfErrors: 0,
  numberOfRemaining: 0,
  detail: {},
  description: '',
  isOk: true,
})

const pairs = computed(() => {
  return categoryId ? wordStore.pairs[parseInt(categoryId)] : {}
})

function onInputChange(id: number, value: string) {
  result.value[id] = value
}

function onCheckClick() {
  const detail: CheckDataType['detail'] = {}
  let numberOfErrors = 0
  let remaining = Object.values(pairs.value).length
  for (const item of Object.entries(result.value)) {
    const id = parseInt(item[0])
    const validItem = pairs.value[id]
    if (item[1] == validItem.en) {
      detail[id] = true
      remaining--
    } else {
      detail[id] = false
      numberOfErrors++
    }
  }
  const isNotOk = numberOfErrors > 0 || remaining != 0
  const description = isNotOk ? 'Something is wrong' : 'Good!'
  checkData.value = {
    numberOfErrors,
    numberOfRemaining: remaining,
    detail,
    description,
    isOk: !isNotOk,
  }
}

function onDetailClick() {
  isDetail.value = !isDetail.value
}
</script>

<template>
  <div class="flex flex-col gap-2 border-[1px] border-gray-50 p-[1rem]">
    <div v-for="item in Object.values(pairs)" :key="item.id">
      <div class="flex items-center gap-2">
        <p>{{ item.vi }}</p>
        <input
          autocomplete="off"
          class="pair-input"
          :onchange="() => onInputChange(item.id, item.en)"
        />
      </div>
    </div>
  </div>
  <div class="mt-[1rem] flex items-center gap-2">
    <button
      :onclick="onCheckClick"
      class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
    >
      Check
    </button>
    <button
      :onclick="onDetailClick"
      class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
    >
      Check detail ({{ isDetail }})
    </button>
  </div>
  <div class="mt-[1rem] border-[1px] border-gray-50 p-[1rem]">
    <p :class="twMerge(checkData.isOk ? 'text-[green]' : 'text-[red]')">
      {{ checkData.description }}
    </p>
    <div v-if="isDetail">
      <p>Number of errors: {{ checkData.numberOfErrors }}</p>
      <p>Number of remaining: {{ checkData.numberOfRemaining }}</p>
    </div>
  </div>
</template>
