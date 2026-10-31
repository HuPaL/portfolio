<script setup lang="ts">
import { computed } from 'vue'
import BootScreen from '@/components/boot/BootScreen.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import SectionShell from '@/components/layout/SectionShell.vue'
import SkipLink from '@/components/layout/SkipLink.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { sections } from '@/data/sections'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { activeId } = useActiveSection(sections.map((s) => s.id))

// Keep the page behind the boot overlay out of focus order and the a11y tree.
// `undefined` (not `false`) so Vue removes the attribute: any `inert` attribute blocks the page.
const inert = computed(() => (ui.bootDone ? undefined : true))

// Sections still to be built (plan steps 3–4); replaced one by one.
const pending = sections.filter((s) => s.id !== 'hero')
</script>

<template>
  <BootScreen />
  <SkipLink target="main" :inert="inert" />
  <AppHeader :active-id="activeId" :inert="inert" />
  <main id="main" tabindex="-1" :inert="inert">
    <HeroSection />
    <SectionShell v-for="s in pending" :id="s.id" :key="s.id" :title="s.label">
      <p class="text-(--color-muted)">In progress.</p>
    </SectionShell>
  </main>
</template>
