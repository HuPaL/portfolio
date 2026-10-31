<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { bootLines } from '@/data/boot'
import { useUiStore } from '@/stores/ui'

const LINE_MS = 280
const HOLD_MS = 250

const ui = useUiStore()
const visibleCount = ref(0)
const skipButton = ref<HTMLButtonElement | null>(null)
let timers: number[] = []
let wasShown = false

function clearTimers() {
  timers.forEach((t) => window.clearTimeout(t))
  timers = []
}

function finish() {
  if (ui.bootDone) return
  clearTimers()
  ui.finishBoot()
  if (wasShown) {
    // The focused skip button is about to disappear; hand focus to the content.
    void nextTick(() => document.getElementById('main')?.focus({ preventScroll: true }))
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') finish()
}

onMounted(() => {
  if (ui.bootDone) return
  wasShown = true
  skipButton.value?.focus()
  window.addEventListener('keydown', onKeydown)

  bootLines.forEach((_, i) => {
    timers.push(window.setTimeout(() => (visibleCount.value = i + 1), LINE_MS * i))
  })
  timers.push(window.setTimeout(finish, LINE_MS * bootLines.length + HOLD_MS))
})

onBeforeUnmount(() => {
  clearTimers()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Transition name="boot">
    <div
      v-if="!ui.bootDone"
      class="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg) p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Loading PAVLO.EXE"
      @click="finish"
    >
      <div class="glass w-full max-w-md p-6 font-mono text-sm">
        <ul class="space-y-1.5" aria-live="polite">
          <li
            v-for="(line, i) in bootLines.slice(0, visibleCount)"
            :key="i"
            :class="i === bootLines.length - 1 ? 'text-(--color-accent)' : 'text-(--color-muted)'"
          >
            <span aria-hidden="true">&gt; </span>{{ line }}
          </li>
        </ul>
        <button
          ref="skipButton"
          type="button"
          class="mt-6 rounded-md border border-(--color-border) px-3 py-1.5 text-xs text-(--color-muted) transition-colors hover:text-(--color-text)"
          @click.stop="finish"
        >
          Skip (Esc)
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.boot-leave-active {
  transition: opacity 0.35s ease;
}
.boot-leave-to {
  opacity: 0;
}
</style>
