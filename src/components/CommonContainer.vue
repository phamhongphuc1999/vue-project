<template>
  <div
    v-bind="{
      ...$attrs,
      class: `${$attrs.class || ''} container mx-auto px-[1rem]`,
    }"
  >
    <slot></slot>
  </div>
</template>
