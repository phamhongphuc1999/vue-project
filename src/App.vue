<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterView from './components/Layout/FooterView.vue'
import HeaderView from './components/Layout/HeaderView.vue'
import CommonContainer from './components/CommonContainer.vue'
</script>

<template>
  <HeaderView />
  <CommonContainer>
    <RouterView />
  </CommonContainer>
  <FooterView />
</template>
