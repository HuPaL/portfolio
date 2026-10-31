export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'agentic'
  | 'experience'
  | 'contact'

export type Vec3 = readonly [x: number, y: number, z: number]

/** Placement of a section's node in the 3D constellation. */
export interface ZoneNode {
  position: Vec3
  /** Hex colour used for the node and its glow. */
  color: string
  /** Sphere radius in scene units. */
  radius: number
}

export interface SectionMeta {
  id: SectionId
  /** Short label used in navigation. */
  label: string
  /** Name of the "zone" in the 3D universe. */
  zoneName: string
  node: ZoneNode
}

export interface SocialLink {
  label: string
  href: string
}

export interface Fact {
  value: string
  label: string
}

export interface Profile {
  name: string
  role: string
  tagline: string
  summary: string[]
  facts: Fact[]
  /** Public contact email; omitted until the owner provides one. */
  email?: string
  /** Phone in display format, e.g. "+380 93 000 00 00". */
  phone?: string
  location?: string
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
  /** Where/for whom it was built, e.g. a company name. */
  context: string
  summary: string
  /** Measurable result, if known. */
  outcome?: string
  stack: string[]
  links: { demo?: string; repo?: string }
  featured: boolean
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  highlights: string[]
}

export interface AgenticTopic {
  id: string
  title: string
  description: string
  tools: string[]
}
