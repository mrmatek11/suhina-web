import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import { legacyGuideUrl, resolvePage } from './data/pages'
import type { SitePage } from './data/pages'
import { parseSettings } from './data/settings'
import { parseShortcuts } from './data/shortcuts'
import { prerenderReplaced } from './prerendered'

async function fetchJson(file: string): Promise<unknown> {
  const response = await fetch(`${import.meta.env.BASE_URL}${file}`)
  if (!response.ok) throw new Error(`${file} request failed: ${response.status}`)
  return response.json()
}

// The built page arrives prerendered with its reference already listed. Mounting replaces that
// markup, so fetch the list first: the first client render then shows the same entries instead of
// a loading state. On failure the components fetch again and show their own error and retry.
async function initialData(page: SitePage) {
  try {
    if (page === 'settings') return { initialSettings: parseSettings(await fetchJson('settings.json')) }
    if (page === 'shortcuts') return { initialShortcuts: parseShortcuts(await fetchJson('shortcuts.json')) }
  } catch (cause) {
    console.error(cause)
  }
  return {}
}

const redirect = legacyGuideUrl(window.location.pathname, window.location.hash, import.meta.env.BASE_URL)
if (redirect) window.location.replace(redirect)
else {
  const page = resolvePage(window.location.pathname, import.meta.env.BASE_URL)
  void initialData(page).then(data => {
    createApp(App, { page, ...data }).mount('#app')
    prerenderReplaced()
  })
}
