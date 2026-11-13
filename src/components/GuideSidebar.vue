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
    <button class="search-trigger" id="focus-search" @click="emit('search')">Find a setting <kbd>/</kbd></button>
    <nav id="side-nav" aria-label="Guide chapters">
      <a :href="`${base}guide/`" :aria-current="page === 'guide' ? 'page' : undefined">Getting started</a>
      <a v-for="(label, key) in pages" :key="key" :href="`${base}settings/?category=${key}`"
        :class="{ active: page === 'settings' && category === key }" :aria-current="page === 'settings' && category === key ? 'true' : undefined"
        @click="page === 'settings' && ($event.preventDefault(), emit('category', key))">{{ label }}</a>
      <a :href="`${base}shortcuts/`" :aria-current="page === 'shortcuts' ? 'page' : undefined">Keyboard shortcuts</a>
    </nav>
    <a class="link" href="https://github.com/suhina-daw/suhina-daw" target="_blank" rel="noreferrer">Follow the project on GitHub</a>
  </aside>
</template>
