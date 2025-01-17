<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb'
</script>

<template>
  <Breadcrumb
    :model="[
      { label: 'Electronics' },
      { label: 'Computer' },
      { label: 'Accessories' },
      { label: 'Keyboard' },
      { label: 'Wireless' },
    ]"
  />
</template>
