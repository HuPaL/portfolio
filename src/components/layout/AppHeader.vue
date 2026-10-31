<script setup lang="ts">
import { ref } from 'vue'
import { sections } from '@/data/sections'
import type { SectionId } from '@/types/portfolio'

defineProps<{ activeId: SectionId }>()

const open = ref(false)
</script>

<template>
  <header class="glass fixed inset-x-0 top-0 z-40 rounded-none border-x-0 border-t-0">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <a href="#hero" class="font-mono text-sm font-semibold tracking-wider text-(--color-accent)">
        PAVLO.EXE
      </a>

      <button
        type="button"
        class="rounded-md border border-(--color-border) px-3 py-1.5 text-sm sm:hidden"
        :aria-expanded="open"
        aria-controls="primary-nav"
        @click="open = !open"
      >
        {{ open ? 'Close' : 'Menu' }}
      </button>

      <nav
        id="primary-nav"
        aria-label="Primary"
        :class="[
          open ? 'flex' : 'hidden',
          'absolute inset-x-0 top-full flex-col gap-1 bg-(--color-surface) p-4',
          'sm:static sm:flex sm:flex-row sm:bg-transparent sm:p-0',
        ]"
      >
        <a
          v-for="s in sections"
          :key="s.id"
          :href="`#${s.id}`"
          :aria-current="activeId === s.id ? 'true' : undefined"
          class="rounded-md px-3 py-1.5 text-sm text-(--color-muted) transition-colors hover:text-(--color-text) aria-[current=true]:text-(--color-accent)"
          @click="open = false"
        >
          {{ s.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
