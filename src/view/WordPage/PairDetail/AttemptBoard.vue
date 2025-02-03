<script lang="ts" setup>
import type { AttemptDataType } from '@/global'

defineProps<{ attempts: AttemptDataType }>()
</script>

<template>
  <div class="border-[1px] border-[green]">
    <p>Times: {{ attempts.times }}</p>
    <div v-for="item in Object.values(attempts.analysis)" :key="item.time">
      <p>
        {{
          `Time: ${item.time}: errors -> ${item.errors}, remains -> ${item.remains}, correct: ${item.oks}`
        }}
      </p>
    </div>
  </div>
</template>
