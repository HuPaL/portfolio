<script setup lang="ts">
import { useUiStore } from '@/stores/ui'

defineProps<{ failed?: boolean }>()
const ui = useUiStore()
</script>

<template>
  <div
    class="fixed inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-(--color-bg) p-6 text-center"
    role="status"
  >
    <p class="font-mono text-sm text-(--color-muted)">
      {{ failed ? 'Could not load the 3D explorer.' : 'Loading 3D explorer…' }}
    </p>
    <button
      type="button"
      class="glass rounded-md px-4 py-2 text-sm hover:text-(--color-accent)"
      @click="ui.exitExplore()"
    >
      {{ failed ? 'Back to the page' : 'Cancel' }}
    </button>
  </div>
</template>
