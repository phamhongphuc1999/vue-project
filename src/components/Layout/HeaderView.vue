<script lang="ts" setup>
import ThemeButton from '@/components/Button/ThemeButton.vue'
import LanguageSelect from '@/components/Select/LanguageSelect.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentRouteName = computed(() => router.currentRoute.value.name)
</script>

<template>
  <div
    class="container fixed left-[50%] top-[1rem] z-[1205] mx-auto h-[65px] max-w-[960px] translate-x-[-50%] rounded-[999px] bg-gray-300 px-[1rem]"
  >
    <div class="flex h-full items-center justify-between">
      <div class="flex items-center gap-2" v-if="currentRouteName != 'config'">
        <ThemeButton />
        <LanguageSelect />
      </div>
    </div>
  </div>
</template>
