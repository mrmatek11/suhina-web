// Runs after `vite build` and `vite build --ssr src/entry-server.ts --outDir dist-ssr`: renders every
// page into its built HTML file, adds the canonical and link-preview tags, and writes sitemap.xml and
// robots.txt. Crawlers that do not run JavaScript then still read each page's text.
import { readFile, writeFile } from 'node:fs/promises'
import { pageEntry, sitePages } from '../src/data/pages.ts'
import type { SitePage } from '../src/data/pages.ts'
import { prerenderPage, robotsTxt, sitemapXml } from '../src/data/site.ts'

type Render = (page: SitePage, data: { settings: unknown; shortcuts: unknown }) => Promise<string>

const root = new URL('../', import.meta.url)
const dist = new URL('dist/', root)
const serverEntry = new URL('dist-ssr/entry-server.js', root)
const { render } = await import(serverEntry.href) as { render: Render }

async function readJson(file: string): Promise<unknown> {
  return JSON.parse(await readFile(new URL(file, dist), 'utf8'))
}

const data = { settings: await readJson('settings.json'), shortcuts: await readJson('shortcuts.json') }
for (const page of sitePages) {
  const file = new URL(pageEntry(page), dist)
  const html = await readFile(file, 'utf8')
  const markup = await render(page, data)
  await writeFile(file, prerenderPage(html, markup, page))
  console.log(`prerendered ${pageEntry(page)} (${markup.length} characters)`)
}
await writeFile(new URL('sitemap.xml', dist), sitemapXml())
await writeFile(new URL('robots.txt', dist), robotsTxt())
console.log('wrote sitemap.xml and robots.txt')
