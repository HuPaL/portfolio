<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { sections } from '@/data/sections'
import { zoneComponents } from '@/scene/zoneComponents'
import { useUiStore } from '@/stores/ui'
import type { SectionId } from '@/types/portfolio'

const props = defineProps<{ sectionId: SectionId }>()
const emit = defineEmits<{ close: [] }>()

const ui = useUiStore()
const root = ref<HTMLElement | null>(null)
const label = computed(() => sections.find((s) => s.id === props.sectionId)?.label ?? '')
const zoneIds = new Set<string>(sections.map((s) => s.id))

const focusPanel = () => void nextTick(() => root.value?.focus({ preventScroll: true }))
onMounted(focusPanel)
watch(() => props.sectionId, focusPanel)

// In the explorer, in-page anchors (e.g. the hero CTAs) should open the matching zone.
function onClick(event: MouseEvent) {
  const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
  const id = anchor?.getAttribute('href')?.slice(1)
  if (id && zoneIds.has(id)) {
    event.preventDefault()
    ui.openZone(id as SectionId)
  }
}
</script>

<template>
  <div
    ref="root"
    role="dialog"
    :aria-label="label"
    tabindex="-1"
    class="glass glass-flat fixed top-0 right-0 z-10 h-full w-full max-w-xl overflow-y-auto rounded-none border-y-0 border-r-0 pt-14 outline-none"
    @click="onClick"
  >
    <button
      type="button"
      class="absolute top-3 left-4 rounded-md border border-(--color-border) px-3 py-1.5 text-sm text-(--color-muted) transition-colors hover:text-(--color-text)"
      @click="emit('close')"
    >
      Close<span class="sr-only"> {{ label }}</span>
    </button>
    <!-- Sections are authored as full-page blocks; compact them for the panel. Nested
         `.glass` cards must not blur either: the backdrop is the animating canvas. -->
    <div class="[&>section]:min-h-0! [&>section]:py-6! [&_.glass]:[backdrop-filter:none]!">
      <component :is="zoneComponents[sectionId]" />
    </div>
  </div>
</template>
