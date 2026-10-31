import { beforeEach, describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../App.vue'
import { sections } from '@/data/sections'

const render = () => mount(App, { global: { plugins: [createPinia()] } })

describe('App', () => {
  beforeEach(() => {
    // Skip the boot overlay so assertions target the page itself.
    sessionStorage.setItem('pavlo:boot-done', '1')
  })

  it('renders the profile name as the page h1 in a labelled hero section', () => {
    const wrapper = render()
    expect(wrapper.get('main#main h1').text()).toBe('Pavlo Hupalo')
    expect(wrapper.get('section#hero').attributes('aria-labelledby')).toBe('hero-heading')
  })

  it('provides a skip link to the main content', () => {
    const wrapper = render()
    expect(wrapper.get('a[href="#main"]').text()).toContain('Skip to content')
  })

  it('renders a nav link and a section for every configured section', () => {
    const wrapper = render()
    for (const s of sections) {
      expect(wrapper.find(`nav a[href="#${s.id}"]`).exists()).toBe(true)
      expect(wrapper.find(`section#${s.id}`).exists()).toBe(true)
    }
  })

  it('toggles the mobile menu via an aria-expanded button', async () => {
    const wrapper = render()
    const button = wrapper.get('button[aria-controls="primary-nav"]')
    expect(button.attributes('aria-expanded')).toBe('false')
    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
  })

  it('does not mark the page inert once boot is done', () => {
    const wrapper = render()
    expect(wrapper.get('main').attributes('inert')).toBeUndefined()
  })

  it('makes the page inert while the boot screen is visible', () => {
    sessionStorage.clear()
    const wrapper = render()
    expect(wrapper.get('main').attributes('inert')).toBeDefined()
    wrapper.unmount()
  })
})
