<script setup lang="ts">
defineProps<{ number?: string; title?: string; ruled?: boolean }>()
</script>

<template>
  <section class="chapter" :class="{ ruled }">
    <div class="chapter-title" :class="{ numbered: number }">
      <span v-if="number" class="num">{{ number }}</span>
      <slot name="title"><h2>{{ title }}</h2></slot>
    </div>
    <div class="chapter-body"><slot /></div>
    <slot name="after" />
  </section>
</template>

<style scoped>
.chapter { display: grid; grid-template-columns: var(--cols); gap: var(--gutter); padding: clamp(48px, 6vw, 96px) var(--gutter); }
.ruled { border-top: 1px solid var(--line); }
.numbered { display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 12px; align-items: baseline; }
.num { font-size: 14px; color: var(--muted); }
.numbered h2 { max-width: 11ch; }
.chapter-body { color: var(--olive); }
.chapter-body :slotted(.link) { color: var(--ink); }
@media (max-width: 720px) {
  .chapter { grid-template-columns: 1fr; gap: 20px; }
  .numbered { grid-template-columns: 1fr; gap: 8px; }
  .numbered h2 { max-width: none; }
}
</style>
