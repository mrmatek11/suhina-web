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
  <figure class="stage switch">
    <div class="frames">
      <AppShot v-for="(view, index) in views" :key="view.file" :name="view.file" :alt="view.alt" :class="{ shown: index === current }" :aria-hidden="index !== current" />
    </div>
    <figcaption>
      <span class="stage-tabs"><button v-for="(view, index) in views" :key="view.file" type="button" :aria-pressed="index === current" @click="current = index">{{ view.name }}</button></span>
      <span>The same project in both views.</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.frames, figcaption { width: min(100%, 1280px); margin-inline: auto; }
.frames { display: grid; }
.frames > * { grid-area: 1 / 1; opacity: 0; transition: opacity .25s; }
.frames > .shown { opacity: 1; }
figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; margin-top: clamp(16px, 2vw, 28px); font-size: 14px; }
</style>
