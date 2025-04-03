<script lang="ts" setup>
import type { BreadcrumbItemType } from '@/global'
import { RouterLink } from 'vue-router'

const { items } = defineProps<{ items: Array<BreadcrumbItemType> }>()
</script>

<template>
  <div class="flex flex-wrap items-center">
    <div v-for="(item, index) in items" :key="item.id">
      <RouterLink v-if="item.to" :to="item.to">
        {{ item.label }}
      </RouterLink>
      <p v-if="!item.to">{{ item.label }}</p>
      <i v-if="index < items.length - 1" class="pi pi-angle-right" style="font-size: 1rem"></i>
    </div>
  </div>
</template>
