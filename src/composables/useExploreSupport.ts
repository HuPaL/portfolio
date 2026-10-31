import { onBeforeUnmount, onMounted, ref } from 'vue'
import { hasWebGL } from '@/composables/useWebGLSupport'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const WIDE_SCREEN = '(min-width: 768px)'

interface NetworkInformationLike {
  saveData?: boolean
}

/**
 * Whether the opt-in 3D explorer may be offered: WebGL available, no reduced-motion
 * preference, a wide enough viewport and no data-saver. Reactive to media changes.
 */
export function useExploreSupport() {
  const supported = ref(false)
  let queries: MediaQueryList[] = []

  const update = () => {
    const [motion, wide] = queries
    const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
    supported.value =
      hasWebGL() && !motion?.matches && Boolean(wide?.matches) && !connection?.saveData
  }

  onMounted(() => {
    if (typeof window.matchMedia !== 'function') return
    queries = [window.matchMedia(REDUCED_MOTION), window.matchMedia(WIDE_SCREEN)]
    queries.forEach((q) => q.addEventListener('change', update))
    update()
  })

  onBeforeUnmount(() => queries.forEach((q) => q.removeEventListener('change', update)))

  return { supported }
}
