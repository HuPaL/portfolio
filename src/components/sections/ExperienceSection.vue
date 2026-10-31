<script setup lang="ts">
import SectionShell from '@/components/layout/SectionShell.vue'
import { experience } from '@/data/experience'
</script>

<template>
  <SectionShell id="experience" title="Experience">
    <ol class="space-y-10 border-l border-(--color-border) pl-6">
      <li v-for="item in experience" :key="item.id" class="relative">
        <span
          aria-hidden="true"
          class="absolute top-2 -left-[1.82rem] size-2.5 rounded-full bg-(--color-accent) shadow-(--shadow-glow)"
        ></span>
        <p class="font-mono text-xs text-(--color-accent-2)">{{ item.period }}</p>
        <h3 class="mt-1 text-xl">{{ item.role }}</h3>
        <p class="text-(--color-muted)">{{ item.company }} · {{ item.location }}</p>
        <ul class="mt-4 list-disc space-y-2 pl-5 text-(--color-muted) marker:text-(--color-accent)">
          <li v-for="(highlight, i) in item.highlights" :key="i">{{ highlight }}</li>
        </ul>
      </li>
    </ol>
  </SectionShell>
</template>
