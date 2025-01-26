<script setup lang="ts">
import { type CategoryType } from '@/global'

defineProps<{ item: CategoryType; onClose: () => void }>()
</script>

<template>
  <p>Category Id: {{ item.id }}</p>
  <p>Category title: {{ item.title }}</p>
  <div class="mt-[1rem] flex justify-end">
    <button
      class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
      :onclick="onClose"
    >
      Close
    </button>
  </div>
</template>
