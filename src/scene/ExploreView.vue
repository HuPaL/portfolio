<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import ConstellationScene from '@/scene/ConstellationScene.vue'
import ZonePanel from '@/scene/ZonePanel.vue'
import { sections } from '@/data/sections'
import { useUiStore } from '@/stores/ui'
import type { SectionId } from '@/types/portfolio'

const ui = useUiStore()
const hoveredId = ref<SectionId | null>(null)
const scene = ref<InstanceType<typeof ConstellationScene> | null>(null)

// Hit-testing happens on this wrapper (the canvas itself is pointer-transparent, see template),
// so mouse hover/click and touch taps all go through the same raycast.
let hoverFrame = 0
function onPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  const { clientX, clientY } = event
  if (hoverFrame) return // one raycast per frame is plenty
  hoverFrame = requestAnimationFrame(() => {
    hoverFrame = 0
    hoveredId.value = scene.value?.pick(clientX, clientY) ?? null
  })
}
function onPointerLeave() {
  hoveredId.value = null
}
function onClick(event: MouseEvent) {
  const id = scene.value?.pick(event.clientX, event.clientY)
  if (id) ui.openZone(id)
}

// Plain object on purpose: the scene moves these elements every frame without Vue re-renders.
const labels: Partial<Record<SectionId, HTMLElement>> = {}
function setLabel(id: SectionId, el: unknown) {
  if (el instanceof HTMLElement) labels[id] = el
  else delete labels[id]
}

const announcement = computed(() => {
  const zone = sections.find((s) => s.id === ui.activeZone)
  return zone ? `${zone.label} opened. Press Escape to return to the constellation.` : '3D constellation'
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && ui.activeZone) ui.closeZone()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.querySelector<HTMLElement>('[data-zone-button]')?.focus()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  cancelAnimationFrame(hoverFrame)
})

// When the panel closes, return focus to the button of the zone that was open.
watch(
  () => ui.activeZone,
  (now, before) => {
    if (!now && before) {
      void nextTick(() =>
        document.querySelector<HTMLElement>(`[data-zone-button="${before}"]`)?.focus(),
      )
    }
  },
)
</script>

<template>
  <div
    class="fixed inset-0 z-30 bg-(--color-bg)"
    :class="{ 'cursor-pointer': hoveredId }"
    role="region"
    aria-label="3D explorer"
  >
    <!-- Decorative: all content and controls have DOM equivalents below. The canvas is
         pointer-transparent (!important beats the inline style TresJS sets) so that pointer
         events reach this wrapper and never register with TresJS's pointer system. -->
    <div
      class="absolute inset-0 [&_canvas]:pointer-events-none!"
      aria-hidden="true"
      @click="onClick"
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
    >
      <TresCanvas window-size clear-color="#07090f" :dpr="[1, 1.5]">
        <ConstellationScene
          ref="scene"
          :active-id="ui.activeZone"
          :hovered-id="hoveredId"
          :labels="labels"
        />
      </TresCanvas>
      <span
        v-for="s in sections"
        :key="s.id"
        :ref="(el) => setLabel(s.id, el)"
        class="pointer-events-none absolute top-0 left-0 -translate-x-1/2 font-mono text-xs whitespace-nowrap text-(--color-muted) opacity-0"
      >
        {{ s.label }}
      </span>
    </div>

    <!-- z-20: stays above the zone panel (z-10) so "Exit 3D" is always reachable. -->
    <header class="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6">
      <span class="font-mono text-sm font-semibold tracking-wider text-(--color-accent)">
        PAVLO.EXE · 3D
      </span>
      <button
        type="button"
        class="glass glass-flat pointer-events-auto rounded-md px-3 py-1.5 text-sm transition-colors hover:text-(--color-accent)"
        @click="ui.exitExplore()"
      >
        Exit 3D
      </button>
    </header>

    <nav aria-label="Zones" class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
      <ul class="glass glass-flat space-y-1 p-2">
        <li v-for="s in sections" :key="s.id">
          <button
            type="button"
            :data-zone-button="s.id"
            :aria-current="ui.activeZone === s.id ? 'true' : undefined"
            class="w-full rounded-md px-3 py-1.5 text-left text-sm text-(--color-muted) transition-colors hover:text-(--color-text) aria-[current=true]:text-(--color-accent)"
            @click="ui.openZone(s.id)"
            @pointerenter="hoveredId = s.id"
            @pointerleave="hoveredId = null"
          >
            {{ s.label }}
            <span class="ml-1 font-mono text-xs opacity-60">{{ s.zoneName }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <p
      v-if="!ui.activeZone"
      class="pointer-events-none absolute right-6 bottom-6 hidden font-mono text-xs text-(--color-muted) lg:block"
    >
      Click a node or pick a zone · Esc to go back
    </p>

    <p class="sr-only" aria-live="polite">{{ announcement }}</p>

    <Transition name="panel">
      <ZonePanel v-if="ui.activeZone" :section-id="ui.activeZone" @close="ui.closeZone()" />
    </Transition>
  </div>
</template>

<style scoped>
.panel-enter-active,
.panel-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateX(1.5rem);
}
</style>
