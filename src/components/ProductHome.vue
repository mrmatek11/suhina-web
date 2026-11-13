<script setup lang="ts">
import { motion, useReducedMotion } from 'motion-v'
import SampleMapStudy from './SampleMapStudy.vue'
import { replacingPrerender } from '../prerendered'
const base = import.meta.env.BASE_URL
const reducedMotion = useReducedMotion()
const still = replacingPrerender()
const repository = 'https://github.com/suhina-daw/suhina-daw'
const shot = (name: string) => `${base}assets/product/${name}.png`
const downloads = [
  { name: 'Windows', detail: 'x64 · ZIP', file: 'suhina-nightly-windows-x86_64.zip' },
  { name: 'macOS', detail: 'Universal · TAR.GZ', file: 'suhina-nightly-macos-universal.tar.gz' },
  { name: 'Linux', detail: 'x86_64 · TAR.GZ', file: 'suhina-nightly-linux-x86_64.tar.gz' },
]
// The devices marked done in Suhina's ROADMAP.md (Built-in effects and instruments). Recheck the
// table there before adding one: a device belongs here once it runs in track chains.
const devices = [
  { name: 'FM Synth', kind: 'Instrument', detail: 'Six operators, 43 algorithms. Reads DX7 voices.' },
  { name: 'Sampler', kind: 'Instrument', detail: 'Sample, slice and grain playback.' },
  { name: 'EQ', kind: 'Effect', detail: 'Eight bands. Stereo, left/right or mid/side.' },
  { name: 'Compressor', kind: 'Effect', detail: 'Soft knee, side-chain high-pass, dry/wet.' },
  { name: 'Multiband', kind: 'Effect', detail: 'Three bands of upward and downward dynamics.' },
  { name: 'Limiter', kind: 'Effect', detail: 'Brickwall, with lookahead.' },
  { name: 'Delay', kind: 'Effect', detail: 'Synced or free. Ping-pong and freeze.' },
  { name: 'Reverb', kind: 'Effect', detail: 'Algorithmic, with freeze.' },
  { name: 'Saturator', kind: 'Effect', detail: 'Eight curves and a waveshaper.' },
  { name: 'Overdrive', kind: 'Effect', detail: 'Oversampled drive.' },
  { name: 'Vinyl Distortion', kind: 'Effect', detail: 'Oversampled distortion.' },
  { name: 'DJ EQ', kind: 'Effect', detail: 'Three bands with kills.' },
  { name: 'Auto Pan', kind: 'Effect', detail: 'Moves a sound across the stereo field.' },
  { name: 'Utility', kind: 'Effect', detail: 'Gain and the basics.' },
  { name: 'NAM Amp Modeler', kind: 'Effect', detail: 'Plays .nam amp captures.' },
  { name: 'NAM Cab Loader', kind: 'Effect', detail: 'Cabinet impulse responses from .wav files.' },
  { name: 'Pitch', kind: 'MIDI effect', detail: 'Transposes by semitones or scale degrees.' },
]
const themes = [
  { file: 'suhina-arrangement-dark', title: 'Arrangement, dark', alt: 'Suhina Arrangement in a dark theme, with orange, yellow and blue MIDI clips beside track headers' },
  { file: 'suhina-theme-sheet', title: 'Suhina Sheet', alt: 'Suhina Session in the green and white Suhina Sheet theme' },
  { file: 'suhina-theme-blocks', title: 'Suhina Blocks', alt: 'Suhina Session in the brown, pixel-textured Suhina Blocks theme' },
  { file: 'suhina-interface-editor', title: 'Editing the interface', alt: 'Suhina with the Edit interface panel open and every movable element outlined on a snap grid' },
]
</script>

<template>
  <div class="product-home">
    <motion.section id="home" class="hero" :initial="{ opacity: reducedMotion || still ? 1 : 0 }" :animate="{ opacity: 1 }" :transition="{ duration: reducedMotion || still ? 0 : .5 }">
      <figure class="stage hero-media">
        <a :href="shot('suhina-session')" target="_blank" rel="noreferrer" aria-label="View the Suhina Session screenshot at full size"><img :src="shot('suhina-session')" alt="Suhina Session view with colored clips for drums, bass, keys and vocals above a mixer with faders and level meters" width="1280" height="800" fetchpriority="high"></a>
      </figure>
      <div class="hero-top">
        <h1>Make music<br>in the open.</h1>
        <div class="hero-side">
          <p class="hero-status"><span class="live-dot"></span>Free &amp; open source <span class="stage-tag">Pre-alpha</span></p>
          <p class="hero-description">A free music workstation for Windows, macOS and Linux. Explore samples by sound, build songs with clips and a timeline, and invite an AI agent into your project.</p>
          <div class="hero-actions"><a class="primary-action" href="#download">Try the pre-alpha <span aria-hidden="true">↓</span></a><a class="text-action" :href="`${base}guide/`">Read the guide <span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
    </motion.section>

    <section id="song" class="chapter">
      <div class="chapter-title"><span class="num">/ 01</span><h2>Start with a loop. Decide where it goes.</h2></div>
      <div class="chapter-body"><p>Launch clips and scenes in Session. Shape audio and MIDI on the Arrangement timeline. Both are part of the same project.</p><p>A short idea can become a song without leaving the workstation.</p><a class="text-action" :href="`${base}shortcuts/`">Find the keys for it <span aria-hidden="true">↗</span></a></div>
    </section>
    <figure class="stage shot">
      <a :href="shot('suhina-arrangement')" target="_blank" rel="noreferrer" aria-label="View the Suhina Arrangement screenshot at full size"><img :src="shot('suhina-arrangement')" alt="Suhina Arrangement showing audio waveforms, MIDI note clips and track controls together on the song timeline" width="1251" height="492" loading="lazy"></a>
      <figcaption>Arrangement. Audio and MIDI, arranged together.</figcaption>
    </figure>

    <section id="sample-map" class="chapter">
      <div class="chapter-title"><span class="num">/ 02</span><h2>You know the sound. Maybe not its name.</h2></div>
      <div class="chapter-body"><p>The sample map groups your samples by how they sound. Similar sounds become neighbors, so one good find can lead you to the next.</p><p>Explore a cloud or a grid, preview samples as you move through the map, and bring a sound into your project.</p><a class="text-action" :href="`${base}settings/?category=Browser&q=sample+map`">Explore sample map settings <span aria-hidden="true">↗</span></a><p class="note">The illustration shows the idea. In Suhina, the map is built from samples in your library.</p></div>
    </section>
    <div class="stage"><SampleMapStudy /></div>

    <section id="features" class="chapter">
      <div class="chapter-title"><span class="num">/ 03</span><h2>Let an agent work with you.</h2></div>
      <div class="chapter-body"><p>Your AI agent can inspect and edit the project open in Suhina. See the changes in the same window, hear them in your song, and use the same undo history.</p><p>You choose when to let an agent in. Enable access, approve the connection, and disconnect it from Suhina when you're done.</p><a class="text-action" :href="`${base}settings/?q=agents`">Explore agent access <span aria-hidden="true">↗</span></a><p class="note">Requires an external agent that supports MCP, the connection standard Suhina uses. Agent access is off until you enable it.</p></div>
    </section>
    <div class="stage agent-study">
      <p class="stage-label">An example request</p>
      <blockquote>“Make some room for the bass.”</blockquote>
      <ol class="agent-flow"><li><span>01</span><b>Read the project</b><small>Tracks, clips, notes.</small></li><li><span>02</span><b>Make an edit</b><small>Visible in your open song.</small></li><li><span>03</span><b>Keep or undo</b><small>Your project's edit history.</small></li></ol>
    </div>

    <section id="devices" class="chapter">
      <div class="chapter-title"><span class="num">/ 04</span><h2>Instruments and effects, in the box.</h2></div>
      <div class="chapter-body"><p>Suhina comes with its own devices. Every change to a control is one undo step, and automation can take it over.</p><p>You can also build audio effects, MIDI effects and instruments with the device SDK and share each one as a single .sd file.</p><a class="text-action" :href="`${repository}/blob/main/docs/device-sdk.md`" target="_blank" rel="noreferrer">Read the device SDK guide <span aria-hidden="true">↗</span></a></div>
      <ul class="device-grid"><li v-for="device in devices" :key="device.name"><span>{{ device.kind }}</span><b>{{ device.name }}</b><small>{{ device.detail }}</small></li></ul>
    </section>

    <section id="plug-ins" class="chapter ruled">
      <div class="chapter-title"><span class="num">/ 05</span><h2>Bring your plug-ins along.</h2></div>
      <div class="chapter-body"><p>Use CLAP and VST3 instruments and effects in a separate plug-in host. Supported plug-ins receive the song's tempo and playback position.</p><div class="format-tags"><span>CLAP</span><span>VST3</span><span class="experimental-tag">ARA · experimental</span></div><p class="note">Experimental ARA support lets compatible editors work with Arrangement audio clips. Compatibility and the wider ARA workflow are still being developed.</p></div>
    </section>

    <section id="themes" class="chapter ruled">
      <div class="chapter-title"><span class="num">/ 06</span><h2>Make it look like yours.</h2></div>
      <div class="chapter-body"><p>Suhina's look is a theme: CSS with SVG and PNG artwork. Choose a built-in theme, change its settings, or move the interface around.</p><p>Export a theme as one .theme.suhina file to share it.</p><a class="text-action" :href="`${base}settings/?category=Themes`">Explore theme settings <span aria-hidden="true">↗</span></a></div>
    </section>
    <div class="stage gallery" tabindex="0" role="group" aria-label="Suhina themes">
      <figure v-for="theme in themes" :key="theme.file"><a :href="shot(theme.file)" target="_blank" rel="noreferrer"><img :src="shot(theme.file)" :alt="theme.alt" width="1280" height="800" loading="lazy"></a><figcaption>{{ theme.title }}</figcaption></figure>
    </div>

    <section id="import" class="chapter">
      <div class="chapter-title"><span class="num">/ 07</span><h2>A new place for an old project.</h2></div>
      <div class="chapter-body"><p>Open existing .als projects, bring in audio and MIDI, and save your work in Suhina's own project format.</p><div class="file-path" aria-label="Import existing projects and save as Suhina projects"><span>.als</span><span aria-hidden="true">→</span><span>.suhina</span></div><p class="note">Project import is evolving. Not every imported device or feature is reproduced; try your material and tell us what needs work.</p></div>
    </section>

    <section id="progress" class="chapter ruled">
      <div class="chapter-title"><span class="num">/ 08</span><h2>Built in public. Counted in public.</h2></div>
      <div class="chapter-body"><p>How much of each area of Suhina works today. A box's size is its number of features, its fill the share done; the red number is the area's open bugs.</p><p>The maintainers count it from their feature list and a bot redraws it every day.</p><a class="text-action" :href="`${repository}/blob/main/ROADMAP.md`" target="_blank" rel="noreferrer">What works &amp; what's next <span aria-hidden="true">↗</span></a></div>
    </section>
    <figure class="stage status">
      <a href="https://github.com/suhina-daw/suhina-status" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/suhina-daw/suhina-status/main/status-dark.svg" alt="Suhina by area: how many features are done, in progress and planned, with the open bugs" width="680" height="420" loading="lazy"></a>
    </figure>

    <section id="download" class="chapter download-chapter">
      <div class="chapter-title"><span class="num">/ 09</span><h2>Early days. Real things to try.</h2></div>
      <div class="chapter-body"><p>Open projects. Launch clips. Edit audio and MIDI. Explore the sample map. Work with plug-ins and connect an agent.</p><p class="note">Expect unfinished workflows, changing behavior and bugs. Start with copies of your projects. These are nightly development builds, not a stable release.</p></div>
      <div class="download-options">
        <a v-for="download in downloads" :key="download.name" class="platform-download" :href="`${repository}/releases/download/nightly/${download.file}`"><b>{{ download.name }}</b><small>{{ download.detail }}</small><span aria-hidden="true">↓</span></a>
        <div class="download-notes"><p>Unpack the archive and keep the app, command-line tool and plug-in host together. The builds are unsigned; Windows and macOS may warn before opening. Linux needs ALSA.</p><div><a :href="`${repository}/releases/tag/nightly`" target="_blank" rel="noreferrer">Build notes &amp; checksums ↗</a><a :href="`${repository}/actions/workflows/test-build.yml`" target="_blank" rel="noreferrer">Looking for a PR test build? ↗</a></div></div>
      </div>
    </section>

    <section class="chapter name-chapter ruled">
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
.hero-top { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: var(--gutter); align-items: end; padding: clamp(40px, 5vw, 72px) var(--gutter) clamp(24px, 3vw, 48px); }
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
.stage img { display: block; width: 100%; height: auto; border-radius: 8px; }
.stage figcaption { margin-top: 14px; font-size: 13px; color: var(--s-muted); }
.hero-media { padding-block: clamp(16px, 3vw, 48px) 0; overflow: hidden; }
.hero-media a, .shot a, .shot figcaption { display: block; width: min(100%, 1280px); margin-inline: auto; }
.hero-media img { border-radius: 8px 8px 0 0; }

/* Chapters: number and heading on the left, a narrow column of text beside it. */
.chapter { display: grid; grid-template-columns: var(--cols); gap: var(--gutter); padding: clamp(48px, 6vw, 96px) var(--gutter); }
.ruled { border-top: 1px solid var(--line); }
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

.device-grid { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0 var(--gutter); margin: clamp(8px, 2vw, 24px) 0 0; padding: 0; list-style: none; }
.device-grid li { display: grid; gap: 2px; padding: 16px 0 18px; border-top: 1px solid var(--line); }
.device-grid span { font: 12px var(--mono); color: var(--muted); }
.device-grid b { font-size: 22px; font-weight: 600; letter-spacing: -.02em; }
.device-grid small { font-size: 15px; color: var(--olive); }

/* Screenshots side by side; the row scrolls sideways and snaps to each one. */
.gallery { display: flex; gap: clamp(16px, 2vw, 32px); overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: var(--gutter); scrollbar-width: thin; scrollbar-color: #333331 transparent; }
.gallery figure { flex: 0 0 min(82%, 880px); margin: 0; scroll-snap-align: start; }

.status a { display: block; width: min(100%, 880px); margin: 0 auto; }

.format-tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 6px 0 22px; }
.format-tags span { padding: 4px 12px; border: 1px solid var(--line); border-radius: 999px; font-size: 13px; color: var(--ink); }
.format-tags .experimental-tag { border-color: var(--orange); color: var(--orange); }
.file-path { display: flex; align-items: center; gap: 18px; margin: 6px 0 22px; font: 26px var(--mono); color: var(--ink); }
.file-path > span:first-child { color: var(--muted); }

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
  .platform-download { grid-template-columns: 1fr auto; gap: 4px 16px; }
  .platform-download small { grid-row: 2; }
  .platform-download > span { grid-row: 1 / 3; grid-column: 2; align-self: center; }
}
</style>
