<script setup lang="ts">
import SectionShell from '@/components/layout/SectionShell.vue'
import GlassPanel from '@/components/ui/GlassPanel.vue'
import TagChip from '@/components/ui/TagChip.vue'
import { agenticTopics } from '@/data/agentic'
</script>

<template>
  <SectionShell id="agentic" title="AI Lab">
    <ul class="grid gap-4 md:grid-cols-3">
      <GlassPanel v-for="topic in agenticTopics" :key="topic.id" as="li">
        <h3 class="text-lg">{{ topic.title }}</h3>
        <p class="mt-3 text-(--color-muted)">{{ topic.description }}</p>
        <ul
          v-if="topic.tools.length"
          class="mt-4 flex flex-wrap gap-2"
          :aria-label="`${topic.title} tools`"
        >
          <li v-for="tool in topic.tools" :key="tool"><TagChip>{{ tool }}</TagChip></li>
        </ul>
      </GlassPanel>
    </ul>
  </SectionShell>
</template>
