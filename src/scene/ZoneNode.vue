<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLoop } from '@tresjs/core'
import type { Mesh } from 'three'
import type { SectionMeta } from '@/types/portfolio'

const props = defineProps<{
  section: SectionMeta
  index: number
  active: boolean
  hovered: boolean
}>()

const mesh = ref<Mesh | null>(null)
const glow = computed(() => (props.active ? 0.7 : props.hovered ? 0.5 : 0.25))

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
  const m = mesh.value
  if (!m) return
  const [, y] = props.section.node.position
  // Gentle bobbing, offset per node so they do not move in lockstep.
  m.position.y = y + Math.sin(elapsed * 0.8 + props.index) * 0.12
  const target = props.active ? 1.25 : props.hovered ? 1.12 : 1
  m.scale.setScalar(m.scale.x + (target - m.scale.x) * 0.12)
})
</script>

<template>
  <!-- `userData.zoneId` is what ConstellationScene.pick() reads from raycast hits. -->
  <TresMesh ref="mesh" :position="section.node.position" :user-data="{ zoneId: section.id }">
    <TresSphereGeometry :args="[section.node.radius, 32, 32]" />
    <TresMeshStandardMaterial
      :color="section.node.color"
      :emissive="section.node.color"
      :emissive-intensity="glow"
      :roughness="0.45"
      :metalness="0.1"
    />
  </TresMesh>
</template>
