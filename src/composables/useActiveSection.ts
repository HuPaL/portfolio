import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import type { SectionId } from '@/types/portfolio'

/**
 * Tracks which section is currently in the viewport centre band.
 * Sections that are not in the DOM are ignored.
 */
export function useActiveSection(ids: readonly SectionId[]): { activeId: Ref<SectionId> } {
  const activeId = ref<SectionId>(ids[0] ?? 'hero')
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeId.value = entry.target.id as SectionId
        }
      },
      // A thin band around the viewport centre avoids flicker between tall sections.
      { rootMargin: '-45% 0px -50% 0px' },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { activeId }
}
