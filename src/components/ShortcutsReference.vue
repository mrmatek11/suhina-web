<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { categoryList, filterShortcuts, parseShortcuts, platforms, presets } from '../data/shortcuts'
import type { Platform, Preset, Shortcut } from '../data/shortcuts'
import { replacingPrerender } from '../prerendered'

const props = defineProps<{ initialEntries?: Shortcut[] }>()
const entries = ref<Shortcut[]>(props.initialEntries ?? [])
const platform = ref<Platform>('windows')
const preset = ref<Preset>('Select-first')
const category = ref('All')
const query = ref('')
const loading = ref(!props.initialEntries)
const error = ref('')
const reducedMotion = useReducedMotion()
const matches = computed(() => filterShortcuts(entries.value, category.value, query.value, preset.value, platform.value))
const categories = computed(() => categoryList(entries.value))
let controller: AbortController | undefined
function reset() { category.value = 'All'; query.value = '' }
async function load() {
  controller?.abort()
  const request = new AbortController()
  controller = request
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}shortcuts.json`, { signal: request.signal })
    if (!response.ok) throw new Error(`Shortcut request failed: ${response.status}`)
    entries.value = parseShortcuts(await response.json())
  } catch (cause) {
    if (request.signal.aborted) return
    error.value = 'The shortcut reference is not available yet. Please try again later.'
    console.error(cause)
  } finally {
    if (!request.signal.aborted) loading.value = false
  }
}
onMounted(() => { if (!props.initialEntries) void load() })
onUnmounted(() => controller?.abort())
</script>

<template>
  <section id="shortcuts" class="shortcuts-section" :aria-busy="loading">
    <div class="section-heading"><div><div class="eyebrow">LESS REACHING. MORE MAKING.</div><h1 class="reference-title">Find your shortcuts.</h1></div><span class="chapter-mark" aria-hidden="true">⌘ / 04</span></div>
    <p class="section-intro">A key, an action, and the right moment to use it. Start with your system and the preset you use in Suhina.</p>
    <div class="shortcut-controls">
      <label>Operating system<select v-model="platform"><option v-for="(label, value) in platforms" :key="value" :value="value">{{ label }}</option></select></label>
      <label>Keymap preset<select v-model="preset"><option v-for="value in presets" :key="value">{{ value }}</option></select></label>
      <p>These are the preset defaults. Your own changes in <strong>Settings → Keys → Shortcuts</strong> take precedence.</p>
    </div>
    <label class="search-box"><span aria-hidden="true">⌕</span><input v-model="query" type="search" aria-label="Search shortcuts" placeholder="Try “duplicate”, “Ctrl+B”, or “piano roll”…" @keydown.esc="query = ''"></label>
    <div class="filter-bar" aria-label="Filter shortcuts by category">
      <button :class="{ active: category === 'All' }" :aria-pressed="category === 'All'" @click="category = 'All'">All shortcuts</button>
      <button v-for="value in categories" :key="value" :class="{ active: category === value }" :aria-pressed="category === value" @click="category = value">{{ value }}</button>
    </div>
    <div class="results-top"><span role="status" aria-live="polite">{{ loading ? 'LOADING SHORTCUTS…' : error ? 'SHORTCUTS UNAVAILABLE' : `${matches.length} ${matches.length === 1 ? 'ACTION' : 'ACTIONS'} / ${category === 'All' ? 'ALL CATEGORIES' : category.toUpperCase()}` }}</span><button @click="reset">Reset filters ↺</button></div>
    <motion.div :key="category" :initial="{ opacity: reducedMotion || replacingPrerender() ? 1 : 0.35 }" :animate="{ opacity: 1 }" :transition="{ duration: reducedMotion ? 0 : 0.5 }">
      <div v-if="error" class="empty" role="alert">{{ error }} <button class="retry" @click="load">Try again ↗</button></div>
      <template v-else-if="!loading">
        <details v-for="entry in matches" :id="`shortcut-${entry.id}`" :key="entry.id" class="shortcut-entry">
          <summary><span class="action-name">{{ entry.name }}<span class="action-category">{{ entry.category }}</span></span><span class="key-alternatives">
            <template v-for="(chord, index) in entry.bindings[preset][platform]" :key="index"><span v-if="index" class="or">or</span><span class="chord"><kbd v-for="(key, keyIndex) in chord" :key="keyIndex">{{ key }}</kbd></span></template>
            <span v-if="!entry.bindings[preset][platform].length" class="unbound">No default key</span>
          </span><span class="entry-plus" aria-hidden="true">+</span></summary>
          <div class="shortcut-body"><p>{{ entry.description }}</p><dl><dt>Where it works</dt><dd>{{ entry.context }}</dd><dt>When to use it</dt><dd>{{ entry.whenToUse }}</dd><dt>On your system</dt><dd>{{ entry.platformNotes }}</dd></dl></div>
        </details>
        <p v-if="!matches.length" class="empty">No shortcut found. Try fewer words, another preset or a different category.</p>
      </template>
    </motion.div>
    <details class="customize-notes"><summary>Make the keys your own <span aria-hidden="true">↗</span></summary><div>
      <p>Open <strong>Options → Settings → Keys → Shortcuts</strong>. Find an action, choose <strong>Change</strong> and press the keys you want. Escape cancels capture. <strong>Clear</strong> removes that action's binding; conflicting assignments are shown in red.</p>
      <p>Choosing Select-first, Draw-first or Mouse-first restores that preset's keys and piano-roll workflow settings, replacing custom bindings. <strong>Reset all</strong> returns to Select-first. Custom keeps the current workflow settings; its bindings are specific to you, so it has no default set to display here.</p>
      <p>Text fields, active value editing and open dialogs can keep the keyboard. Click the intended editor before using a shortcut. In the piano roll, the same arrows and selection keys can act on notes rather than Session slots or Arrangement clips.</p>
    </div></details>
    <p class="source-note">Default-bound actions and window actions from Suhina. Settings → Keys → Shortcuts also includes commands with no default binding that are outside this directory. Mouse gestures and importing a custom keymap are not included here.</p>
  </section>
</template>

<style scoped>
.shortcuts-section { padding: 56px var(--gutter); border-bottom: 1px solid var(--line); scroll-margin-top: 15px; }
.chapter-mark { font: 18px var(--mono); color: var(--muted); white-space: nowrap; }
.shortcut-controls { display: grid; grid-template-columns: minmax(150px, 1fr) minmax(160px, 1fr) 1.5fr; gap: 20px; align-items: end; margin: 0 0 22px; }
.shortcut-controls label { display: grid; gap: 8px; font: 12px var(--mono); color: var(--muted); }
.shortcut-controls select { width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: 4px; background: var(--raised); color: var(--ink); font-size: 15px; }
.shortcut-controls select:focus-visible { outline: 2px solid var(--orange); outline-offset: 3px; }
.shortcut-controls p { margin: 0; color: var(--muted); font-size: 14px; }
.shortcut-entry { border-top: 1px solid var(--line); }
.shortcut-entry:last-child { border-bottom: 1px solid var(--line); }
.shortcut-entry summary { display: grid; grid-template-columns: minmax(0, 1fr) minmax(120px, auto) 16px; align-items: center; gap: 22px; padding: 16px 0; cursor: pointer; list-style: none; }
.shortcut-entry summary::-webkit-details-marker { display: none; }
.shortcut-entry summary:hover .action-name { color: var(--orange); }
.action-name { font-size: 16px; font-weight: 600; }
.action-category { display: block; margin-top: 2px; font: 12px var(--mono); font-weight: 400; color: var(--muted); }
.key-alternatives { display: flex; gap: 8px; flex-wrap: wrap; justify-content: end; align-items: center; max-width: 300px; }
.chord { display: inline-flex; gap: 3px; white-space: nowrap; }
kbd { background: var(--raised); color: var(--ink); font-size: 12px; padding: 3px 7px; }
.or, .unbound { font: 12px var(--mono); color: var(--muted); }
.entry-plus { color: var(--muted); font-size: 20px; transition: transform .2s; }
.shortcut-entry[open] .entry-plus { transform: rotate(45deg); }
.shortcut-body { max-width: 700px; padding: 0 30px 24px 0; color: var(--olive); font-size: 15px; }
.shortcut-body p { margin-top: 0; }
.shortcut-body dl { display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 12px 20px; margin: 20px 0 0; }
dt { font: 12px/1.9 var(--mono); color: var(--ink); }
dd { margin: 0; }
.retry { background: none; border: 0; text-decoration: underline; color: var(--ink); }
.customize-notes { margin-top: 32px; border: 1px solid var(--line); border-radius: 4px; padding: 16px 20px; font-size: 15px; }
.customize-notes summary { cursor: pointer; font-weight: 600; }
.customize-notes summary span { float: right; }
.customize-notes p { color: var(--olive); max-width: 720px; }
@media (max-width: 1050px) { .shortcut-controls { grid-template-columns: 1fr 1fr; } .shortcut-controls p { grid-column: 1 / -1; } }
@media (max-width: 720px) { .shortcuts-section { padding: 40px var(--gutter); } .chapter-mark { font-size: 14px; } .shortcut-entry summary { grid-template-columns: minmax(0, 1fr) 16px; gap: 10px; } .key-alternatives { grid-row: 2; grid-column: 1; justify-content: start; max-width: none; } .entry-plus { grid-column: 2; grid-row: 1 / 3; } .shortcut-body { padding-right: 0; } .shortcut-body dl { grid-template-columns: 1fr; gap: 5px; } dd + dt { margin-top: 10px; } }
</style>
