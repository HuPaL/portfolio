<script setup lang="ts">
import GlassPanel from '@/components/ui/GlassPanel.vue'
import TagChip from '@/components/ui/TagChip.vue'
import type { Project } from '@/types/portfolio'

defineProps<{ project: Project }>()
</script>

<template>
  <GlassPanel as="article" class="flex h-full flex-col">
    <p class="font-mono text-xs text-(--color-accent-2)">{{ project.context }}</p>
    <h3 class="mt-2 text-xl">{{ project.title }}</h3>
    <p class="mt-3 text-(--color-muted)">{{ project.summary }}</p>
    <p v-if="project.outcome" class="mt-3 text-sm text-(--color-accent)">{{ project.outcome }}</p>

    <ul class="mt-4 flex flex-wrap gap-2" :aria-label="`${project.title} tech stack`">
      <li v-for="tech in project.stack" :key="tech"><TagChip>{{ tech }}</TagChip></li>
    </ul>

    <div class="mt-auto flex gap-4 pt-5 text-sm">
      <a
        v-if="project.links.demo"
        :href="project.links.demo"
        target="_blank"
        rel="noopener"
        class="underline decoration-(--color-border) underline-offset-4 hover:decoration-(--color-accent)"
      >
        Live demo<span class="sr-only"> (opens in a new tab)</span>
      </a>
      <a
        v-if="project.links.repo"
        :href="project.links.repo"
        target="_blank"
        rel="noopener"
        class="underline decoration-(--color-border) underline-offset-4 hover:decoration-(--color-accent)"
      >
        Source<span class="sr-only"> (opens in a new tab)</span>
      </a>
      <span v-if="!project.links.demo && !project.links.repo" class="text-(--color-muted)">
        No public link
      </span>
    </div>
  </GlassPanel>
</template>
