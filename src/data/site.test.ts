import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { headTags, prerenderPage, robotsTxt, shareImage, sitemapXml } from './site.ts'

const built = `<!doctype html>
<html lang="en">
<head>
  <meta name="description" content="Get started with Suhina: audio &amp; settings.">
  <title>Suhina — The guide</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>`

test('a prerendered page carries its markup and head tags built from its own title and description', () => {
  const page = prerenderPage(built, '<main><h1>Guide</h1></main>', 'guide')
  assert.match(page, /<div id="app"><main><h1>Guide<\/h1><\/main><\/div>/)
  assert.match(page, /<link rel="canonical" href="https:\/\/suhina\.org\/guide\/">/)
  assert.match(page, /<meta property="og:title" content="Suhina — The guide">/)
  assert.match(page, /<meta property="og:description" content="Get started with Suhina: audio &amp; settings\.">/)
  assert.ok(page.includes(`<meta property="og:image" content="https://suhina.org/${shareImage.path}">`))
  assert.ok(page.indexOf('og:url') < page.indexOf('</head>'))
})

test('the share image is a published PNG of the size its tags state', () => {
  const png = readFileSync(new URL(`../../public/${shareImage.path}`, import.meta.url))
  assert.deepEqual([...png.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  assert.equal(png.readUInt32BE(16), shareImage.width)
  assert.equal(png.readUInt32BE(20), shareImage.height)
})

test('rendered markup is inserted literally, without replacement patterns', () => {
  const page = prerenderPage(built, '<p>$& and $1 cost $5</p>', 'guide')
  assert.match(page, /<p>\$& and \$1 cost \$5<\/p>/)
})

test('head tag values are escaped', () => {
  assert.match(headTags('home', 'A "quoted" <title>', 'x & y'), /content="A &quot;quoted&quot; &lt;title>"/)
  assert.match(headTags('home', 't', 'x & y'), /content="x &amp; y"/)
  assert.match(headTags('home', 't', 'd'), /<link rel="canonical" href="https:\/\/suhina\.org\/">/)
})

test('a page whose shape changed fails instead of publishing without content', () => {
  assert.throws(() => prerenderPage(built.replace('<div id="app"></div>', '<div id="app">x</div>'), '', 'guide'), /empty <div id="app">/)
  assert.throws(() => prerenderPage(built.replace('<title>', '<title>a</title><title>'), '', 'guide'), /<title>/)
  assert.throws(() => prerenderPage(built.replace(/<meta name="description"[^>]*>/, ''), '', 'guide'), /meta description/)
})

test('the sitemap lists every published page and robots.txt points to it', () => {
  const sitemap = sitemapXml()
  for (const url of ['https://suhina.org/', 'https://suhina.org/guide/', 'https://suhina.org/settings/', 'https://suhina.org/shortcuts/']) {
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), url)
  }
  assert.equal(sitemap.match(/<url>/g)?.length, 4)
  assert.match(robotsTxt(), /^User-agent: \*\nAllow: \/\n\nSitemap: https:\/\/suhina\.org\/sitemap\.xml\n$/)
})
