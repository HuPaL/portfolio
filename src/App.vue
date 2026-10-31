<script setup lang="ts">
import { computed, nextTick, watch } from 'vue'
import BootScreen from '@/components/boot/BootScreen.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import SkipLink from '@/components/layout/SkipLink.vue'
import { ExploreView } from '@/components/layout/exploreAsync'
import AboutSection from '@/components/sections/AboutSection.vue'
import AgenticSection from '@/components/sections/AgenticSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import { useExploreSupport } from '@/composables/useExploreSupport'
import { sections } from '@/data/sections'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { activeId } = useActiveSection(sections.map((s) => s.id))
const { supported: exploreSupported } = useExploreSupport()

// `undefined` (not `false`) so Vue removes the attribute: any `inert` attribute blocks the page.
const inert = computed(() => (ui.bootDone ? undefined : true))

// The explorer is progressive enhancement: if its preconditions stop holding (e.g. the user
// enables reduced motion or shrinks the window), fall back to the regular page.
watch(exploreSupported, (ok) => {
  if (!ok && ui.exploreMode) ui.exitExplore()
})

// On leaving the explorer, restore the page position and keyboard focus.
watch(
  () => ui.exploreMode,
  async (now, before) => {
    if (before && !now) {
      await nextTick()
      if (ui.lastZone) {
        document.getElementById(ui.lastZone)?.scrollIntoView({ behavior: 'instant' })
      }
      document.getElementById('explore-toggle')?.focus({ preventScroll: true })
    }
  },
)
</script>

<template>
  <BootScreen />
  <ExploreView v-if="ui.exploreMode" :inert="inert" />
  <template v-else>
    <SkipLink target="main" :inert="inert" />
    <AppHeader :active-id="activeId" :explore-supported="exploreSupported" :inert="inert" />
    <main id="main" tabindex="-1" :inert="inert">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AgenticSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  </template>
</template>
