<script setup lang="ts">
import type { SitePage } from '../data/pages'
import ThemeToggle from './ThemeToggle.vue'
const props = defineProps<{ page: SitePage }>()
const base = import.meta.env.BASE_URL
const home = props.page === 'home'
</script>

<template>
  <div class="site-header" :class="{ home }">
    <header class="topbar">
      <nav aria-label="Main navigation">
        <a :href="`${base}#features`" class="top-link features-link">Explore</a>
        <a :href="`${base}guide/`" class="top-link" :aria-current="props.page === 'guide' ? 'page' : undefined">Guide</a>
        <a :href="`${base}settings/`" class="top-link reference-link" :aria-current="props.page === 'settings' ? 'page' : undefined">Settings</a>
        <a :href="`${base}shortcuts/`" class="top-link reference-link" :aria-current="props.page === 'shortcuts' ? 'page' : undefined">Shortcuts</a>
      </nav>
      <a class="brand" :href="base" aria-label="Suhina home"><img class="brand-logo logo-on-light" :src="`${base}assets/brand/suhina-logo.svg?v=3`" alt="Suhina" width="125" height="37"><img class="brand-logo logo-on-dark" :src="`${base}assets/brand/suhina-logo-dark.svg`" alt="Suhina" width="125" height="37"></a>
      <div class="top-tools">
        <a href="https://github.com/suhina-daw/suhina-daw" class="top-link github-link" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="https://discord.gg/rgwp4DDNsU" class="top-link github-link" target="_blank" rel="noreferrer">Discord ↗</a>
        <ThemeToggle />
        <a v-if="!home" class="download" :href="`${base}#download`">Get Suhina <span aria-hidden="true">↓</span></a>
      </div>
    </header>
  </div>
  <!-- The product bar stays in view on the home page while the main bar scrolls away. -->
  <div v-if="home" class="subbar">
    <a class="sub-name" href="#home">Suhina <span>Pre-alpha</span></a>
    <nav aria-label="On this page">
      <a href="#features">Agents</a><a href="#sample-map">Sample map</a><a href="#song">Session &amp; Arrangement</a><a href="#plug-ins">Plug-ins</a><a href="#import">Import</a>
    </nav>
    <span class="sub-price">Free</span>
    <a class="download" href="#download">Download <span aria-hidden="true">↓</span></a>
  </div>
</template>

<style scoped>
.topbar { display: grid; grid-template-columns: 1fr auto 1fr; }
.topbar nav { margin-left: 0; }
.top-tools { display: flex; align-items: center; justify-content: end; gap: 22px; }
.subbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 24px; height: 52px; padding: 0 var(--gutter); background: var(--paper); border-bottom: 1px solid var(--line); font-size: 14px; }
.sub-name { font-weight: 600; }
.sub-name span { margin-left: 8px; font: 12px var(--mono); color: var(--muted); }
.subbar nav { display: flex; gap: 22px; margin: 0 auto; color: var(--olive); }
.subbar nav a:hover { color: var(--ink); }
.sub-price { color: var(--olive); }
.subbar .download { padding: 5px 12px; font-size: 12px; background: var(--ink); color: var(--paper); }
.subbar .download:hover { background: var(--orange); border-color: var(--orange); color: var(--on-orange); }
@media(max-width: 900px) { .subbar nav { display: none; } .sub-price { margin-left: auto; } }
@media(max-width: 720px) {
  .topbar { display: flex; gap: 14px; }
  .topbar .brand { order: -1; }
  .topbar nav { gap: 14px; margin-left: auto; }
  .top-tools { gap: 12px; }
  .topbar nav .features-link, .top-tools .github-link { display: none; }
}
@media(max-width: 480px) { .topbar nav .reference-link { display: none; } }
</style>
