import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import AppHeader from '@/components/layout/AppHeader.vue'
import { useExploreSupport } from '@/composables/useExploreSupport'
import { useUiStore } from '@/stores/ui'

const webgl = vi.hoisted(() => ({ value: true }))
vi.mock('@/composables/useWebGLSupport', () => ({ hasWebGL: () => webgl.value }))

function mockMedia(matches: Record<string, boolean>) {
  const noop = vi.fn<() => void>()
  window.matchMedia = vi.fn<(query: string) => unknown>((query) => ({
    matches: matches[query] ?? false,
    media: query,
    addEventListener: noop,
    removeEventListener: noop,
  })) as unknown as typeof window.matchMedia
}

const REDUCED = '(prefers-reduced-motion: reduce)'
const WIDE = '(min-width: 768px)'

describe('ui store: explorer state', () => {
  beforeEach(() => {
    sessionStorage.clear()
    setActivePinia(createPinia())
  })

  it('opens, closes and exits zones, remembering the last one', () => {
    const ui = useUiStore()
    ui.enterExplore()
    expect(ui.exploreMode).toBe(true)

    ui.openZone('projects')
    expect(ui.activeZone).toBe('projects')

    ui.closeZone()
    expect(ui.activeZone).toBeNull()
    expect(ui.lastZone).toBe('projects')

    ui.openZone('skills')
    ui.exitExplore()
    expect(ui.exploreMode).toBe(false)
    expect(ui.activeZone).toBeNull()
    expect(ui.lastZone).toBe('skills')
  })
})

describe('useExploreSupport', () => {
  const Host = defineComponent({
    setup() {
      const { supported } = useExploreSupport()
      return () => h('p', supported.value ? 'yes' : 'no')
    },
  })

  beforeEach(() => {
    webgl.value = true
  })

  it('is supported with WebGL, a wide screen and no reduced-motion preference', async () => {
    mockMedia({ [WIDE]: true })
    const wrapper = mount(Host)
    await nextTick()
    expect(wrapper.text()).toBe('yes')
  })

  it.each([
    ['prefers-reduced-motion', { [REDUCED]: true, [WIDE]: true }, true],
    ['a narrow screen', { [WIDE]: false }, true],
    ['no WebGL', { [WIDE]: true }, false],
  ])('is not supported with %s', async (_name, media, gl) => {
    webgl.value = gl
    mockMedia(media)
    const wrapper = mount(Host)
    await nextTick()
    expect(wrapper.text()).toBe('no')
  })
})

describe('AppHeader explore toggle', () => {
  beforeEach(() => {
    sessionStorage.clear()
    setActivePinia(createPinia())
  })

  it('is hidden when the explorer is not supported', () => {
    const wrapper = mount(AppHeader, { props: { activeId: 'hero', exploreSupported: false } })
    expect(wrapper.find('#explore-toggle').exists()).toBe(false)
  })

  it('enters the explorer when clicked', async () => {
    const ui = useUiStore()
    const wrapper = mount(AppHeader, { props: { activeId: 'hero', exploreSupported: true } })
    await wrapper.get('#explore-toggle').trigger('click')
    expect(ui.exploreMode).toBe(true)
  })
})
