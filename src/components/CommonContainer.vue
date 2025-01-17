<script lang="ts" setup>
defineProps({ msg: String })
</script>

<template>
  <div
    v-bind="{
      class: `container mx-auto max-w-[45rem] px-[1rem] sm:max-w-[90rem] ${$attrs.class || ''}`,
      ...$attrs,
    }"
  >
    <slot></slot>
  </div>
</template>
