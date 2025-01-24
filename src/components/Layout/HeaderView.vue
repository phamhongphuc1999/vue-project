<script lang="ts" setup>
import ThemeButton from '@/components/Button/ThemeButton.vue'
import LanguageSelect from '@/components/Select/LanguageSelect.vue'
import { LayoutConfig } from '@/configs/layout-config'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import { Button, Popover } from 'primevue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { t } = useLocalTranslate()
const router = useRouter()
const currentRouteName = computed(() => router.currentRoute.value.name)

const op = ref<InstanceType<typeof Popover> | null>(null)

function onIconClick(event: Event) {
  if (op.value) op.value.toggle(event)
}
</script>

<template>
  <div
    class="container fixed left-[50%] top-[1rem] z-[1205] mx-auto h-[65px] max-w-[960px] translate-x-[-50%] rounded-[999px] bg-gray-300 px-[1rem]"
  >
    <div class="relative flex h-full items-center justify-between">
      <div class="flex items-center gap-2" v-if="currentRouteName != 'config'">
        <ThemeButton />
        <LanguageSelect />
      </div>
      <div v-else></div>
      <div class="absolute left-[50%] hidden translate-x-[-50%] items-center gap-2 md:flex">
        <div v-for="item in LayoutConfig" :key="item.id">
          <RouterLink :to="item.link">
            <div class="flex h-full cursor-pointer items-center">
              <p>{{ t(item.title) }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
      <Button type="button" icon="pi pi-align-justify" @click="onIconClick" />
    </div>
  </div>
  <Popover ref="op" class="left-[1rem] right-[1rem] top-[80px]">
    <div class="flex flex-col gap-2">
      <div v-for="item in LayoutConfig" :key="item.id">
        <RouterLink :to="item.link" :onclick="onIconClick">
          <div class="flex h-full cursor-pointer items-center gap-2">
            <i :class="item.icon" />
            <p>{{ t(item.title) }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </Popover>
</template>
