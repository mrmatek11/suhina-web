<script setup lang="ts">
import { ref } from 'vue'
const selected = ref('All sounds')
const kinds = [
  { name: 'Drums', color: '#e09a6e', x: 110, y: 155, caption: 'Short attacks. Weight and rhythm.' },
  { name: 'Hats', color: '#ffc53d', x: 250, y: 85, caption: 'Bright, sharp and airy.' },
  { name: 'Tones', color: '#b7c79d', x: 385, y: 150, caption: 'Sustained notes and pitched sounds.' },
  { name: 'Textures', color: '#8fa9b8', x: 275, y: 235, caption: 'Noise, layers and in-between sounds.' },
]
const points = kinds.flatMap(kind => Array.from({ length: 43 }, (_, i) => ({ kind: kind.name, color: kind.color,
  x: kind.x + Math.cos(i * 2.4) * (9 + Math.sqrt(i) * 10), y: kind.y + Math.sin(i * 2.4) * (8 + Math.sqrt(i) * 8), r: i % 11 === 0 ? 4.5 : 2.4 })))
</script>

<template>
  <figure class="map-study">
    <div class="map-caption"><span>Sound neighborhoods</span><span>Illustration</span></div>
    <svg viewBox="0 0 520 330" role="img" aria-label="Illustration of samples grouped in neighborhoods by sound, with differently colored clusters">
      <path d="M15 165h490M260 20v290" stroke="#333331" stroke-width=".7" stroke-dasharray="2 7"/>
      <circle v-for="(point, index) in points" :key="index" :cx="point.x" :cy="point.y" :r="point.r" :fill="point.color" :opacity="selected === 'All sounds' || selected === point.kind ? 0.9 : 0.1"/>
      <circle cx="110" cy="155" r="13" fill="none" stroke="#e09a6e" stroke-width="1"/>
    </svg>
    <div class="map-side">
      <div class="kind-controls" aria-label="Highlight an illustrated sound neighborhood"><button :aria-pressed="selected === 'All sounds'" @click="selected = 'All sounds'">All sounds</button><button v-for="kind in kinds" :key="kind.name" :aria-pressed="selected === kind.name" @click="selected = kind.name"><i :style="{ background: kind.color }" aria-hidden="true"></i>{{ kind.name }}</button></div>
      <figcaption aria-live="polite">{{ kinds.find(kind => kind.name === selected)?.caption ?? 'Similar sounds become neighbors. Follow a sound, then explore what is nearby.' }}</figcaption>
    </div>
  </figure>
</template>

<style scoped>
.map-study { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: var(--gutter); align-items: end; margin: 0; min-width: 0; }
.map-caption { grid-column: 1 / -1; display: flex; justify-content: space-between; font: 13px var(--mono); color: #8a8a85; }
svg { display: block; width: 100%; height: auto; }
circle { transition: opacity .2s; }
.map-side { display: grid; gap: 20px; }
.kind-controls { display: flex; flex-wrap: wrap; gap: 6px; }
button { display: flex; align-items: center; gap: 8px; padding: 6px 12px; border: 1px solid #333331; border-radius: 999px; background: transparent; color: #b5b5b0; font-size: 13px; }
button:hover { border-color: #ededea; color: #ededea; }
button[aria-pressed=true] { border-color: #ffc53d; color: #ededea; }
i { display: block; width: 7px; height: 7px; border-radius: 50%; }
figcaption { min-height: 52px; font-size: 18px; line-height: 1.35; color: #ededea; }
@media (max-width: 720px) { .map-study { grid-template-columns: 1fr; } }
</style>
