import type { AgenticTopic } from '@/types/portfolio'

// Deliberately modest: the owner is actively exploring this area, not claiming production agent systems.
export const agenticTopics: readonly AgenticTopic[] = [
  {
    id: 'ai-assisted-development',
    title: 'AI-assisted development',
    description:
      'Exploring how AI assistants fit into front-end work: faster iteration, with review, tests and code quality still firmly in human hands.',
    tools: ['Claude Code'],
  },
  {
    id: 'claude-code-workflows',
    title: 'Claude Code workflows',
    description:
      'Project-level instructions, plan-first feature work and real verification before calling something done: the approach used to build this portfolio.',
    tools: ['Claude Code', 'CLAUDE.md'],
  },
  {
    id: 'agentic-engineering',
    title: 'Agentic Engineering',
    description:
      'Studying how AI agents plan, use tools and check their own work, and what that means for engineering practices like code review and testing.',
    tools: [],
  },
]
