<script setup lang="ts">
import { ref } from 'vue'
import AppShot from './AppShot.vue'

const views = [
  { name: 'Session', file: 'suhina-session', alt: 'Suhina Session view: a grid of colored clips for drums, bass, keys and vocals above a mixer with faders and level meters' },
  { name: 'Arrangement', file: 'suhina-arrangement-dark', alt: 'Suhina Arrangement view of the same project: the clips laid out along a timeline beside the track headers' },
]
const current = ref(0)
</script>

<template>
  <figure class="switch">
    <div class="frames">
      <AppShot v-for="(view, index) in views" :key="view.file" :name="view.file" :alt="view.alt" :class="{ shown: index === current }" :aria-hidden="index !== current" />
    </div>
    <figcaption>
      <span class="names"><button v-for="(view, index) in views" :key="view.file" type="button" :aria-pressed="index === current" @click="current = index">{{ view.name }}</button></span>
      <span>The same project in both views.</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.switch { margin: 0; padding: clamp(20px, 4vw, 64px) var(--gutter) clamp(20px, 3vw, 40px); background: #000; color: #8a8a85; }
.frames, figcaption { width: min(100%, 1280px); margin-inline: auto; }
.frames { display: grid; }
.frames > * { grid-area: 1 / 1; opacity: 0; transition: opacity .25s; }
.frames > .shown { opacity: 1; }
figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; margin-top: clamp(16px, 2vw, 28px); font-size: 14px; }
.names { display: flex; gap: 24px; }
button { padding: 6px 0; border: 0; background: transparent; color: inherit; }
button:hover { color: #ededea; }
button[aria-pressed=true] { color: #ededea; text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 2px; text-underline-offset: 6px; }
</style>
