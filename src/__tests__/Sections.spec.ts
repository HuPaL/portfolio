import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AboutSection from '@/components/sections/AboutSection.vue'
import AgenticSection from '@/components/sections/AgenticSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectCard from '@/components/sections/ProjectCard.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import { agenticTopics } from '@/data/agentic'
import { experience } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import type { Project } from '@/types/portfolio'

describe('AboutSection', () => {
  it('renders every summary paragraph and fact', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.findAll('p')).toHaveLength(profile.summary.length)
    expect(wrapper.findAll('dt')).toHaveLength(profile.facts.length)
    expect(wrapper.findAll('dd')).toHaveLength(profile.facts.length)
  })
})

describe('SkillsSection', () => {
  it('renders a labelled list of skills for every group', () => {
    const wrapper = mount(SkillsSection)
    for (const group of skillGroups) {
      const list = wrapper.get(`ul[aria-label="${group.label} skills"]`)
      expect(list.findAll('li')).toHaveLength(group.skills.length)
    }
  })
})

describe('ProjectsSection', () => {
  it('renders one card per project with featured projects first', () => {
    const wrapper = mount(ProjectsSection)
    const titles = wrapper.findAll('article h3').map((h) => h.text())
    expect(titles).toHaveLength(projects.length)

    const firstNonFeatured = projects.findIndex((p) => !p.featured)
    const featuredTitles = projects.filter((p) => p.featured).map((p) => p.title)
    expect(titles.slice(0, featuredTitles.length)).toEqual(featuredTitles)
    expect(firstNonFeatured).toBeGreaterThan(-1)
  })
})

describe('AgenticSection', () => {
  it('renders a card per topic and hides empty tool lists', () => {
    const wrapper = mount(AgenticSection)
    expect(wrapper.findAll('h3')).toHaveLength(agenticTopics.length)
    const withTools = agenticTopics.filter((t) => t.tools.length > 0).length
    expect(wrapper.findAll('ul[aria-label$="tools"]')).toHaveLength(withTools)
  })
})

describe('ExperienceSection', () => {
  it('renders an ordered timeline, newest first, with all highlights', () => {
    const wrapper = mount(ExperienceSection)
    expect(wrapper.find('ol').exists()).toBe(true)
    const roles = wrapper.findAll('ol > li > h3')
    expect(roles).toHaveLength(experience.length)
    const total = experience.reduce((n, e) => n + e.highlights.length, 0)
    expect(wrapper.findAll('ol > li ul > li')).toHaveLength(total)
    expect(wrapper.get('ol > li p').text()).toBe(experience[0]?.period)
  })
})

describe('ContactSection', () => {
  it('renders email, phone and external links with correct hrefs', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.get(`a[href="mailto:${profile.email}"]`).text()).toBe(profile.email)
    expect(wrapper.get('a[href="tel:+380934932369"]').text()).toBe(profile.phone)
    for (const link of profile.links) {
      const el = wrapper.get(`a[href="${link.href}"]`)
      expect(el.attributes('rel')).toBe('noopener')
      expect(el.attributes('target')).toBe('_blank')
    }
    expect(wrapper.text()).toContain(profile.location)
    expect(wrapper.text()).not.toContain('will be added soon')
  })
})

describe('ProjectCard', () => {
  const base: Project = {
    id: 'x',
    title: 'X',
    context: 'ctx',
    summary: 'sum',
    stack: ['Vue 3'],
    links: {},
    featured: false,
  }

  it('shows a fallback instead of empty links when there are none', () => {
    const wrapper = mount(ProjectCard, { props: { project: base } })
    expect(wrapper.findAll('a')).toHaveLength(0)
    expect(wrapper.text()).toContain('No public link')
  })

  it('renders external links safely when provided', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: { ...base, links: { demo: 'https://example.com' } } },
    })
    const link = wrapper.get('a')
    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('rel')).toBe('noopener')
    expect(link.attributes('target')).toBe('_blank')
  })
})
