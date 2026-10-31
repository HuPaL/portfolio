import type { Project } from '@/types/portfolio'

// Public demo/repo links are not available yet; add them under `links` when they are.
export const projects: readonly Project[] = [
  {
    id: 'pavlo-exe',
    title: 'PAVLO.EXE',
    context: 'Personal project',
    summary:
      'This interactive portfolio: a polished 2D experience built first, with Three.js planned as a progressive enhancement. Built with AI-assisted workflows in Claude Code.',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Tailwind CSS', 'Pinia'],
    links: {},
    featured: true,
  },
  {
    id: 'igaming-platform',
    title: 'iGaming web applications',
    context: 'Insulalabs · 2024 – present',
    summary:
      'Leading a front-end team that delivers responsive web applications for the iGaming industry, driving development standards, code reviews and mentoring.',
    outcome: '30% reduction in bugs after introducing stronger code quality and review processes.',
    stack: ['Angular', 'JavaScript', 'HTML', 'CSS'],
    links: {},
    featured: true,
  },
  {
    id: 'wp-block-patterns',
    title: 'Reusable WordPress block patterns',
    context: 'Digital Silk · 2021 – 2024',
    summary:
      'Custom Gutenberg components and reusable block patterns for WordPress and WooCommerce sites built for international clients.',
    outcome: 'Cut development time for small WordPress projects by 50% (about 20h to 10h).',
    stack: ['WordPress', 'Gutenberg', 'WooCommerce', 'SCSS'],
    links: {},
    featured: true,
  },
  {
    id: 'softblues-site',
    title: 'Softblues company website',
    context: 'Softblues · 2019 – 2021',
    summary:
      "The company's website built with React, Gatsby.js and GraphQL, alongside a modern tooling setup (Gulp, SCSS, Pug) that improved workflow and maintainability.",
    stack: ['React', 'Gatsby.js', 'GraphQL', 'Gulp', 'SCSS', 'Pug'],
    links: {},
    featured: false,
  },
]
