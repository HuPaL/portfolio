export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'agentic'
  | 'experience'
  | 'contact'

export interface SectionMeta {
  id: SectionId
  /** Short label used in navigation. */
  label: string
  /** Name of the "zone" in the future 3D universe (Phase 2). */
  zoneName: string
}

export interface SocialLink {
  label: string
  href: string
}

export interface Profile {
  name: string
  role: string
  tagline: string
  summary: string[]
  links: SocialLink[]
}

export interface Skill {
  name: string
  level?: 1 | 2 | 3 | 4 | 5
  note?: string
}

export interface SkillGroup {
  id: string
  label: string
  skills: Skill[]
}

export interface Project {
  id: string
  title: string
  summary: string
  stack: string[]
  links: { demo?: string; repo?: string }
  featured: boolean
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  highlights: string[]
}

export interface AgenticTopic {
  id: string
  title: string
  description: string
  tools: string[]
}
