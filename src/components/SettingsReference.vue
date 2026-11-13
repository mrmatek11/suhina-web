<script setup lang="ts">
import { computed, ref } from 'vue'
import { filterSettings, pageLabel, pageList } from '../data/settings'
import type { Category, Setting } from '../data/settings'
import SettingEntry from './SettingEntry.vue'
import { replacingPrerender } from '../prerendered'

const props = defineProps<{ settings: Setting[]; loading: boolean; error: string; category: Category }>()
const emit = defineEmits<{ category: [category: Category]; retry: [] }>()
const query = ref(typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('q')?.slice(0, 200) ?? '')
const searchInput = ref<HTMLInputElement | null>(null)
const matches = computed(() => filterSettings(props.settings, props.category, query.value))
const resultLabel = computed(() => `${matches.value.length} ${matches.value.length === 1 ? 'entry' : 'entries'} in ${props.category === 'All' ? 'all settings' : pageLabel(props.category)}`)
const categories = computed(() => pageList(props.settings))
function clearSearch() { query.value = '' }
function focusSearch() { searchInput.value?.focus({ preventScroll: true }) }
function escapeSearch() { clearSearch(); searchInput.value?.blur() }
defineExpose({ clearSearch, focusSearch })
</script>

<template>
  <section class="page-section" id="settings" :aria-busy="loading">
    <div class="section-heading"><h1 class="page-title">Meet your settings.</h1><span class="shortcut">Open in Suhina <kbd>Ctrl</kbd> + <kbd>,</kbd></span></div>
    <p class="section-intro">You don't need to learn every option. Just find the one you need.</p>
    <label class="search-box"><input ref="searchInput" v-model="query" id="settings-search" type="search" placeholder="Try “buffer”, “backups”, or “piano roll”…" aria-label="Search settings" @keydown.esc="escapeSearch"><kbd>/</kbd></label>
    <div class="filter-bar" id="filters" aria-label="Filter settings by category">
      <button :class="{ active: category === 'All' }" :aria-pressed="category === 'All'" @click="emit('category', 'All')">All settings</button>
      <button v-for="key in categories" :key="key" :class="{ active: category === key }" :aria-pressed="category === key" @click="emit('category', key)">{{ pageLabel(key) }}</button>
    </div>
    <div class="results-top"><span id="result-count" role="status" aria-live="polite">{{ loading ? 'Loading settings…' : error ? 'Settings unavailable' : resultLabel }}</span><button id="reset-filters" @click="emit('category', 'All')">Reset filters</button></div>
    <div :key="category" id="settings-results" :class="{ 'fade-in': !replacingPrerender() }">
        <div v-if="error" class="empty" role="alert">{{ error }} <button class="retry" @click="emit('retry')">Try again</button></div>
        <template v-else-if="!loading">
          <SettingEntry v-for="setting in matches" :key="setting.id" :setting="setting" />
          <div v-if="!matches.length" class="empty">No setting found. Try fewer words or choose another category.</div>
        </template>
    </div>
    <p class="source-note">A living reference, drawn from Suhina's settings table. Audio and other multi-control panels are grouped together.</p>
  </section>
</template>

