import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import BootScreen from '@/components/boot/BootScreen.vue'
import { useUiStore } from '@/stores/ui'

describe('BootScreen', () => {
  beforeEach(() => {
    sessionStorage.clear()
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows a labelled dialog on first visit', () => {
    const wrapper = mount(BootScreen, { global: { plugins: [] } })
    expect(wrapper.get('[role="dialog"]').attributes('aria-label')).toBe('Loading PAVLO.EXE')
    wrapper.unmount()
  })

  it('closes on Escape and remembers it for the session', async () => {
    const ui = useUiStore()
    const wrapper = mount(BootScreen)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(ui.bootDone).toBe(true)
    expect(sessionStorage.getItem('pavlo:boot-done')).toBe('1')
    wrapper.unmount()
  })

  it('finishes by itself after the boot sequence', () => {
    const ui = useUiStore()
    const wrapper = mount(BootScreen)
    vi.advanceTimersByTime(3000)
    expect(ui.bootDone).toBe(true)
    wrapper.unmount()
  })

  it('does not render when already shown this session', () => {
    sessionStorage.setItem('pavlo:boot-done', '1')
    setActivePinia(createPinia())
    const wrapper = mount(BootScreen)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    wrapper.unmount()
  })
})
