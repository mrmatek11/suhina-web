<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
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
  <section id="shortcuts" class="page-section" :aria-busy="loading">
    <h1 class="page-title">Find your shortcuts.</h1>
    <p class="section-intro">A key, an action, and the right moment to use it. Start with your system and the preset you use in Suhina.</p>
    <div class="shortcut-controls">
      <label>Operating system<select v-model="platform"><option v-for="(label, value) in platforms" :key="value" :value="value">{{ label }}</option></select></label>
      <label>Keymap preset<select v-model="preset"><option v-for="value in presets" :key="value">{{ value }}</option></select></label>
      <p>These are the preset defaults. Your own changes in <strong>Settings → Keys → Shortcuts</strong> take precedence.</p>
    </div>
    <label class="search-box"><input v-model="query" type="search" aria-label="Search shortcuts" placeholder="Try “duplicate”, “Ctrl+B”, or “piano roll”…" @keydown.esc="query = ''"></label>
    <div class="filter-bar" aria-label="Filter shortcuts by category">
      <button :class="{ active: category === 'All' }" :aria-pressed="category === 'All'" @click="category = 'All'">All shortcuts</button>
      <button v-for="value in categories" :key="value" :class="{ active: category === value }" :aria-pressed="category === value" @click="category = value">{{ value }}</button>
    </div>
    <div class="results-top"><span role="status" aria-live="polite">{{ loading ? 'Loading shortcuts…' : error ? 'Shortcuts unavailable' : `${matches.length} ${matches.length === 1 ? 'action' : 'actions'} in ${category === 'All' ? 'all categories' : category}` }}</span><button @click="reset">Reset filters</button></div>
    <div :key="category" :class="{ 'fade-in': !replacingPrerender() }">
      <div v-if="error" class="empty" role="alert">{{ error }} <button class="retry" @click="load">Try again</button></div>
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
    </div>
    <details class="customize-notes"><summary>Make the keys your own</summary><div>
      <p>Open <strong>Options → Settings → Keys → Shortcuts</strong>. Find an action, choose <strong>Change</strong> and press the keys you want. Escape cancels capture. <strong>Clear</strong> removes that action's binding; conflicting assignments are shown in red.</p>
      <p>Choosing Select-first, Draw-first or Mouse-first restores that preset's keys and piano-roll workflow settings, replacing custom bindings. <strong>Reset all</strong> returns to Select-first. Custom keeps the current workflow settings; its bindings are specific to you, so it has no default set to display here.</p>
      <p>Text fields, active value editing and open dialogs can keep the keyboard. Click the intended editor before using a shortcut. In the piano roll, the same arrows and selection keys can act on notes rather than Session slots or Arrangement clips.</p>
    </div></details>
    <p class="source-note">Default-bound actions and window actions from Suhina. Settings → Keys → Shortcuts also includes commands with no default binding that are outside this directory. Mouse gestures and importing a custom keymap are not included here.</p>
  </section>
</template>

<style scoped>
.shortcut-controls { display: grid; grid-template-columns: minmax(150px, 1fr) minmax(160px, 1fr) 2fr; gap: var(--gutter); align-items: end; margin-bottom: 28px; font-size: 14px; color: var(--muted); }
.shortcut-controls label { display: grid; gap: 6px; }
.shortcut-controls select { width: 100%; padding: 8px 0; border: 0; border-bottom: 1px solid var(--ink); border-radius: 0; background: var(--paper); font-size: 17px; }
.shortcut-controls p { margin: 0; }
.shortcut-entry summary { grid-template-columns: minmax(0, 1fr) auto 16px; }
.key-alternatives { display: flex; flex-wrap: wrap; justify-content: end; align-items: center; gap: 8px; }
.chord { display: inline-flex; gap: 3px; white-space: nowrap; }
.or, .unbound { font-size: 14px; color: var(--muted); }
.shortcut-body dl { display: grid; grid-template-columns: 9em minmax(0, 1fr); gap: 10px 20px; margin: 0; }
dt { color: var(--muted); }
dd { margin: 0; }
.customize-notes { max-width: 44em; margin-top: 36px; color: var(--olive); }
.customize-notes summary { cursor: pointer; font-weight: 600; color: var(--ink); }
.customize-notes summary + div { padding-top: 12px; }
@media (max-width: 1050px) { .shortcut-controls { grid-template-columns: 1fr 1fr; } .shortcut-controls p { grid-column: 1 / -1; } }
@media (max-width: 720px) {
  .shortcut-entry summary { grid-template-columns: minmax(0, 1fr) 16px; gap: 8px 12px; }
  .key-alternatives { grid-row: 2; grid-column: 1; justify-content: start; }
  .entry-plus { grid-column: 2; grid-row: 1 / 3; }
  .shortcut-body dl { grid-template-columns: 1fr; gap: 2px; }
  dd + dt { margin-top: 10px; }
}
</style>
