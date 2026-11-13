<script setup lang="ts">
import { ref } from 'vue'
const selected = ref('All sounds')
const kinds = [
  { name: 'Drums', color: '#e09a6e', x: 110, y: 155, caption: 'Short attacks. Weight and rhythm.' },
  { name: 'Hats', color: '#e6c15a', x: 250, y: 85, caption: 'Bright, sharp and airy.' },
  { name: 'Tones', color: '#b7c79d', x: 385, y: 150, caption: 'Sustained notes and pitched sounds.' },
  { name: 'Textures', color: '#8fa9b8', x: 275, y: 235, caption: 'Noise, layers and in-between sounds.' },
]
const points = kinds.flatMap(kind => Array.from({ length: 43 }, (_, i) => ({ kind: kind.name, color: kind.color,
  x: kind.x + Math.cos(i * 2.4) * (9 + Math.sqrt(i) * 10), y: kind.y + Math.sin(i * 2.4) * (8 + Math.sqrt(i) * 8), r: i % 11 === 0 ? 4.5 : 2.4 })))
</script>

<template>
  <figure class="map-study">
    <svg viewBox="0 0 520 330" role="img" aria-label="Illustration of samples grouped in neighborhoods by sound, with differently colored clusters">
      <circle v-for="(point, index) in points" :key="index" :cx="point.x" :cy="point.y" :r="point.r" :fill="point.color" :opacity="selected === 'All sounds' || selected === point.kind ? 0.9 : 0.1"/>
    </svg>
    <div class="map-side">
      <div class="stage-tabs" aria-label="Highlight an illustrated sound neighborhood"><button :aria-pressed="selected === 'All sounds'" @click="selected = 'All sounds'">All sounds</button><button v-for="kind in kinds" :key="kind.name" :aria-pressed="selected === kind.name" @click="selected = kind.name">{{ kind.name }}</button></div>
      <figcaption aria-live="polite">{{ kinds.find(kind => kind.name === selected)?.caption ?? 'Similar sounds become neighbors. Follow a sound, then explore what is nearby.' }}</figcaption>
    </div>
  </figure>
</template>

<style scoped>
.map-study { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: var(--gutter); align-items: end; margin: 0; }
svg { display: block; width: 100%; height: auto; }
circle { transition: opacity .2s; }
figcaption { min-height: 3em; margin-top: 16px; font-size: 17px; color: #ededea; }
@media (max-width: 720px) { .map-study { grid-template-columns: 1fr; } }
</style>
