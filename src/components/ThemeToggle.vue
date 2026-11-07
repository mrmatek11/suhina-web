<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// The site follows the system's light or dark setting. Choosing the other theme here stores it
// (read before the first paint by the script in each page's <head>); choosing the system's own
// theme again forgets the choice, so the site follows the system once more.
const key = 'suhina-theme'
const dark = ref(false)
let system: MediaQueryList | undefined

function systemDark(): boolean {
  return system?.matches ?? false
}
function shownDark(): boolean {
  const chosen = document.documentElement.dataset.theme
  return chosen ? chosen === 'dark' : systemDark()
}
function follow() {
  dark.value = shownDark()
}
function toggle() {
  const next = !shownDark()
  const root = document.documentElement
  try {
    if (next === systemDark()) {
      delete root.dataset.theme
      localStorage.removeItem(key)
    } else {
      root.dataset.theme = next ? 'dark' : 'light'
      localStorage.setItem(key, root.dataset.theme)
    }
  } catch {
    root.dataset.theme = next ? 'dark' : 'light'
  }
  dark.value = next
}
onMounted(() => {
  system = window.matchMedia('(prefers-color-scheme: dark)')
  system.addEventListener('change', follow)
  follow()
})
onUnmounted(() => system?.removeEventListener('change', follow))
</script>

<template>
  <button class="theme-toggle" type="button" :aria-pressed="dark" :title="dark ? 'Use the light theme' : 'Use the dark theme'" @click="toggle">
    <span class="sr-only">Dark theme</span>
    <svg v-if="dark" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>
    <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>
  </button>
</template>

<style scoped>
.theme-toggle { display: inline-grid; place-items: center; width: 34px; height: 34px; padding: 0; border: 1px solid var(--line); border-radius: 50%; background: transparent; color: var(--ink); cursor: pointer; }
.theme-toggle:hover { border-color: var(--ink); }
.theme-toggle:focus-visible { outline: 2px solid var(--orange); outline-offset: 2px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
</style>
