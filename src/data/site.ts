// What search engines and link previews read: the prerendered page head, the sitemap and robots.txt.
// scripts/prerender.ts applies these to the build in `dist`.
import { pageUrl, sitePages } from './pages.ts'
import type { SitePage } from './pages.ts'

export const siteOrigin = 'https://suhina.org'

/** The image link previews show, relative to the site root, with its size in pixels. */
export const shareImage = {
  path: 'assets/product/suhina-arrangement.png',
  width: 1251,
  height: 492,
  alt: 'Suhina Arrangement showing audio waveforms, MIDI note clips and track controls together on the song timeline',
} as const

export function absolutePageUrl(page: SitePage, origin = siteOrigin): string {
  return `${origin}${pageUrl(page)}`
}

function attribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function decodeText(value: string): string {
  return value.replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&')
}

/** Canonical URL and link-preview tags for a page, from the title and description its HTML already has. */
export function headTags(page: SitePage, title: string, description: string, origin = siteOrigin): string {
  const url = absolutePageUrl(page, origin)
  const image = `${origin}/${shareImage.path}`
  return [
    `<link rel="canonical" href="${attribute(url)}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="Suhina">',
    `<meta property="og:title" content="${attribute(title)}">`,
    `<meta property="og:description" content="${attribute(description)}">`,
    `<meta property="og:url" content="${attribute(url)}">`,
    `<meta property="og:image" content="${attribute(image)}">`,
    `<meta property="og:image:width" content="${shareImage.width}">`,
    `<meta property="og:image:height" content="${shareImage.height}">`,
    `<meta property="og:image:alt" content="${attribute(shareImage.alt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
  ].join('\n  ')
}

function single(html: string, pattern: RegExp, what: string): RegExpMatchArray {
  const matches = [...html.matchAll(new RegExp(pattern.source, 'g'))]
  if (matches.length !== 1) throw new Error(`Expected exactly one ${what}, found ${matches.length}.`)
  return matches[0]
}

/**
 * A built page with its rendered markup inside `#app` and its head tags added. Fails rather than
 * publishing a page whose shape changed: one title, one description, one empty `#app`, one `</head>`.
 */
export function prerenderPage(html: string, appMarkup: string, page: SitePage, origin = siteOrigin): string {
  const title = decodeText(single(html, /<title>([^<]*)<\/title>/, '<title>')[1])
  const description = decodeText(single(html, /<meta name="description" content="([^"]*)">/, 'meta description')[1])
  single(html, /<\/head>/, '</head>')
  single(html, /<div id="app"><\/div>/, 'empty <div id="app">')
  return html
    .replace('</head>', () => `  ${headTags(page, title, description, origin)}\n</head>`)
    .replace('<div id="app"></div>', () => `<div id="app">${appMarkup}</div>`)
}

export function sitemapXml(origin = siteOrigin): string {
  const urls = sitePages.map(page => `  <url><loc>${attribute(absolutePageUrl(page, origin))}</loc></url>`)
  return ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join('\n')
}

export function robotsTxt(origin = siteOrigin): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
}
