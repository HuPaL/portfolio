import type { SkillGroup } from '@/types/portfolio'

export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'front-end',
    label: 'Front-End',
    skills: [
      { name: 'JavaScript' },
      { name: 'Vue.js' },
      { name: 'React' },
      { name: 'Angular' },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'SCSS' },
    ],
  },
  {
    id: 'web-ecommerce',
    label: 'Web & eCommerce',
    skills: [
      { name: 'WordPress' },
      { name: 'WooCommerce' },
      { name: 'Shopify' },
      { name: 'Gutenberg' },
      { name: 'Custom Themes' },
      { name: 'Custom Plugins' },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    skills: [
      { name: 'Responsive Web Development' },
      { name: 'Mobile-First Development' },
      { name: 'Cross-Browser Compatibility' },
      { name: 'Front-End Architecture' },
      { name: 'Code Review' },
    ],
  },
  {
    id: 'leadership',
    label: 'Leadership',
    skills: [
      { name: 'Team Leadership' },
      { name: 'Mentoring' },
      { name: 'Agile/Scrum' },
      { name: 'Technical Guidance' },
      { name: 'Collaboration' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Modern Development',
    skills: [
      { name: 'AI-Assisted Development' },
      { name: 'Claude Code' },
      { name: 'Agentic Engineering' },
    ],
  },
]
