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
- `npm run test:e2e -- --project=chromium e2e/vue.spec.ts` — Playwright (includes axe a11y and 3D explorer specs); first run needs `npx playwright install chromium`. Locally it starts `npm run dev` (:5173) and **reuses any server already on that port** (a stale one makes `page.goto` time out); with `CI=1` it uses `npm run preview` (:4173), so run `npm run build-only` first.

## Current state vs. target

Phase 1 (2D portfolio: boot screen, hero, about, skills, projects, AI lab, experience, contact) and Phase 2 (opt-in 3D explorer) are implemented. `stores/counter.ts`, `jsconfig.json` and the empty router are scaffold leftovers. GSAP is **not** installed (camera motion uses exponential lerp in the render loop). The repo is not under git.

### Architecture notes
- **Content is data.** All copy lives in typed `src/data/*.ts` (`types/portfolio.ts`); section components only render it. `data/sections.ts` also holds each section's 3D node (position, colour, radius).
- **3D explorer is progressive enhancement and opt-in.** `useExploreSupport` gates the "Explore in 3D" button (WebGL available, no `prefers-reduced-motion`, width ≥ 768px, no data-saver). `components/layout/exploreAsync.ts` loads `src/scene/ExploreView.vue` (three + TresJS, its own ~163 kB gzip chunk) only after the click. Without it the 2D page is unchanged.
- **three.js is trimmed on purpose.** TresJS runs `extend(THREE)` with the whole namespace, which kills tree-shaking. `vite.config.ts` therefore aliases the exact import `three` to `src/scene/three-lite.ts`, a barrel re-exporting only what the scene and TresJS internals need (explorer chunk 208 → 163 kB gzip). **When you use a new Tres element (e.g. `<TresTorusGeometry>`), add its class to `three-lite.ts`**; otherwise it fails at runtime with "X is not defined on the THREE namespace" (the e2e test "renders without console errors" guards this). After upgrading `three` or `@tresjs/core`, a build may report `MISSING_EXPORT`; add the named classes it lists.
- **Content is never duplicated in 3D.** A zone opens the same section component in `ZonePanel`. While exploring, the regular `<main>` is unmounted (`v-if` in `App.vue`) so section ids never collide; the canvas is `aria-hidden` and a DOM zone menu mirrors the nodes.
- **TresJS quirks.** `vite.config.ts` spreads `@tresjs/core/template-compiler-options` into the Vue plugin. Node hit-testing does **not** use Tres pointer events: the canvas is pointer-transparent and `ExploreView` raycasts via `ConstellationScene.pick()` (nodes carry `userData.zoneId`), so mouse hover/click and touch taps behave identically. (Tres's own events raycast only on pointer move, so taps picked the wrong node.)
- **Known leak (third-party).** Each enter/exit of the explorer leaves one destroyed `<canvas>`/WebGL context retained (~180 KB JS heap per cycle, measured: 20 cycles ≈ +4 MB). The retainer is a global pointer registry inside `@tresjs/core`'s event system (`@pmndrs/pointer-events`, `pointerEventspointerMap`). TresJS does call `renderer.dispose()` + `forceContextLoss()`; making the canvas pointer-transparent did not help. Reusing one canvas for the session was rejected (holds GPU memory after exit). Re-check after upgrading `@tresjs/core`.
- **No `backdrop-filter` over the canvas.** Blur over the animating WebGL canvas cost ~half the frame rate (33 vs 60 fps); explorer panels use `.glass.glass-flat` and nested `.glass` cards are un-blurred in `ZonePanel`.
- **Boot screen** page-behind uses `inert`; pass `undefined`, never `false` (Vue renders `inert="false"`, which still blocks the page).
- **Windows/PowerShell 5.1:** `Set-Content -Encoding utf8` writes a BOM; avoid it for project files.

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
