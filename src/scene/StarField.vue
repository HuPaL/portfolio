<script setup lang="ts">
import { ref } from 'vue'
import { useLoop } from '@tresjs/core'
import type { Points } from 'three'

const COUNT = 1200

// Points on a spherical shell around the constellation.
const positions = new Float32Array(COUNT * 3)
for (let i = 0; i < COUNT; i++) {
  const radius = 25 + Math.random() * 35
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
  positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
  positions[i * 3 + 2] = radius * Math.cos(phi)
}

const points = ref<Points | null>(null)
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  if (points.value) points.value.rotation.y += delta * 0.01
})
</script>

<template>
  <TresPoints ref="points">
    <TresBufferGeometry :position="[positions, 3]" />
    <TresPointsMaterial
      color="#9aa3b5"
      :size="0.12"
      :size-attenuation="true"
      :transparent="true"
      :opacity="0.7"
      :depth-write="false"
    />
  </TresPoints>
</template>
