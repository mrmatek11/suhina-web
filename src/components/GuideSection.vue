<script setup lang="ts">
const base = import.meta.env.BASE_URL
</script>

<template>
<section class="page-section" id="guide">
  <h1 class="page-title">Start with a sound.</h1>
  <p class="section-intro">Connect your audio, learn the controls, and find the details when you need them.</p>
  <ul class="guide-list">
    <li><a href="#first-sound"><h2>Your first sound</h2><p>Choose an output and get your audio setup ready.</p></a></li>
    <li><a :href="`${base}settings/`"><h2>Settings, explained.</h2><p>What each control changes, its options, and when to use it.</p></a></li>
    <li><a :href="`${base}shortcuts/`"><h2>Keyboard shortcuts</h2><p>Find an action, its keys, and the right context to use it.</p></a></li>
  </ul>
</section>
</template>

<style scoped>
.guide-list { margin: 0; padding: 0; list-style: none; }
.guide-list a { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: var(--gutter); align-items: baseline; padding: 20px 0; border-top: 1px solid var(--line); }
.guide-list li:last-child a { border-bottom: 1px solid var(--line); }
.guide-list a:hover h2 { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 6px; }
.guide-list p { margin: 0; color: var(--olive); }
@media (max-width: 720px) { .guide-list a { grid-template-columns: 1fr; gap: 6px; } }
</style>
