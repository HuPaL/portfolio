<script setup lang="ts">
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
</script>

<template>
  <button
    id="explore-toggle"
    type="button"
    aria-label="Explore in 3D"
    class="rounded-md border border-(--color-border) px-3 py-1.5 font-mono text-xs whitespace-nowrap text-(--color-accent) transition-colors hover:border-(--color-accent)"
    @click="ui.enterExplore()"
  >
    <span class="lg:hidden" aria-hidden="true">3D</span>
    <span class="hidden lg:inline" aria-hidden="true">Explore in 3D</span>
  </button>
</template>
