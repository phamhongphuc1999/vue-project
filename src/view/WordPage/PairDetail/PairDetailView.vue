<script lang="ts" setup>
import type { AttemptDataType, CheckDataType, PairType } from '@/global'
import { randomSubGroup } from '@/services'
import useWordStore from '@/stores/word-store'
import { useInterval } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import AttemptBoard from './AttemptBoard.vue'

const defaultCheckData: CheckDataType = {
  numberOfOks: 0,
  oks: {},
  numberOfErrors: 0,
  errors: {},
  numberOfRemaining: 0,
  remaining: {},
  detail: {},
  description: '',
  isOk: true,
}

const route = useRoute()
const wordStore = useWordStore()
const categoryId = route.params['id'] as string | undefined

const isDetail = ref<boolean>(false)
const result = ref<{ [id: number]: string }>({})
const checkData = ref<CheckDataType>(defaultCheckData)
const isReveal = ref(false)
const attempt = ref<AttemptDataType>({ times: 1, analysis: {} })
const randomPairs = ref<Array<PairType>>([])
const { counter, reset, pause, resume } = useInterval(1000, { controls: true, immediate: false })

const pairs = computed(() => {
  return categoryId ? wordStore.pairs[parseInt(categoryId)] : {}
})

function onCheckClick() {
  const detail: CheckDataType['detail'] = {}
  const validValue = Object.values(pairs.value)
  let numberOfOks = 0
  let numberOfErrors = 0
  let numberOfRemaining = 0
  const okDetail: CheckDataType['oks'] = {}
  const remainingDetail: CheckDataType['remaining'] = {}
  const errorDetail: CheckDataType['errors'] = {}
  for (const item of validValue) {
    const resultValue = result.value[item.id]
    if (resultValue) {
      if (resultValue.length == 0) {
        numberOfRemaining++
        remainingDetail[item.id] = true
      } else if (resultValue != item.en) {
        numberOfErrors++
        errorDetail[item.id] = true
      } else {
        numberOfOks++
        okDetail[item.id] = true
      }
    } else {
      numberOfRemaining++
      remainingDetail[item.id] = true
    }
  }
  const isNotOk = numberOfErrors > 0 || numberOfRemaining != 0
  const description = isNotOk ? 'Something is wrong' : 'Good!'
  checkData.value = {
    numberOfOks,
    oks: okDetail,
    numberOfErrors,
    errors: errorDetail,
    numberOfRemaining,
    remaining: remainingDetail,
    detail,
    description,
    isOk: !isNotOk,
  }
  const currentTime = attempt.value.times
  const currentAnalysis = attempt.value.analysis
  currentAnalysis[currentTime] = {
    time: currentTime,
    oks: numberOfOks,
    errors: numberOfErrors,
    remains: numberOfRemaining,
  }
  attempt.value = {
    times: currentTime + 1,
    analysis: currentAnalysis,
  }
}

function onResetClick() {
  result.value = {}
  checkData.value = defaultCheckData
  isReveal.value = false
  attempt.value = { times: 1, analysis: {} }

  const _pairs = Object.values(pairs.value)
  const _array = randomSubGroup(_pairs.length)
  const _random: Array<PairType> = []
  for (const index of _array) {
    _random.push(_pairs[index - 1])
  }
  randomPairs.value = _random
}

function onDetailClick() {
  isDetail.value = !isDetail.value
}

function onReveal() {
  reset()
  resume()
  isReveal.value = true
}

watchEffect(() => {
  if (counter.value >= 5) {
    pause()
    isReveal.value = false
  }
})

watchEffect(() => {
  if (pairs.value) {
    const _pairs = Object.values(pairs.value)
    const _array = randomSubGroup(_pairs.length)
    const result: Array<PairType> = []
    for (const index of _array) {
      result.push(_pairs[index - 1])
    }
    randomPairs.value = result
  }
})
</script>

<template>
  <div class="flex flex-col gap-2 border-[1px] border-gray-50 p-[1rem]">
    <div v-for="item in randomPairs" :key="item.id">
      <div
        :class="
          twMerge(
            'flex items-center gap-2',
            checkData.errors[item.id] && 'border-[1px] border-[red]',
            checkData.remaining[item.id] && 'border-[1px] border-[yellow]'
          )
        "
      >
        <p>{{ item.vi }}</p>
        <input autocomplete="off" class="pair-input" v-model="result[item.id]" />
        <div v-if="isReveal && checkData.errors[item.id]" class="flex items-center gap-2">
          <i class="pi pi-arrow-right" />
          <p>{{ pairs[item.id].en }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-[1rem] flex items-center gap-2">
    <button
      v-if="checkData.description != 'Good!'"
      :onclick="onCheckClick"
      class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
    >
      Check
    </button>
    <button
      v-if="checkData.description == 'Good!'"
      :onclick="onResetClick"
      class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
    >
      Reset
    </button>
    <button
      :onclick="onDetailClick"
      class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
    >
      Check detail ({{ isDetail }})
    </button>
    <button
      v-if="checkData.numberOfErrors > 0"
      :onclick="onReveal"
      class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
    >
      Reveal result
    </button>
    <p v-if="counter <= 5 && isReveal">{{ 5 - counter }}</p>
  </div>
  <div class="mt-[1rem] border-[1px] border-gray-50 p-[1rem]">
    <AttemptBoard :attempts="attempt" />
    <p :class="twMerge(checkData.isOk ? 'text-[green]' : 'text-[red]')">
      {{ checkData.description }}
    </p>
    <div v-if="isDetail">
      <p>Number of errors: {{ checkData.numberOfErrors }}</p>
      <p>Number of remaining: {{ checkData.numberOfRemaining }}</p>
    </div>
  </div>
</template>
