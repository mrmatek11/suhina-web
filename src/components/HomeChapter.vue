<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ title?: string; ruled?: boolean }>()
const sentences = computed(() => {
  const end = props.title?.indexOf('. ') ?? -1
  return end < 0 ? [props.title ?? ''] : [props.title!.slice(0, end + 1), props.title!.slice(end + 2)]
})
</script>

<template>
  <section class="chapter" :class="{ ruled }">
    <div class="chapter-title"><slot name="title"><h2>{{ sentences[0] }}<template v-if="sentences[1]">{{ ' ' }}<span>{{ sentences[1] }}</span></template></h2></slot></div>
    <div class="chapter-body"><slot /></div>
    <slot name="after" />
  </section>
</template>

<style scoped>
.chapter { display: grid; grid-template-columns: var(--cols); gap: var(--gutter); padding: clamp(48px, 6vw, 96px) var(--gutter); }
.ruled { border-top: 1px solid var(--line); }
.chapter-title h2 { max-width: 12ch; }
.chapter-title h2 span { color: var(--muted); }
.chapter-body { color: var(--olive); }
.chapter-body :slotted(.link) { color: var(--ink); }
@media (max-width: 720px) {
  .chapter { grid-template-columns: 1fr; gap: 20px; }
  .chapter-title h2 { max-width: none; }
}
</style>
