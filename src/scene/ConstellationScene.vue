<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLoop, useTres } from '@tresjs/core'
import { Raycaster, Vector2, Vector3, type PerspectiveCamera } from 'three'
import StarField from '@/scene/StarField.vue'
import ZoneNode from '@/scene/ZoneNode.vue'
import { sections } from '@/data/sections'
import type { SectionId } from '@/types/portfolio'

const props = defineProps<{
  activeId: SectionId | null
  hoveredId: SectionId | null
  /** Plain (non-reactive) map of DOM labels, positioned every frame without Vue re-renders. */
  labels: Partial<Record<SectionId, HTMLElement>>
}>()

const FOV = 40
// A narrower FOV and a larger distance keep close-up nodes round instead of stretched.
const ZONE_DISTANCE = 7.5
const OVERVIEW_POS = new Vector3(0, 0, 14)
const OVERVIEW_LOOK = new Vector3(0, 0, 0)
// Camera and look-target start far away so entering the explorer is a fly-in.
const camPos = new Vector3(0, 0, 24)
const camLook = new Vector3(0, 0, 0)
const targetPos = OVERVIEW_POS.clone()
const targetLook = OVERVIEW_LOOK.clone()
const projected = new Vector3()
const worldPos = new Vector3()

const camera = ref<PerspectiveCamera | null>(null)
const { scene } = useTres()
const raycaster = new Raycaster()
const pointer = new Vector2()

/**
 * Which zone node (if any) is under a viewport position. Picking is done here rather than
 * through TresJS pointer events so that taps work the same as mouse clicks (raycasting
 * does not depend on a prior pointer move) and so the canvas never registers with the
 * TresJS pointer registry, which keeps destroyed canvases alive.
 */
function pick(clientX: number, clientY: number): SectionId | null {
  const cam = camera.value
  if (!cam) return null
  pointer.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1)
  raycaster.setFromCamera(pointer, cam)
  const hit = raycaster
    .intersectObjects(scene.value.children, false)
    .find((i) => typeof i.object.userData.zoneId === 'string')
  return (hit?.object.userData.zoneId as SectionId | undefined) ?? null
}

defineExpose({ pick })

watch(
  () => props.activeId,
  (id) => {
    const node = sections.find((s) => s.id === id)?.node
    if (!node) {
      targetPos.copy(OVERVIEW_POS)
      targetLook.copy(OVERVIEW_LOOK)
      return
    }
    // Look slightly right of the node so it sits left of the content panel.
    const [x, y, z] = node.position
    targetLook.set(x + 1.6, y, z)
    targetPos.set(x + 1.6, y, z + ZONE_DISTANCE)
  },
  { immediate: true },
)

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  const cam = camera.value
  if (!cam) return

  // Frame-rate independent exponential smoothing.
  const k = 1 - Math.exp(-delta * 2.5)
  camPos.lerp(targetPos, k)
  camLook.lerp(targetLook, k)
  cam.position.copy(camPos)
  cam.lookAt(camLook)
  cam.updateMatrixWorld()

  // Project node positions to screen space for the DOM labels (canvas fills the viewport).
  const w = window.innerWidth
  const h = window.innerHeight
  const halfFovTan = Math.tan((FOV * Math.PI) / 360)
  for (const s of sections) {
    const el = props.labels[s.id]
    if (!el) continue
    worldPos.set(...s.node.position)
    // Place the label just below the node's on-screen edge, whatever the zoom level.
    const distance = cam.position.distanceTo(worldPos)
    const scale = props.activeId === s.id ? 1.25 : 1
    const radiusPx = ((s.node.radius * scale) / (distance * halfFovTan)) * (h / 2)
    projected.copy(worldPos).project(cam)
    const visible = projected.z < 1
    el.style.opacity = visible ? '1' : '0'
    el.style.transform = `translate(${(projected.x * 0.5 + 0.5) * w}px, ${(-projected.y * 0.5 + 0.5) * h + radiusPx + 14}px)`
  }
})
</script>

<template>
  <TresPerspectiveCamera
    ref="camera"
    :position="[0, 0, 24]"
    :fov="FOV"
    :near="0.1"
    :far="200"
    :make-default="true"
  />
  <TresAmbientLight :intensity="1.4" />
  <TresPointLight :position="[0, 4, 9]" :intensity="140" />
  <StarField />
  <ZoneNode
    v-for="(s, i) in sections"
    :key="s.id"
    :section="s"
    :index="i"
    :active="activeId === s.id"
    :hovered="hoveredId === s.id"
  />
</template>
