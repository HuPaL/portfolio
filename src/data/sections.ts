import type { SectionMeta } from '@/types/portfolio'

export const sections: readonly SectionMeta[] = [
  { id: 'hero', label: 'Home', zoneName: 'Developer Core' },
  { id: 'about', label: 'About', zoneName: 'Developer Core' },
  { id: 'skills', label: 'Skills', zoneName: 'Vue.js Core' },
  { id: 'projects', label: 'Projects', zoneName: 'Projects Galaxy' },
  { id: 'agentic', label: 'AI Lab', zoneName: 'AI Agent Lab' },
  { id: 'experience', label: 'Experience', zoneName: 'Experience Timeline' },
  { id: 'contact', label: 'Contact', zoneName: 'Contact Station' },
] as const
