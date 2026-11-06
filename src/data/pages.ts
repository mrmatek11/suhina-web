export type SitePage = 'home' | 'guide' | 'settings' | 'shortcuts'

/** Every page the site publishes: each one is a build entry, is prerendered and is listed in the sitemap. */
export const sitePages: readonly SitePage[] = ['home', 'guide', 'settings', 'shortcuts']

/** The HTML entry file of a page, relative to the project root and to `dist`. */
export function pageEntry(page: SitePage): string {
  return page === 'home' ? 'index.html' : `${page}/index.html`
}

export function resolvePage(pathname: string, base = '/'): SitePage {
  const relative = pathname.startsWith(base) ? pathname.slice(base.length) : pathname
  const path = relative.replace(/^\/+|\/+$/g, '').replace(/\/index\.html$/, '')
  if (path === 'guide' || path === 'settings' || path === 'shortcuts') return path
  return 'home'
}

export function pageUrl(page: SitePage, base = '/'): string {
  return page === 'home' ? base : `${base}${page}/`
}

export function legacyGuideUrl(pathname: string, hash: string, base = '/'): string | undefined {
  if (resolvePage(pathname, base) !== 'home') return undefined
  const chapters: Record<string, SitePage> = {
    '#settings': 'settings', '#shortcuts': 'shortcuts', '#guide': 'guide', '#first-sound': 'guide', '#workflow': 'guide',
  }
  const destination = chapters[hash]
  return destination ? pageUrl(destination, base) + (hash === '#first-sound' ? hash : '') : undefined
}
