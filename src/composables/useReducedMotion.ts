import { onBeforeUnmount, onMounted, ref } from 'vue'

const QUERY = '(prefers-reduced-motion: reduce)'

/** Reactive `prefers-reduced-motion: reduce` flag. */
export function useReducedMotion() {
  const reduced = ref(false)
  let mql: MediaQueryList | undefined

  const update = (event: MediaQueryListEvent | MediaQueryList) => {
    reduced.value = event.matches
  }

  onMounted(() => {
    mql = window.matchMedia(QUERY)
    update(mql)
    mql.addEventListener('change', update)
  })

  onBeforeUnmount(() => mql?.removeEventListener('change', update))

  return { reduced }
}
