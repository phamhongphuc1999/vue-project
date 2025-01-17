<script lang="ts" setup>
defineProps({ msg: String })
</script>

<template>
  <div
    v-bind="{
      ...$attrs,
      class: `${$attrs.class || ''} container mx-auto max-w-[45rem] px-[1rem] sm:max-w-[90rem]`,
    }"
  >
    <slot></slot>
  </div>
</template>
