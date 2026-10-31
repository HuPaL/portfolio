<script setup lang="ts">
import { computed } from 'vue'
import type { SectionId } from '@/types/portfolio'

const props = defineProps<{ id: SectionId; title: string }>()
const headingId = computed(() => `${props.id}-heading`)
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="headingId"
    class="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
  >
    <h2 :id="headingId" class="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>
