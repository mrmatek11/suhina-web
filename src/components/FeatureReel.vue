<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const base = `${import.meta.env.BASE_URL}assets/product/`
const clips = [
  { name: 'Piano roll', file: 'clip-piano-roll', width: 960, height: 640, caption: 'A MIDI clip and its notes in the piano roll, while it plays.' },
  { name: 'Automation', file: 'clip-automation', width: 1280, height: 488, caption: 'Automation lanes for a plug-in and the mixer, duplicated along the song.' },
  { name: 'Audio', file: 'clip-audio', width: 960, height: 500, caption: 'A gain envelope drawn on an audio clip.' },
]
const current = ref(0)
const video = ref<HTMLVideoElement | null>(null)
const frame = ref<HTMLElement | null>(null)
const still = ref(false)
let visible = false
let observer: IntersectionObserver | undefined

function run() {
  if (still.value || !video.value) return
  if (visible) void video.value.play().catch(() => {})
  else video.value.pause()
}
async function show(index: number) {
  current.value = index
  await nextTick()
  video.value?.load()
  run()
}
onMounted(() => {
  still.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; run() }, { threshold: 0.35 })
  if (frame.value) observer.observe(frame.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <figure class="reel">
    <div ref="frame" class="frame">
      <video ref="video" :poster="`${base}${clips[current].file}.webp`" :width="clips[current].width" :height="clips[current].height"
        muted loop playsinline preload="none" :controls="still" :aria-label="clips[current].caption">
        <source :src="`${base}${clips[current].file}.mp4`" type="video/mp4">
      </video>
    </div>
    <figcaption>
      <span class="names"><button v-for="(clip, index) in clips" :key="clip.file" type="button" :aria-pressed="index === current" @click="show(index)">{{ clip.name }}</button></span>
      <span aria-live="polite">{{ clips[current].caption }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.reel { margin: 0; padding: clamp(20px, 4vw, 64px) var(--gutter) clamp(20px, 3vw, 40px); background: #000; color: #8a8a85; }
.frame, figcaption { width: min(100%, 1280px); margin-inline: auto; }
.frame { display: grid; place-items: center; aspect-ratio: 16 / 9; }
video { display: block; max-width: 100%; max-height: 100%; width: auto; height: auto; }
figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; margin-top: clamp(16px, 2vw, 28px); font-size: 14px; }
.names { display: flex; gap: 24px; }
button { padding: 6px 0; border: 0; background: transparent; color: inherit; }
button:hover { color: #ededea; }
button[aria-pressed=true] { color: #ededea; text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 2px; text-underline-offset: 6px; }
</style>
