<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const base = `${import.meta.env.BASE_URL}assets/product/`
const clips = [
  { name: 'Piano roll', file: 'clip-piano-roll', caption: 'A MIDI clip in the piano roll, while it plays.' },
  { name: 'Automation', file: 'clip-automation', caption: 'Automation lanes for a plug-in and the mixer, duplicated along the song.' },
  { name: 'Audio', file: 'clip-audio', caption: 'A gain envelope drawn on an audio clip.' },
]
const current = ref(0)
const playing = ref(false)
const progress = ref(0)
const video = ref<HTMLVideoElement | null>(null)
const frame = ref<HTMLElement | null>(null)
let wanted = false
let visible = false
let observer: IntersectionObserver | undefined

function run() {
  if (!video.value) return
  if (wanted && visible) void video.value.play().catch(() => {})
  else video.value.pause()
}
function toggle() {
  wanted = !playing.value
  run()
}
async function show(index: number) {
  current.value = index
  progress.value = 0
  await nextTick()
  video.value?.load()
  run()
}
function tick() {
  const clip = video.value
  progress.value = clip?.duration ? clip.currentTime / clip.duration : 0
}
onMounted(() => {
  wanted = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; run() }, { threshold: 0.35 })
  if (frame.value) observer.observe(frame.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <figure class="reel">
    <div ref="frame" class="frame">
      <video ref="video" :poster="`${base}${clips[current].file}.webp`" width="960" height="368" muted loop playsinline preload="none" disablepictureinpicture
        :aria-label="clips[current].caption" @click="toggle" @play="playing = true" @pause="playing = false" @timeupdate="tick">
        <source :src="`${base}${clips[current].file}.mp4`" type="video/mp4">
      </video>
      <div class="progress" :style="{ transform: `scaleX(${progress})` }"></div>
    </div>
    <figcaption>
      <span class="names"><button v-for="(clip, index) in clips" :key="clip.file" type="button" :aria-pressed="index === current" @click="show(index)">{{ clip.name }}</button></span>
      <span class="caption" aria-live="polite">{{ clips[current].caption }}</span>
      <button type="button" class="play" @click="toggle">{{ playing ? 'Pause' : 'Play' }}</button>
    </figcaption>
  </figure>
</template>

<style scoped>
.reel { margin: 0; padding: clamp(20px, 4vw, 64px) var(--gutter) clamp(20px, 3vw, 40px); background: #000; color: #8a8a85; }
.frame, figcaption { width: min(100%, 1120px); margin-inline: auto; }
.frame { position: relative; aspect-ratio: 960 / 368; overflow: hidden; border: 1px solid #262626; background: #111; }
video { display: block; width: 100%; height: 100%; object-fit: cover; cursor: pointer; }
.progress { position: absolute; inset: auto 0 0; height: 2px; background: var(--accent); transform-origin: left; }
figcaption { display: grid; grid-template-columns: auto 1fr auto; align-items: baseline; gap: 8px 32px; margin-top: clamp(14px, 1.6vw, 22px); font-size: 14px; }
.names { display: flex; gap: 24px; }
button { padding: 6px 0; border: 0; background: transparent; color: inherit; }
button:hover { color: #ededea; }
.names button[aria-pressed=true] { color: #ededea; text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 2px; text-underline-offset: 6px; }
.play { min-width: 3.2em; color: #ededea; text-align: right; }
@media (max-width: 720px) {
  figcaption { grid-template-columns: 1fr auto; }
  .caption { grid-column: 1 / -1; grid-row: 2; }
}
</style>
