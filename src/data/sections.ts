import type { SectionMeta } from '@/types/portfolio'

export const sections: readonly SectionMeta[] = [
  {
    id: 'hero',
    label: 'Home',
    zoneName: 'Developer Core',
    node: { position: [0, 0, 0], color: '#6ee7d8', radius: 0.75 },
  },
  {
    id: 'about',
    label: 'About',
    zoneName: 'Developer Core',
    node: { position: [-4.2, 1.6, -2], color: '#8b9bff', radius: 0.5 },
  },
  {
    id: 'skills',
    label: 'Skills',
    zoneName: 'Vue.js Core',
    node: { position: [-1.8, -2.8, -3], color: '#5eead4', radius: 0.5 },
  },
  {
    id: 'projects',
    label: 'Projects',
    zoneName: 'Projects Galaxy',
    node: { position: [4.2, 2, -3], color: '#a5b4fc', radius: 0.5 },
  },
  {
    id: 'agentic',
    label: 'AI Lab',
    zoneName: 'AI Agent Lab',
    node: { position: [3.8, -2.4, -1], color: '#c4b5fd', radius: 0.5 },
  },
  {
    id: 'experience',
    label: 'Experience',
    zoneName: 'Experience Timeline',
    node: { position: [-5.2, -2.2, -4.5], color: '#7dd3fc', radius: 0.5 },
  },
  {
    id: 'contact',
    label: 'Contact',
    zoneName: 'Contact Station',
    node: { position: [0.8, 3.4, -5], color: '#99f6e4', radius: 0.5 },
  },
] as const

