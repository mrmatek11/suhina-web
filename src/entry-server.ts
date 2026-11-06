// Build-time renderer: scripts/prerender.ts calls it once per page so that each published HTML file
// already contains the page's text for search engines and for readers without JavaScript.
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import type { SitePage } from './data/pages'
import { parseSettings } from './data/settings'
import { parseShortcuts } from './data/shortcuts'

export async function render(page: SitePage, data: { settings: unknown; shortcuts: unknown }): Promise<string> {
  const app = createSSRApp(App, {
    page,
    initialSettings: page === 'settings' ? parseSettings(data.settings) : undefined,
    initialShortcuts: page === 'shortcuts' ? parseShortcuts(data.shortcuts) : undefined,
  })
  return renderToString(app)
}
