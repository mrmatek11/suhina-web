<script setup lang="ts">
defineProps<{ title?: string; ruled?: boolean }>()
</script>

<template>
  <section class="chapter" :class="{ ruled }">
    <div class="chapter-title"><slot name="title"><h2>{{ title }}</h2></slot></div>
    <div class="chapter-body"><slot /></div>
    <slot name="after" />
  </section>
</template>

<style scoped>
.chapter { display: grid; grid-template-columns: var(--cols); gap: var(--gutter); padding: clamp(48px, 6vw, 96px) var(--gutter); }
.ruled { border-top: 1px solid var(--line); }
.chapter-title::before { content: ''; display: block; width: 40px; height: 3px; margin-bottom: 20px; background: var(--accent); }
.chapter-title h2 { max-width: 12ch; }
.chapter-body { padding-top: 23px; color: var(--olive); }
.chapter-body :slotted(.link) { color: var(--ink); }
@media (max-width: 720px) {
  .chapter { grid-template-columns: 1fr; gap: 20px; }
  .chapter-title h2 { max-width: none; }
  .chapter-body { padding-top: 0; }
}
</style>
