<script setup lang="ts">
import { ROUTE } from '@/configs/layout-config'
import useWordStore from '@/stores/word-store'
import { Dialog } from 'primevue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryEdit from './CategoryEdit.vue'
import CategoryAdd from './CategoryAdd.vue'

const router = useRouter()
const wordStore = useWordStore()
const visibleId = ref<number | null>(null)

function onRowClick(id: number) {
  router.push(`${ROUTE.WORD}/${id}`)
}
</script>

<template>
  <CategoryAdd />
  <div>
    <div class="flex items-center gap-2">
      <div class="w-[2rem]">
        <p>ID</p>
      </div>
      <div class="w-[10rem]">
        <p>Title</p>
      </div>
      <div>
        <p>Feature</p>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="item in Object.values(wordStore.categories)" :key="item.id">
        <div
          class="inline-flex cursor-pointer items-center gap-2 rounded-[16px] border-[0.5px] border-[red] p-[16px]"
        >
          <div class="w-[2rem]">
            <p>{{ item.id }}</p>
          </div>
          <div class="w-[10rem]">
            <p>{{ item.title }}</p>
          </div>
          <div class="flex gap-2">
            <button
              class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
              :onclick="() => onRowClick(item.id)"
            >
              Detail
            </button>
            <button
              class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
              :onclick="() => (visibleId = item.id)"
            >
              Edit
            </button>
          </div>
        </div>
        <Dialog
          :visible="visibleId == item.id"
          modal
          header="Edit Category"
          :style="{ width: '25rem' }"
        >
          <CategoryEdit :item="item" :onClose="() => (visibleId = null)" />
        </Dialog>
      </div>
    </div>
  </div>
</template>
