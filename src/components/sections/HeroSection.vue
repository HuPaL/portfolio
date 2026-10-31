<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <section
    id="hero"
    aria-labelledby="hero-heading"
    class="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6"
  >
    <p class="font-mono text-sm text-(--color-accent)">&gt; hello, world</p>
    <h1
      id="hero-heading"
      class="mt-4 text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] font-semibold tracking-tight"
    >
      {{ profile.name }}
    </h1>
    <p class="mt-3 text-xl text-(--color-accent-2) sm:text-2xl">{{ profile.role }}</p>
    <p class="mt-6 max-w-2xl text-(--color-muted)">{{ profile.tagline }}</p>

    <div class="mt-10 flex flex-wrap gap-3">
      <a
        href="#projects"
        class="rounded-lg bg-(--color-accent) px-5 py-2.5 font-medium text-(--color-bg) transition-shadow hover:shadow-(--shadow-glow)"
      >
        View projects
      </a>
      <a
        href="#contact"
        class="rounded-lg border border-(--color-border) px-5 py-2.5 font-medium transition-colors hover:border-(--color-accent)"
      >
        Get in touch
      </a>
    </div>
  </section>
</template>
