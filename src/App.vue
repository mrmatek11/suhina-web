<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { MotionConfig } from 'motion-v'
import SiteHeader from './components/SiteHeader.vue'
import GuideSidebar from './components/GuideSidebar.vue'
import ProductHome from './components/ProductHome.vue'
import GuideSection from './components/GuideSection.vue'
import FirstSound from './components/FirstSound.vue'
import SettingsReference from './components/SettingsReference.vue'
import ShortcutsReference from './components/ShortcutsReference.vue'
import SiteFooter from './components/SiteFooter.vue'
import { pages, parseSettings } from './data/settings'
import type { Category, Setting } from './data/settings'
import type { Shortcut } from './data/shortcuts'
import { pageUrl, resolvePage } from './data/pages'
import type { SitePage } from './data/pages'

// The build prerenders each page in Node (see scripts/prerender.ts), where there is no window:
// it passes the page and the reference data as props instead.
const props = defineProps<{ page?: SitePage; initialSettings?: Setting[]; initialShortcuts?: Shortcut[] }>()
const browser = typeof window !== 'undefined'
const page = props.page ?? resolvePage(browser ? window.location.pathname : '/', import.meta.env.BASE_URL)

const settings = ref<Setting[]>(props.initialSettings ?? [])
const initialCategory = browser ? new URLSearchParams(window.location.search).get('category') : null
const category = ref<Category>(initialCategory && Object.hasOwn(pages, initialCategory) ? initialCategory as Category : 'All')
const loading = ref(!props.initialSettings)
const loaded = ref(Boolean(props.initialSettings))
const error = ref('')
const reference = ref<InstanceType<typeof SettingsReference> | null>(null)
let request: AbortController | undefined

function selectCategory(value: Category) {
  category.value = value
  reference.value?.clearSearch()
  if (page === 'settings') {
    const url = new URL(window.location.href)
    url.searchParams.delete('q')
    if (value === 'All') url.searchParams.delete('category')
    else url.searchParams.set('category', value)
    window.history.replaceState(null, '', url)
  }
}
async function focusSearch() {
  if (page !== 'settings') {
    window.location.href = `${pageUrl('settings', import.meta.env.BASE_URL)}#settings-search`
    return
  }
  window.location.hash = 'settings'
  await nextTick()
  reference.value?.focusSearch()
}
function handleKey(event: KeyboardEvent) {
  const target = event.target
  if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey
    || (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)))) return
  event.preventDefault()
  void focusSearch()
}
async function loadSettings() {
  request?.abort()
  const controller = new AbortController()
  request = controller
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}settings.json`, { signal: controller.signal })
    if (!response.ok) throw new Error(`Settings request failed: ${response.status}`)
    settings.value = parseSettings(await response.json())
    loaded.value = true
  } catch (cause) {
    if (controller.signal.aborted) return
    error.value = 'Settings could not be loaded.'
    console.error(cause)
  } finally {
    if (!controller.signal.aborted) loading.value = false
  }
}
onMounted(() => {
  document.addEventListener('keydown', handleKey)
  const initialHash = window.location.hash
  // Settings render above later chapters; resolve deep links after that async layout settles.
  const ready = page === 'settings' && !loaded.value ? loadSettings() : Promise.resolve()
  void ready.then(async () => {
    await nextTick()
    if (initialHash && window.location.hash === initialHash) {
      document.getElementById(initialHash.slice(1))?.scrollIntoView()
      if (page === 'settings' && initialHash === '#settings-search') reference.value?.focusSearch()
    }
  })
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKey)
  request?.abort()
})
</script>

<template>
  <MotionConfig reduced-motion="user">
    <SiteHeader :page="page" />
    <template v-if="page === 'home'"><main class="product-page"><ProductHome /></main><SiteFooter /></template>
    <div v-else class="shell">
      <GuideSidebar :category="category" :page="page" @category="selectCategory" @search="focusSearch" />
      <main class="reference-page">
        <template v-if="page === 'guide'"><GuideSection :count="loaded ? settings.length : null" /><FirstSound /></template>
        <SettingsReference v-if="page === 'settings'" ref="reference" :settings="settings" :category="category" :loading="loading" :error="error" @category="selectCategory" @retry="loadSettings" />
        <ShortcutsReference v-if="page === 'shortcuts'" :initial-entries="initialShortcuts" />
        <SiteFooter />
      </main>
    </div>
  </MotionConfig>
</template>

<style scoped>
.product-page { max-width: none; }
.reference-page { min-height: calc(100vh - 88px); }
</style>
