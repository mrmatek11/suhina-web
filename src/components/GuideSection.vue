<script setup lang="ts">
defineProps<{ count: number | null }>()
const base = import.meta.env.BASE_URL
</script>

<template>
<section class="guide-section" id="guide">
  <div class="eyebrow">THE SUHINA FIELD GUIDE</div><h1>Start with a sound.</h1><p class="guide-intro">Connect your audio, learn the controls, and find the details when you need them.</p>
  <div class="guide-grid">
    <a class="guide-card" href="#first-sound"><span class="card-num">01 / GET STARTED</span><div class="card-icon">↗</div><h3>Your first sound</h3><p>Choose an output and get your audio setup ready.</p><span class="card-footer">THE ESSENTIALS <span>→</span></span></a>
    <a class="guide-card" :href="`${base}settings/`"><span class="card-num">02 / LOOK IT UP</span><div class="card-icon sliders">≡</div><h3>Settings, explained.</h3><p>What each control changes, its options, and when to use it.</p><span class="card-footer">SETTINGS REFERENCE <span>→</span></span></a>
    <a class="guide-card" :href="`${base}shortcuts/`"><span class="card-num">03 / LEARN THE KEYS</span><div class="card-icon">⌘</div><h3>Keyboard shortcuts</h3><p>Find an action, its keys, and the right context to use it.</p><span class="card-footer">SHORTCUT REFERENCE <span>→</span></span></a>
  </div>
</section>
</template>

<style scoped>
h1 { font-size: clamp(44px, 6vw, 96px); line-height: .95; letter-spacing: -.04em; margin: 16px 0 20px; }
.guide-intro { max-width: 520px; color: var(--olive); font-size: 18px; }
</style>
