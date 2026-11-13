<script setup lang="ts">
import { ref } from 'vue'

const base = import.meta.env.BASE_URL
const slides = [
  { file: 'suhina-arrangement-dark', title: 'Dark', alt: 'Suhina Arrangement in a dark theme, with orange, yellow and blue MIDI clips beside track headers' },
  { file: 'suhina-theme-sheet', title: 'Suhina Sheet', alt: 'Suhina Session in the green and white Suhina Sheet theme' },
  { file: 'suhina-theme-blocks', title: 'Suhina Blocks', alt: 'Suhina Session in the brown, pixel-textured Suhina Blocks theme' },
  { file: 'suhina-interface-editor', title: 'Editing the interface', alt: 'Suhina with the Edit interface panel open and every movable element outlined on a snap grid' },
]
const track = ref<HTMLElement | null>(null)
const current = ref(0)

/** How far each slide is from where it rests when shown: the row's left edge plus its padding. */
function offsets(row: HTMLElement): number[] {
  const rest = row.getBoundingClientRect().left + (parseFloat(getComputedStyle(row).paddingLeft) || 0)
  return Array.from(row.children, slide => slide.getBoundingClientRect().left - rest)
}
function show(index: number) {
  const row = track.value
  if (!row) return
  // Scrolls the row itself, so the page never moves.
  row.scrollTo({ left: row.scrollLeft + offsets(row)[Math.max(0, Math.min(slides.length - 1, index))] })
}
/** The slide nearest its resting place, so the names follow a swipe or a drag as well as the buttons. */
function follow() {
  const row = track.value
  if (!row) return
  const distances = offsets(row).map(Math.abs)
  current.value = distances.indexOf(Math.min(...distances))
}
</script>

<template>
  <section class="gallery" aria-label="Suhina themes">
    <div ref="track" class="track" tabindex="0" @scroll.passive="follow" @keydown.left.prevent="show(current - 1)" @keydown.right.prevent="show(current + 1)">
      <figure v-for="(slide, index) in slides" :key="slide.file" :class="{ away: index !== current }" @click="show(index)">
        <img :src="`${base}assets/product/${slide.file}.png`" :alt="slide.alt" width="1280" height="800" loading="lazy">
        <figcaption class="sr-only">{{ slide.title }}</figcaption>
      </figure>
    </div>
    <div class="controls">
      <div class="names"><button v-for="(slide, index) in slides" :key="slide.file" type="button" :aria-pressed="index === current" @click="show(index)">{{ slide.title }}</button></div>
      <div class="steps">
        <span aria-live="polite">{{ current + 1 }} / {{ slides.length }}</span>
        <button type="button" aria-label="Previous theme" :disabled="current === 0" @click="show(current - 1)"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 12H4m6-7-7 7 7 7"/></svg></button>
        <button type="button" aria-label="Next theme" :disabled="current === slides.length - 1" @click="show(current + 1)"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-6-7 7 7-7 7"/></svg></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery { padding: clamp(20px, 4vw, 64px) 0 clamp(20px, 3vw, 40px); background: #000; color: #ededea; }
.track { display: flex; gap: clamp(12px, 1.6vw, 24px); padding-inline: var(--gutter); overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: var(--gutter); scroll-behavior: smooth; scrollbar-width: none; }
.track::-webkit-scrollbar { display: none; }
.track:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
figure { flex: 0 0 min(84%, 1100px); margin: 0; scroll-snap-align: start; transition: opacity .3s; }
figure.away { opacity: .35; cursor: pointer; }
/* The last slide can reach the left edge only if there is room to scroll past it. */
figure:last-child { margin-right: max(0px, 100% - min(84%, 1100px)); }
img { display: block; width: 100%; height: auto; }
.controls { display: flex; justify-content: space-between; align-items: center; gap: 24px; margin-top: clamp(16px, 2vw, 28px); padding-inline: var(--gutter); font-size: 14px; }
.names { display: flex; flex-wrap: wrap; gap: 4px 24px; }
button { padding: 2px 0; border: 0; background: transparent; color: #8a8a85; }
button:hover:not(:disabled) { color: #ededea; }
.names button[aria-pressed=true] { color: #ededea; text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 2px; text-underline-offset: 6px; }
.steps { display: flex; align-items: center; gap: 16px; color: #8a8a85; white-space: nowrap; font-variant-numeric: tabular-nums; }
.steps button { display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid #333; color: #ededea; }
.steps button:hover:not(:disabled) { border-color: #ededea; }
.steps button:disabled { color: #555; cursor: default; }
@media (max-width: 720px) { .names { display: none; } .controls { justify-content: end; } }
@media (prefers-reduced-motion: reduce) { .track { scroll-behavior: auto; } }
</style>
