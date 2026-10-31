import { ref } from 'vue'
import { defineStore } from 'pinia'

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

  return { bootDone, deviceTier, finishBoot, setDeviceTier }
})
