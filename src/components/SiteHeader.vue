<script setup lang="ts">
import type { SitePage } from '../data/pages'
import ThemeToggle from './ThemeToggle.vue'
const props = defineProps<{ page: SitePage }>()
const base = import.meta.env.BASE_URL
const home = props.page === 'home'
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <div class="site-header" :class="{ home }">
    <header class="topbar">
      <nav aria-label="Main navigation">
        <a :href="`${base}#song`" class="top-link features-link">Explore</a>
        <a :href="`${base}guide/`" class="top-link" :aria-current="props.page === 'guide' ? 'page' : undefined">Guide</a>
        <a :href="`${base}settings/`" class="top-link reference-link" :aria-current="props.page === 'settings' ? 'page' : undefined">Settings</a>
        <a :href="`${base}shortcuts/`" class="top-link reference-link" :aria-current="props.page === 'shortcuts' ? 'page' : undefined">Shortcuts</a>
      </nav>
      <a class="brand" :href="base" aria-label="Suhina home"><img class="brand-logo logo-on-light" :src="`${base}assets/brand/suhina-logo.svg?v=3`" alt="Suhina" width="125" height="37"><img class="brand-logo logo-on-dark" :src="`${base}assets/brand/suhina-logo-dark.svg`" alt="Suhina" width="125" height="37"></a>
      <div class="top-tools">
        <a href="https://github.com/suhina-daw/suhina-daw" class="top-link github-link" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://discord.gg/rgwp4DDNsU" class="top-link github-link" target="_blank" rel="noreferrer">Discord</a>
        <ThemeToggle />
        <a v-if="!home" class="download" :href="`${base}#download`">Download</a>
      </div>
    </header>
  </div>
  <div v-if="home" class="subbar">
    <a class="sub-name" href="#home">Suhina</a>
    <nav aria-label="On this page">
      <a href="#song">Overview</a><a href="#themes">Themes</a><a href="#devices">Devices</a><a href="#progress">Progress</a>
    </nav>
    <div class="sub-tools"><span>Free, pre-alpha</span><a class="download" href="#download">Download</a></div>
  </div>
</template>

<style scoped>
.subbar { position: sticky; top: 0; z-index: 10; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px; height: 52px; padding: 0 var(--gutter); background: var(--paper); border-bottom: 1px solid var(--line); font-size: 14px; color: var(--olive); }
.sub-name { font-weight: 600; color: var(--ink); }
.subbar nav, .sub-tools { display: flex; align-items: center; gap: 24px; }
.sub-tools { justify-content: end; }
.subbar nav a:hover { color: var(--ink); }
@media(max-width: 720px) { .subbar { grid-template-columns: 1fr auto; } .subbar nav { display: none; } }
</style>
