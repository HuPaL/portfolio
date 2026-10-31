# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# PAVLO.EXE — Claude Code Instructions

## Commands

Node `^22.18 || >=24.12`.

- `npm run dev` / `npm run preview` — Vite dev / preview server.
- `npm run build` — runs `type-check` and `vite build` in parallel (`build-only` skips types).
- `npm run type-check` — `vue-tsc --build` over the project references (`tsconfig.app/node/vitest.json`).
- `npm run lint` — oxlint then ESLint, **both with `--fix`** (they modify files).
- `npm run format` — Prettier, `src/` only.
- `npm run test:unit` — Vitest in watch mode. One file: `npx vitest run src/__tests__/App.spec.ts`; one test: `npx vitest run -t "name"`.
- `npm run test:e2e -- --project=chromium e2e/vue.spec.ts` — Playwright; first run needs `npx playwright install`. Locally it starts `npm run dev` (:5173); with `CI` set it uses `npm run preview` (:4173), so `build` first.

## Current state vs. target

The repo is a fresh `create-vue` scaffold migrated to TypeScript: `App.vue` is still the "You did it!" placeholder, `routes: []`, `stores/counter.ts` is scaffold leftover. Three.js, TresJS, GSAP and Tailwind are **not installed yet**; the folders `components/composables/data/types/styles` do not exist yet. Treat the sections below as the target, not as existing facts. The repo is not under git.

## Tooling notes

- ESLint (`eslint.config.ts`, loaded via `jiti`) layers on oxlint: `eslint-plugin-oxlint` reads `.oxlintrc.json` and disables rules oxlint already covers.
- Alias `@` → `src` (set in both `vite.config.ts` and `tsconfig.app.json`).
- `vitest.config.ts` merges `vite.config.ts`, uses jsdom and excludes `e2e/**`. Unit tests live in `src/**/__tests__/`; Vitest lint rules apply only there.

## Project Overview

PAVLO.EXE is an interactive developer portfolio for Pavlo Hupalo.

The portfolio should demonstrate:

- Strong frontend development skills
- Vue.js expertise
- Advanced CSS knowledge
- Modern UI/UX
- Interactive web development
- Three.js experience
- AI-assisted development workflows
- Interest in Agentic Engineering

The experience should feel like an interactive digital universe rather than a traditional portfolio website.

---

## Core Philosophy

Always prioritize:

1. User experience
2. Performance
3. Accessibility
4. Maintainable architecture
5. Responsive design
6. Progressive enhancement

The website must work without WebGL.

Three.js is an enhancement, not a dependency for accessing portfolio content.

---

## Technology Stack

- Vue 3
- TypeScript
- Vite
- Three.js
- TresJS
- GSAP
- Tailwind CSS

---

## Coding Standards

### Vue

- Use Vue 3 Composition API.
- Use `<script setup lang="ts">`.
- Keep components focused and reusable.
- Move reusable logic into composables.
- Use TypeScript interfaces for data structures.
- Avoid large monolithic components.

### TypeScript

- Avoid `any`.
- Define explicit interfaces.
- Keep types reusable.

### CSS

- Prefer modern native CSS.
- Use CSS custom properties for design tokens.
- Use responsive and fluid layouts.
- Prefer CSS animations when JavaScript is unnecessary.
- Respect `prefers-reduced-motion`.

### Accessibility

Every feature must consider:

- keyboard navigation
- semantic HTML
- ARIA attributes when necessary
- focus states
- reduced motion preferences
- sufficient contrast

---

## Three.js Rules

- Do not add unnecessary heavy assets.
- Optimize geometry and materials.
- Avoid excessive draw calls.
- Reduce scene complexity on mobile.
- Use adaptive rendering when possible.
- Dispose Three.js resources correctly.

The 3D experience must have a fallback.

---

## Architecture

Organize the application into:

- components
- composables
- stores
- data
- types
- styles

Do not mix business logic, scene logic, and presentation logic unnecessarily.

---

## Feature Development Workflow

Before implementing a new feature:

1. Analyze the existing architecture.
2. Explain the implementation plan briefly.
3. Identify affected files.
4. Implement the smallest maintainable solution.
5. Check TypeScript errors.
6. Check responsive behavior.
7. Check accessibility.
8. Review performance impact.

---

## Code Review

When reviewing code, check:

- bugs
- unnecessary complexity
- duplicated code
- TypeScript issues
- Vue best practices
- accessibility
- performance
- mobile behavior

Provide actionable improvements.

---

## Design Direction

Visual style:

- Dark
- Futuristic
- Minimal
- Premium
- Subtle glassmorphism
- Soft glowing effects
- Modern typography

Avoid:

- excessive neon
- excessive animations
- distracting effects
- unnecessary 3D elements

The goal is to impress technical recruiters and developers, not overwhelm the user.

---

## Portfolio Message

The portfolio should communicate:

"Frontend Developer combining strong UI and CSS expertise with Vue.js development and modern AI-assisted workflows."

The user is also exploring Agentic Engineering and AI development workflows.

---

## Definition of Done

A feature is complete only when:

- TypeScript passes
- No obvious console errors exist
- The feature works on desktop
- The feature works on mobile
- Keyboard interaction works when applicable
- Accessibility is considered
- Performance impact is reasonable
- Code is maintainable
