<script setup lang="ts">
import { computed } from 'vue'
import SectionShell from '@/components/layout/SectionShell.vue'
import ProjectCard from '@/components/sections/ProjectCard.vue'
import { projects } from '@/data/projects'

// Featured projects first; sort is stable so authored order is kept within each group.
const ordered = computed(() => [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)))
</script>

<template>
  <SectionShell id="projects" title="Projects">
    <ul class="grid gap-4 md:grid-cols-2">
      <li v-for="project in ordered" :key="project.id">
        <ProjectCard :project="project" />
      </li>
    </ul>
  </SectionShell>
</template>
