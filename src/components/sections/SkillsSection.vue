<script setup lang="ts">
import SectionShell from '@/components/layout/SectionShell.vue'
import GlassPanel from '@/components/ui/GlassPanel.vue'
import TagChip from '@/components/ui/TagChip.vue'
import { skillGroups } from '@/data/skills'
</script>

<template>
  <SectionShell id="skills" title="Skills">
    <ul class="grid gap-4 sm:grid-cols-2">
      <GlassPanel
        v-for="group in skillGroups"
        :key="group.id"
        as="li"
        :class="{ 'sm:col-span-2': group.id === 'ai' }"
      >
        <h3 class="text-lg">{{ group.label }}</h3>
        <ul class="mt-4 flex flex-wrap gap-2" :aria-label="`${group.label} skills`">
          <li v-for="skill in group.skills" :key="skill.name">
            <TagChip>{{ skill.name }}</TagChip>
          </li>
        </ul>
      </GlassPanel>
    </ul>
  </SectionShell>
</template>
