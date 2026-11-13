<script setup lang="ts">
const base = import.meta.env.BASE_URL
const shots = ['suhina-session', 'suhina-theme-sheet', 'suhina-arrangement-dark', 'suhina-theme-blocks', 'suhina-interface-editor']
const rows = [0, 2, 4].map(start => Array.from({ length: 4 }, (_, index) => shots[(start + index) % shots.length]))
</script>

<template>
  <div class="wall" aria-hidden="true">
    <div class="plane">
      <div v-for="(row, index) in rows" :key="index" class="row">
        <img v-for="name in row" :key="name" :src="`${base}assets/product/${name}.png`" alt="" width="1280" height="800" loading="lazy">
      </div>
    </div>
  </div>
</template>

<style scoped>
.wall { height: clamp(320px, 46vw, 680px); overflow: hidden; background: #000; perspective: 1800px; }
.plane { display: grid; gap: clamp(10px, 1.4vw, 22px); width: 150%; margin-left: -25%; transform: translateY(-16%) rotateX(52deg) rotateZ(-24deg); transform-origin: 50% 50%; }
.row { display: grid; grid-template-columns: repeat(4, 1fr); gap: inherit; }
.row:nth-child(2) { translate: -9% 0; }
.row:nth-child(3) { translate: 6% 0; }
img { display: block; width: 100%; height: auto; }

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .row { animation: drift linear both; animation-timeline: view(); }
    .row:nth-child(2) { animation-direction: reverse; }
  }
}
@keyframes drift { from { transform: translateX(-5%); } to { transform: translateX(5%); } }
</style>
