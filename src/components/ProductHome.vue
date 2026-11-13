<script setup lang="ts">
import { motion, useReducedMotion } from 'motion-v'
import SampleMapStudy from './SampleMapStudy.vue'
import { replacingPrerender } from '../prerendered'
const base = import.meta.env.BASE_URL
const reducedMotion = useReducedMotion()
const still = replacingPrerender()
const repository = 'https://github.com/suhina-daw/suhina-daw'
const downloads = [
  { name: 'Windows', detail: 'x64 · ZIP', file: 'suhina-nightly-windows-x86_64.zip' },
  { name: 'macOS', detail: 'Universal · TAR.GZ', file: 'suhina-nightly-macos-universal.tar.gz' },
  { name: 'Linux', detail: 'x86_64 · TAR.GZ', file: 'suhina-nightly-linux-x86_64.tar.gz' },
]
</script>

<template>
  <div class="product-home">
    <motion.section id="home" class="hero" :initial="{ opacity: reducedMotion || still ? 1 : 0 }" :animate="{ opacity: 1 }" :transition="{ duration: reducedMotion || still ? 0 : .5 }">
      <div class="hero-top">
        <h1>Make music<br>in the open.</h1>
        <div class="hero-side">
          <p class="hero-status"><span class="live-dot"></span>Free &amp; open source <span class="stage-tag">Pre-alpha</span></p>
          <p class="hero-description">A free music workstation for Windows, macOS and Linux. Explore samples by sound, build songs with clips and a timeline, and invite an AI agent into your project.</p>
          <div class="hero-actions"><a class="primary-action" href="#download">Try the pre-alpha <span aria-hidden="true">↓</span></a><a class="text-action" :href="`${base}guide/`">Read the guide <span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
      <figure class="stage hero-media">
        <a class="product-capture" :href="`${base}assets/product/suhina-arrangement.png`" target="_blank" rel="noreferrer" aria-label="View the Suhina Arrangement screenshot at full size"><img :src="`${base}assets/product/suhina-arrangement.png`" alt="Suhina Arrangement showing audio waveforms, MIDI note clips and track controls together on the song timeline" width="1251" height="492" fetchpriority="high"></a>
        <figcaption><span>Arrangement. Audio and MIDI, arranged together.</span><a :href="`${base}assets/product/suhina-arrangement.png`" target="_blank" rel="noreferrer">View full size ↗</a></figcaption>
      </figure>
    </motion.section>

    <section id="features" class="chapter">
      <div class="chapter-title"><span class="num">/ 01</span><h2>Let an agent work with you.</h2></div>
      <div class="chapter-body"><p>Your AI agent can inspect and edit the project open in Suhina. See the changes in the same window, hear them in your song, and use the same undo history.</p><p>You choose when to let an agent in. Enable access, approve the connection, and disconnect it from Suhina when you're done.</p><a class="text-action" :href="`${base}settings/?q=agents`">Explore agent access <span aria-hidden="true">↗</span></a><p class="note">Requires an external agent that supports MCP, the connection standard Suhina uses. Agent access is off until you enable it.</p></div>
    </section>
    <div class="stage agent-study">
      <p class="stage-label">An example request</p>
      <blockquote>“Make some room for the bass.”</blockquote>
      <ol class="agent-flow"><li><span>01</span><b>Read the project</b><small>Tracks, clips, notes.</small></li><li><span>02</span><b>Make an edit</b><small>Visible in your open song.</small></li><li><span>03</span><b>Keep or undo</b><small>Your project's edit history.</small></li></ol>
    </div>

    <section class="chapter">
      <div class="chapter-title"><span class="num">/ 02</span><h2>You know the sound. Maybe not its name.</h2></div>
      <div class="chapter-body"><p>The sample map groups your samples by how they sound. Similar sounds become neighbors, so one good find can lead you to the next.</p><p>Explore a cloud or a grid, preview samples as you move through the map, and bring a sound into your project.</p><a class="text-action" :href="`${base}settings/?category=Browser&q=sample+map`">Explore sample map settings <span aria-hidden="true">↗</span></a><p class="note">The illustration shows the idea. In Suhina, the map is built from samples in your library.</p></div>
    </section>
    <div class="stage"><SampleMapStudy /></div>

    <section class="chapter">
      <div class="chapter-title"><span class="num">/ 03</span><h2>Start with a loop. Decide where it goes.</h2></div>
      <div class="chapter-body"><p>Launch clips and scenes in Session. Shape audio and MIDI on the Arrangement timeline. Both are part of the same project.</p><p>A short idea can become a song without leaving the workstation.</p><a class="text-action" :href="`${base}shortcuts/`">Find the keys for it <span aria-hidden="true">↗</span></a></div>
    </section>
    <div class="stage song-strip" aria-hidden="true"><span>An idea</span><div class="song-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>A song</span></div>

    <section class="chapter">
      <div class="chapter-title"><span class="num">/ 04</span><h2>Bring your plug-ins along.</h2></div>
      <div class="chapter-body"><p>Use CLAP and VST3 instruments and effects in a separate plug-in host. Supported plug-ins receive the song's tempo and playback position.</p><div class="format-tags"><span>CLAP</span><span>VST3</span><span class="experimental-tag">ARA · experimental</span></div><p class="note">Experimental ARA support lets compatible editors work with Arrangement audio clips. Compatibility and the wider ARA workflow are still being developed.</p></div>
    </section>

    <section class="chapter">
      <div class="chapter-title"><span class="num">/ 05</span><h2>A new place for an old project.</h2></div>
      <div class="chapter-body"><p>Open existing .als projects, bring in audio and MIDI, and save your work in Suhina's own project format.</p><div class="file-path" aria-label="Import existing projects and save as Suhina projects"><span>.als</span><span aria-hidden="true">→</span><span>.suhina</span></div><p class="note">Project import is evolving. Not every imported device or feature is reproduced; try your material and tell us what needs work.</p></div>
    </section>

    <section id="download" class="chapter download-chapter">
      <div class="chapter-title"><span class="num">/ 06</span><h2>Early days. Real things to try.</h2></div>
      <div class="chapter-body"><p>Open projects. Launch clips. Edit audio and MIDI. Explore the sample map. Work with plug-ins and connect an agent.</p><p class="note">Expect unfinished workflows, changing behavior and bugs. Start with copies of your projects. These are nightly development builds, not a stable release.</p><a class="text-action" :href="`${repository}/blob/main/ROADMAP.md`" target="_blank" rel="noreferrer">What works &amp; what's next <span aria-hidden="true">↗</span></a></div>
      <div class="download-options">
        <a v-for="download in downloads" :key="download.name" class="platform-download" :href="`${repository}/releases/download/nightly/${download.file}`"><b>{{ download.name }}</b><small>{{ download.detail }}</small><span aria-hidden="true">↓</span></a>
        <div class="download-notes"><p>Unpack the archive and keep the app, command-line tool and plug-in host together. The builds are unsigned; Windows and macOS may warn before opening. Linux needs ALSA.</p><div><a :href="`${repository}/releases/tag/nightly`" target="_blank" rel="noreferrer">Build notes &amp; checksums ↗</a><a :href="`${repository}/actions/workflows/test-build.yml`" target="_blank" rel="noreferrer">Looking for a PR test build? ↗</a></div></div>
      </div>
    </section>

    <section class="chapter name-chapter">
      <div class="chapter-title"><h2 class="statement">Suhina.<br><span>A soft hiss.</span></h2></div>
      <div class="chapter-body"><p>In Finnish, <em>suhina</em> is a soft hiss or rustle. A small sound, with something happening inside it.</p><p>Suhina is free and open source under GPL-3.0-or-later. Read the code, report a problem, suggest what comes next, or help build it.</p><div class="open-links"><a class="text-action" :href="repository" target="_blank" rel="noreferrer">Suhina on GitHub ↗</a><a class="text-action" :href="`${repository}/issues`" target="_blank" rel="noreferrer">Have a say ↗</a></div></div>
    </section>

    <section class="guide-invitation"><a :href="`${base}guide/`">Connect your audio. Make your first sound. <span aria-hidden="true">↗</span></a><div><a :href="`${base}settings/`">Settings reference ↗</a><a :href="`${base}shortcuts/`">Keyboard shortcuts ↗</a></div></section>
  </div>
</template>

<style scoped>
.product-home { --cols: minmax(0, 5fr) minmax(0, 4fr) minmax(0, 3fr); }
h1 { margin: 0; font-size: clamp(52px, 8.4vw, 136px); line-height: .92; letter-spacing: -.045em; }
p { margin: 0 0 1em; }

/* Hero */
.hero { padding-top: clamp(40px, 6vw, 88px); }
.hero-top { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: var(--gutter); align-items: end; padding: 0 var(--gutter) clamp(36px, 4vw, 56px); }
.hero-status { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--olive); }
.live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }
.stage-tag { padding: 1px 8px; border: 1px solid var(--line); border-radius: 999px; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
.hero-description { font-size: 18px; color: var(--olive); }
.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 24px; margin-top: 26px; }
.primary-action { display: inline-flex; gap: 22px; padding: 12px 18px; border-radius: 4px; background: var(--ink); color: var(--paper); font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: .02em; }
.primary-action:hover { background: var(--orange); color: var(--on-orange); }
.text-action { display: inline-flex; gap: 12px; padding-bottom: 3px; border-bottom: 1px solid var(--line); font-size: 15px; font-weight: 500; color: var(--ink); }
.text-action:hover { border-color: var(--orange); }

/* Full-bleed media panels stay dark in both themes, like product photography. */
.stage { --s-ink: #ededea; --s-muted: #8a8a85; --s-line: #2a2a28; margin: 0; padding: clamp(20px, 4vw, 64px) var(--gutter); background: #0b0b0b; color: var(--s-ink); }
.hero-media img { display: block; width: 100%; height: auto; border-radius: 6px; box-shadow: 0 30px 80px rgba(0, 0, 0, .55); }
.hero-media figcaption { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-top: 18px; font-size: 13px; color: var(--s-muted); }
.hero-media figcaption a:hover { color: var(--s-ink); }

/* Chapters: number and heading on the left, a narrow column of text beside it. */
.chapter { display: grid; grid-template-columns: var(--cols); gap: var(--gutter); padding: clamp(48px, 6vw, 96px) var(--gutter); }
.chapter-title { position: relative; padding-left: 44px; }
.num { position: absolute; left: 0; top: .6em; font: 13px var(--mono); color: var(--muted); }
.chapter-title h2 { max-width: 11ch; }
.chapter-body { font-size: 17px; color: var(--olive); }
.chapter-body .text-action { margin: 6px 0 22px; }
.note { font-size: 14px; color: var(--muted); }

.stage-label { margin: 0; font: 13px var(--mono); color: var(--s-muted); }
.agent-study blockquote { max-width: 14ch; margin: 18px 0 clamp(36px, 5vw, 72px); font-size: clamp(36px, 6vw, 96px); font-weight: 600; line-height: .98; letter-spacing: -.04em; }
.agent-flow { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--gutter); margin: 0; padding: 0; list-style: none; }
.agent-flow li { display: grid; gap: 4px; padding-top: 16px; border-top: 1px solid var(--s-line); }
.agent-flow span { font: 13px var(--mono); color: #ffc53d; }
.agent-flow b { font-size: 18px; font-weight: 600; }
.agent-flow small { font-size: 15px; color: var(--s-muted); }

.song-strip { display: flex; align-items: center; gap: 20px; }
.song-strip > span { font: 13px var(--mono); color: var(--s-muted); white-space: nowrap; }
.song-bars { flex: 1; display: flex; align-items: center; gap: 4px; height: clamp(120px, 14vw, 200px); }
.song-bars i { flex: 1; height: 30%; border-radius: 3px; background: #2a2a28; }
.song-bars i:nth-child(n+4) { height: 46%; background: #3b3a35; }
.song-bars i:nth-child(n+7) { height: 70%; background: #5c584b; }
.song-bars i:nth-child(n+9) { height: 100%; background: #ffc53d; }
.song-bars i:last-child { height: 40%; background: #3b3a35; }

.format-tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 6px 0 22px; }
.format-tags span { padding: 4px 12px; border: 1px solid var(--line); border-radius: 999px; font-size: 13px; color: var(--ink); }
.format-tags .experimental-tag { border-color: var(--orange); color: var(--orange); }
.file-path { display: flex; align-items: center; gap: 18px; margin: 6px 0 22px; font: 26px var(--mono); color: var(--ink); }
.file-path > span:first-child { color: var(--muted); }

.download-chapter, .name-chapter { border-top: 1px solid var(--line); }
.download-chapter { scroll-margin-top: 0; }
.download-options { grid-column: 1 / -1; margin-top: clamp(16px, 3vw, 40px); }
.platform-download { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 4fr) auto; gap: var(--gutter); align-items: baseline; padding: 22px 0; border-top: 1px solid var(--line); transition: color .15s; }
.platform-download:last-of-type { border-bottom: 1px solid var(--line); }
.platform-download b { font-size: clamp(32px, 4.6vw, 72px); font-weight: 600; letter-spacing: -.035em; line-height: 1; }
.platform-download small { font: 13px var(--mono); color: var(--muted); }
.platform-download > span { font-size: clamp(24px, 3vw, 44px); line-height: 1; }
.platform-download:hover { color: var(--orange); }
.download-notes { display: grid; grid-template-columns: var(--cols); gap: var(--gutter); margin-top: 24px; font-size: 14px; color: var(--muted); }
.download-notes p { grid-column: 2; }
.download-notes div { display: grid; gap: 6px; align-content: start; }
.download-notes a { width: fit-content; color: var(--ink); }
.download-notes a:hover { color: var(--orange); }

.name-chapter .chapter-title { padding-left: 0; }
.name-chapter .statement { max-width: none; font-size: clamp(52px, 7vw, 112px); letter-spacing: -.045em; line-height: .92; }
.statement span { color: var(--muted); }
.open-links { display: flex; flex-wrap: wrap; gap: 24px; }

.guide-invitation { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 24px; padding: clamp(48px, 6vw, 88px) var(--gutter); background: var(--orange); color: var(--on-orange); }
.guide-invitation > a { max-width: 16ch; font-size: clamp(32px, 4.4vw, 64px); font-weight: 600; letter-spacing: -.035em; line-height: 1; }
.guide-invitation > a:hover { text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 6px; }
.guide-invitation > div { display: flex; flex-wrap: wrap; gap: 24px; font-size: 15px; font-weight: 500; }
.guide-invitation > div a:hover { text-decoration: underline; }

@media (max-width: 1000px) {
  .product-home { --cols: minmax(0, 1fr) minmax(0, 1fr) 0; }
}
@media (max-width: 720px) {
  .hero-top, .chapter, .download-notes { grid-template-columns: 1fr; }
  .hero-top { gap: 28px; }
  .chapter { gap: 20px; }
  .chapter-title { padding-left: 0; }
  .num { position: static; display: block; margin-bottom: 10px; }
  .chapter-title h2 { max-width: none; }
  .download-notes p { grid-column: auto; }
  .agent-flow { grid-template-columns: 1fr; gap: 18px; }
  .song-strip > span { display: none; }
  .platform-download { grid-template-columns: 1fr auto; gap: 4px 16px; }
  .platform-download small { grid-row: 2; }
  .platform-download > span { grid-row: 1 / 3; grid-column: 2; align-self: center; }
}
</style>
