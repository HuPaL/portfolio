<script setup lang="ts">
defineProps<{ target: string }>()
</script>

<template>
  <a
    :href="`#${target}`"
    class="fixed left-4 top-4 z-50 -translate-y-24 rounded-md bg-(--color-accent) px-4 py-2 font-medium text-(--color-bg) focus:translate-y-0"
  >
    Skip to content
  </a>
</template>
