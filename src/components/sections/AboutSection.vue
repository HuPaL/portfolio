<script setup lang="ts">
import SectionShell from '@/components/layout/SectionShell.vue'
import GlassPanel from '@/components/ui/GlassPanel.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <SectionShell id="about" title="About">
    <div class="grid gap-8 md:grid-cols-[3fr_2fr]">
      <div class="space-y-4 text-(--color-muted)">
        <p v-for="(paragraph, i) in profile.summary" :key="i">{{ paragraph }}</p>
      </div>

      <GlassPanel as="dl" class="space-y-5 self-start">
        <div v-for="fact in profile.facts" :key="fact.label" class="flex flex-col-reverse">
          <dt class="text-sm text-(--color-muted)">{{ fact.label }}</dt>
          <dd class="text-3xl font-semibold text-(--color-accent)">{{ fact.value }}</dd>
        </div>
      </GlassPanel>
    </div>
  </SectionShell>
</template>
