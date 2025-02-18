<script setup lang="ts">
import { InputText } from 'primevue'
import CategoryAdd from '../CategoryAdd.vue'
import CategoryBoard from './CategoryBoard.vue'
</script>

<template>
  <div class="flex items-center gap-3">
    <CategoryAdd />
    <InputText type="text" placeholder="Search categories" />
  </div>
  <div>
    <div class="flex items-center gap-2">
      <div class="w-[2rem]">
        <p>ID</p>
      </div>
      <div class="w-[10rem]">
        <p>Title</p>
      </div>
      <div class="w-[10rem]">
        <p>Create at</p>
      </div>
      <div class="w-[10rem]">
        <p>Update at</p>
      </div>
      <div>
        <p>Feature</p>
      </div>
    </div>
    <CategoryBoard />
  </div>
</template>
