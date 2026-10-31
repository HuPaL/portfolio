import type { Component } from 'vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import AgenticSection from '@/components/sections/AgenticSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import type { SectionId } from '@/types/portfolio'

/** The same DOM section components the regular page uses: content is never duplicated in 3D. */
export const zoneComponents: Record<SectionId, Component> = {
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  agentic: AgenticSection,
  experience: ExperienceSection,
  contact: ContactSection,
}
