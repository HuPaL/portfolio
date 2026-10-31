import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SectionId } from '@/types/portfolio'

export type DeviceTier = 'low' | 'high'

const BOOT_KEY = 'pavlo:boot-done'

/** Boot is skipped for reduced-motion users and when already shown in this session. */
function shouldSkipBoot(): boolean {
  try {
    if (sessionStorage.getItem(BOOT_KEY)) return true
  } catch {
    // Storage can be blocked; fall through.
  }
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export const useUiStore = defineStore('ui', () => {
  const bootDone = ref(shouldSkipBoot())
  const deviceTier = ref<DeviceTier>('high')

  /** Opt-in 3D explorer. The regular page is unmounted while it is active. */
  const exploreMode = ref(false)
  const activeZone = ref<SectionId | null>(null)
  /** Last zone opened in the explorer; used to restore position on exit. */
  const lastZone = ref<SectionId | null>(null)

  function finishBoot() {
    bootDone.value = true
    try {
      sessionStorage.setItem(BOOT_KEY, '1')
    } catch {
      // Ignore blocked storage.
    }
  }

  function setDeviceTier(tier: DeviceTier) {
    deviceTier.value = tier
  }

  function enterExplore() {
    exploreMode.value = true
  }

  function exitExplore() {
    exploreMode.value = false
    activeZone.value = null
  }

  function openZone(id: SectionId) {
    activeZone.value = id
    lastZone.value = id
  }

  function closeZone() {
    activeZone.value = null
  }

  return {
    bootDone,
    deviceTier,
    exploreMode,
    activeZone,
    lastZone,
    finishBoot,
    setDeviceTier,
    enterExplore,
    exitExplore,
    openZone,
    closeZone,
  }
})
