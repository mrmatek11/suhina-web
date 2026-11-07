<script setup lang="ts">
import type { SitePage } from '../data/pages'
import ThemeToggle from './ThemeToggle.vue'
const props = defineProps<{ page: SitePage }>()
const base = import.meta.env.BASE_URL
</script>

<template>
  <header class="topbar">
    <a class="brand" :href="base" aria-label="Suhina home"><img class="brand-logo logo-on-light" :src="`${base}assets/brand/suhina-logo.svg?v=3`" alt="Suhina" width="125" height="37"><img class="brand-logo logo-on-dark" :src="`${base}assets/brand/suhina-logo-dark.svg`" alt="Suhina" width="125" height="37"></a>
    <nav aria-label="Main navigation">
      <a :href="`${base}#features`" class="top-link features-link">Explore</a>
      <a :href="`${base}guide/`" class="top-link" :aria-current="props.page === 'guide' ? 'page' : undefined">Guide</a>
      <a :href="`${base}settings/`" class="top-link reference-link" :aria-current="props.page === 'settings' ? 'page' : undefined">Settings</a>
      <a :href="`${base}shortcuts/`" class="top-link reference-link" :aria-current="props.page === 'shortcuts' ? 'page' : undefined">Shortcuts</a>
      <a href="https://github.com/suhina-daw/suhina-daw" class="top-link github-link" target="_blank" rel="noreferrer">GitHub ↗</a>
    </nav>
    <ThemeToggle />
    <a class="download" :href="`${base}#download`">Get Suhina <span aria-hidden="true">↓</span></a>
  </header>
</template>

<style scoped>
.topbar { gap: 40px; }
.top-link[aria-current=page] { text-decoration: underline; text-decoration-color: var(--orange); text-decoration-thickness: 3px; text-underline-offset: 5px; }
@media(max-width: 1000px) { .topbar { gap: 20px; } .topbar nav { gap: 20px; } }
@media(max-width: 720px) { .topbar { gap: 16px; } .topbar nav { gap: 14px; } .topbar nav .features-link,.topbar nav .github-link { display: none; } .topbar .brand-logo { width: 100px; height: auto; } }
@media(max-width: 480px) { .topbar { gap: 12px; } .topbar nav .reference-link { display: none; } .download { gap: 16px; } .topbar nav { margin-left: auto; } }
</style>
