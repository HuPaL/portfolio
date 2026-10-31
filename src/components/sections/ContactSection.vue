<script setup lang="ts">
import { computed } from 'vue'
import SectionShell from '@/components/layout/SectionShell.vue'
import GlassPanel from '@/components/ui/GlassPanel.vue'
import { profile } from '@/data/profile'

const linkClass =
  'underline decoration-(--color-border) underline-offset-4 hover:decoration-(--color-accent)'

const hasContacts = computed(
  () => Boolean(profile.email || profile.phone) || profile.links.length > 0,
)
// "+380 93 493 23 69" -> "+380934932369"
const phoneHref = computed(() => (profile.phone ? `tel:${profile.phone.replace(/[^\d+]/g, '')}` : ''))
</script>

<template>
  <SectionShell id="contact" title="Contact">
    <GlassPanel class="max-w-2xl">
      <p class="text-(--color-muted)">
        Want to talk about front-end, Vue.js or AI-assisted development? Get in touch.
      </p>

      <ul v-if="hasContacts" class="mt-5 space-y-2">
        <li v-if="profile.email">
          <a :href="`mailto:${profile.email}`" :class="[linkClass, 'text-(--color-accent)']">
            {{ profile.email }}
          </a>
        </li>
        <li v-if="profile.phone">
          <a :href="phoneHref" :class="linkClass">{{ profile.phone }}</a>
        </li>
        <li v-for="link in profile.links" :key="link.href">
          <a :href="link.href" target="_blank" rel="noopener" :class="linkClass">
            {{ link.label }}<span class="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      </ul>
      <p v-else class="mt-5 text-sm text-(--color-muted)">Contact details will be added soon.</p>

      <p v-if="profile.location" class="mt-5 text-sm text-(--color-muted)">
        {{ profile.location }}
      </p>
    </GlassPanel>
  </SectionShell>
</template>
