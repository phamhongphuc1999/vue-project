<script lang="ts" setup>
import { Dialog } from 'primevue'
import { ref } from 'vue'

const isOpen = ref<boolean>(false)
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
      <input />
    </div>
  </Dialog>
</template>
