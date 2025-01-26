<script setup lang="ts">
import { ROUTE } from '@/configs/layout-config'
import useWordStore from '@/stores/word-store'
import { useRouter } from 'vue-router'

const router = useRouter()
const wordStore = useWordStore()

function onRowClick(id: number) {
  router.push(`${ROUTE.WORD}/${id}`)
}
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <div class="w-[2rem]">
        <p>ID</p>
      </div>
      <div><p>Title</p></div>
    </div>
    <div v-for="item in Object.values(wordStore.categories)" :key="item.id">
      <div class="flex cursor-pointer items-center gap-2" :onclick="() => onRowClick(item.id)">
        <div class="w-[2rem]">
          <p>{{ item.id }}</p>
        </div>
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
