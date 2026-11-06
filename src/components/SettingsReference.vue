<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { filterSettings, pages } from '../data/settings'
import type { Category, Setting } from '../data/settings'
import SettingEntry from './SettingEntry.vue'
import { replacingPrerender } from '../prerendered'

const props = defineProps<{ settings: Setting[]; loading: boolean; error: string; category: Category }>()
const emit = defineEmits<{ category: [category: Category]; retry: [] }>()
const query = ref(typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('q')?.slice(0, 200) ?? '')
const searchInput = ref<HTMLInputElement | null>(null)
const reducedMotion = useReducedMotion()
const matches = computed(() => filterSettings(props.settings, props.category, query.value))
const resultLabel = computed(() => `${String(matches.value.length).padStart(2, '0')} ENTRIES / ${props.category === 'All' ? 'ALL SETTINGS' : pages[props.category].toUpperCase()}`)
function clearSearch() { query.value = '' }
function focusSearch() { searchInput.value?.focus({ preventScroll: true }) }
function escapeSearch() { clearSearch(); searchInput.value?.blur() }
defineExpose({ clearSearch, focusSearch })
</script>

<template>
  <section class="settings-section" id="settings" :aria-busy="loading">
    <div class="section-heading"><div><div class="eyebrow">SMALL CONTROLS. BIG DIFFERENCE.</div><h1 class="reference-title">Meet your settings.</h1></div><span class="shortcut">Open in Suhina <kbd>Ctrl</kbd> + <kbd>,</kbd></span></div>
    <p class="section-intro">You don't need to learn every option. Just find the one you need.</p>
    <label class="search-box"><span aria-hidden="true">⌕</span><input ref="searchInput" v-model="query" id="settings-search" type="search" placeholder="Try “buffer”, “backups”, or “piano roll”…" aria-label="Search settings" @keydown.esc="escapeSearch"><kbd>/</kbd></label>
    <div class="filter-bar" id="filters" aria-label="Filter settings by category">
      <button :class="{ active: category === 'All' }" :aria-pressed="category === 'All'" @click="emit('category', 'All')">All settings</button>
      <button v-for="(label, key) in pages" :key="key" :class="{ active: category === key }" :aria-pressed="category === key" @click="emit('category', key)">{{ label }}</button>
    </div>
    <div class="results-top"><span id="result-count" role="status" aria-live="polite">{{ loading ? 'LOADING SETTINGS…' : error ? 'SETTINGS UNAVAILABLE' : resultLabel }}</span><button id="reset-filters" @click="emit('category', 'All')">Reset filters ↺</button></div>
    <motion.div :key="category" id="settings-results"
      :initial="{ opacity: reducedMotion || replacingPrerender() ? 1 : 0.35 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: reducedMotion ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] }">
        <div v-if="error" class="empty" role="alert">{{ error }} <button class="retry" @click="emit('retry')">Try again ↗</button></div>
        <template v-else-if="!loading">
          <SettingEntry v-for="setting in matches" :key="setting.id" :setting="setting" />
          <div v-if="!matches.length" class="empty">No setting found. Try fewer words or choose another category.</div>
        </template>
    </motion.div>
    <p class="source-note">A living reference, drawn from Suhina's settings table. Audio and other multi-control panels are grouped together.</p>
  </section>
</template>

<style scoped>
.reference-title { font-size: 34px; letter-spacing: -1.5px; font-weight: 500; line-height: 1.2; margin: 8px 0 0; }
.retry { background: transparent; border: 0; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
</style>
