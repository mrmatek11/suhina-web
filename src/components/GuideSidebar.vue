<script setup lang="ts">
import { pages } from '../data/settings'
import type { Category } from '../data/settings'
import type { SitePage } from '../data/pages'

defineProps<{ category: Category; page: SitePage }>()
const base = import.meta.env.BASE_URL
const emit = defineEmits<{ category: [category: Category]; search: [] }>()
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-label">THE FIELD GUIDE <span>01—{{ String(Object.keys(pages).length).padStart(2, '0') }}</span></div>
    <button class="search-trigger" id="focus-search" @click="emit('search')">Find something <kbd>/</kbd></button>
    <nav id="side-nav" aria-label="Guide chapters">
      <a :href="`${base}guide/`" :aria-current="page === 'guide' ? 'page' : undefined"><span>↗</span> Getting started</a>
      <a v-for="(label, key, index) in pages" :key="key" :href="`${base}settings/?category=${key}`"
        :class="{ active: page === 'settings' && category === key }" :aria-current="page === 'settings' && category === key ? 'true' : undefined"
        @click="page === 'settings' && ($event.preventDefault(), emit('category', key))">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ label }}
      </a>
      <a :href="`${base}shortcuts/`" :aria-current="page === 'shortcuts' ? 'page' : undefined"><span>↗</span> Keyboard shortcuts</a>
    </nav>
    <div class="sidebar-bottom"><span class="status-dot"></span> A work in progress.
      <p>Open source. Open possibilities.</p>
      <a href="https://github.com/suhina-daw/suhina-daw" target="_blank" rel="noreferrer">Follow the project ↗</a>
    </div>
  </aside>
</template>
