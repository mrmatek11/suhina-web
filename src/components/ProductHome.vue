<script setup lang="ts">
import { motion, useReducedMotion } from 'motion-v'
import HomeChapter from './HomeChapter.vue'
import SampleMapStudy from './SampleMapStudy.vue'
import ThemeGallery from './ThemeGallery.vue'
import { replacingPrerender } from '../prerendered'
const base = import.meta.env.BASE_URL
const reducedMotion = useReducedMotion()
const still = replacingPrerender()
const repository = 'https://github.com/suhina-daw/suhina-daw'
const shot = (name: string) => `${base}assets/product/${name}.png`
const downloads = [
  { name: 'Windows', detail: 'x64, ZIP', file: 'suhina-nightly-windows-x86_64.zip' },
  { name: 'macOS', detail: 'Universal, TAR.GZ', file: 'suhina-nightly-macos-universal.tar.gz' },
  { name: 'Linux', detail: 'x86_64, TAR.GZ', file: 'suhina-nightly-linux-x86_64.tar.gz' },
]
// The devices marked done in Suhina's ROADMAP.md (Built-in effects and instruments). Recheck the
// table there before adding one: a device belongs here once it runs in track chains.
const devices = [
  { name: 'FM Synth', detail: 'Six operators, 43 algorithms. Reads DX7 voices.' },
  { name: 'Sampler', detail: 'Sample, slice and grain playback.' },
  { name: 'EQ', detail: 'Eight bands. Stereo, left/right or mid/side.' },
  { name: 'Compressor', detail: 'Soft knee, side-chain high-pass, dry/wet.' },
  { name: 'Multiband', detail: 'Three bands of upward and downward dynamics.' },
  { name: 'Limiter', detail: 'Brickwall, with lookahead.' },
  { name: 'Delay', detail: 'Synced or free. Ping-pong and freeze.' },
  { name: 'Reverb', detail: 'Algorithmic, with freeze.' },
  { name: 'Saturator', detail: 'Eight curves and a waveshaper.' },
  { name: 'Overdrive', detail: 'Oversampled drive.' },
  { name: 'Vinyl Distortion', detail: 'Oversampled distortion.' },
  { name: 'DJ EQ', detail: 'Three bands with kills.' },
  { name: 'Auto Pan', detail: 'Moves a sound across the stereo field.' },
  { name: 'Utility', detail: 'Gain and the basics.' },
  { name: 'NAM Amp Modeler', detail: 'Plays .nam amp captures.' },
  { name: 'NAM Cab Loader', detail: 'Cabinet impulse responses from .wav files.' },
  { name: 'Pitch', detail: 'A MIDI effect. Transposes by semitones or scale degrees.' },
]
</script>

<template>
  <div class="product-home">
    <motion.section id="home" :initial="{ opacity: reducedMotion || still ? 1 : 0 }" :animate="{ opacity: 1 }" :transition="{ duration: reducedMotion || still ? 0 : .5 }">
      <figure class="stage hero-media">
        <img :src="shot('suhina-session')" alt="Suhina Session view with colored clips for drums, bass, keys and vocals above a mixer with faders and level meters" width="1280" height="800" fetchpriority="high">
      </figure>
      <div class="hero-top">
        <h1>The open-source DAW you can restyle with CSS.</h1>
        <div>
          <p class="hero-description">Make music in the open. Suhina is a free music workstation for Windows, macOS and Linux. Explore samples by sound, build songs with clips and a timeline, and invite an AI agent into your project.</p>
          <p class="hero-actions"><a class="download" href="#download">Try the pre-alpha</a><a class="link" :href="`${base}guide/`">Read the guide</a></p>
        </div>
      </div>
    </motion.section>

    <HomeChapter id="song" number="01" title="Start with a loop. Decide where it goes.">
      <p>Launch clips and scenes in Session. Shape audio and MIDI on the Arrangement timeline. Both are part of the same project.</p><p>A short idea can become a song without leaving the workstation.</p><p><a class="link" :href="`${base}shortcuts/`">Find the keys for it</a></p>
    </HomeChapter>
    <figure class="stage shot">
      <img :src="shot('suhina-arrangement')" alt="Suhina Arrangement showing audio waveforms, MIDI note clips and track controls together on the song timeline" width="1251" height="492" loading="lazy">
      <figcaption>Arrangement. Audio and MIDI, arranged together.</figcaption>
    </figure>

    <HomeChapter id="themes" number="02" title="Make it look like yours." ruled>
      <p>Suhina's look is a theme, written in CSS with SVG and PNG artwork. Choose a built-in theme, change its settings, move the interface around, or write your own.</p><p>Export a theme as one .theme.suhina file to share it.</p><p><a class="link" :href="`${base}settings/?category=Themes`">Explore theme settings</a></p>
    </HomeChapter>
    <ThemeGallery />

    <HomeChapter id="sample-map" number="03" title="You know the sound. Maybe not its name.">
      <p>The sample map groups your samples by how they sound. Similar sounds become neighbors, so one good find can lead you to the next.</p><p>Explore a cloud or a grid, preview samples as you move through the map, and bring a sound into your project.</p><p><a class="link" :href="`${base}settings/?category=Browser&q=sample+map`">Explore sample map settings</a></p><p class="note">The illustration shows the idea. In Suhina, the map is built from samples in your library.</p>
    </HomeChapter>
    <div class="stage"><SampleMapStudy /></div>

    <HomeChapter id="features" number="04" title="Let an agent work with you.">
      <p>Your AI agent can inspect and edit the project open in Suhina. See the changes in the same window, hear them in your song, and use the same undo history.</p><p>You choose when to let an agent in. Enable access, approve the connection, and disconnect it from Suhina when you're done.</p><p><a class="link" :href="`${base}settings/?q=agents`">Explore agent access</a></p><p class="note">Requires an external agent that supports MCP, the connection standard Suhina uses. Agent access is off until you enable it.</p>
    </HomeChapter>

    <HomeChapter id="devices" number="05" title="Instruments and effects, in the box." ruled>
      <p>Suhina comes with its own devices. Every change to a control is one undo step, and automation can take it over.</p><p>You can also build audio effects, MIDI effects and instruments with the device SDK and share each one as a single .sd file.</p><p><a class="link" :href="`${repository}/blob/main/docs/device-sdk.md`" target="_blank" rel="noreferrer">Read the device SDK guide</a></p>
      <template #after>
      <ul class="rows device-list"><li v-for="device in devices" :key="device.name"><h3>{{ device.name }}</h3><p>{{ device.detail }}</p></li></ul>
      </template>
    </HomeChapter>

    <HomeChapter id="plug-ins" number="06" title="Bring your plug-ins along." ruled>
      <p>Use CLAP and VST3 instruments and effects in a separate plug-in host. Supported plug-ins receive the song's tempo and playback position.</p><p class="note">Experimental ARA support lets compatible editors work with Arrangement audio clips. Compatibility and the wider ARA workflow are still being developed.</p>
    </HomeChapter>

    <HomeChapter id="import" number="07" title="A new place for an old project.">
      <p>Open existing .als projects, bring in audio and MIDI, and save your work in Suhina's own project format.</p><p class="note">Project import is evolving. Not every imported device or feature is reproduced; try your material and tell us what needs work.</p>
    </HomeChapter>

    <HomeChapter id="progress" number="08" title="Built in public. Counted in public." ruled>
      <p>How much of each area of Suhina works today. A box's size is its number of features, its fill the share done; the red number is the area's open bugs.</p><p>The maintainers count it from their feature list and a bot redraws it every day.</p><p><a class="link" :href="`${repository}/blob/main/ROADMAP.md`" target="_blank" rel="noreferrer">What works &amp; what's next</a></p>
    </HomeChapter>
    <figure class="stage status">
      <img src="https://raw.githubusercontent.com/suhina-daw/suhina-status/main/status-dark.svg" alt="Suhina by area: how many features are done, in progress and planned, with the open bugs" width="680" height="420" loading="lazy">
    </figure>

    <HomeChapter id="download" number="09" title="Early days. Real things to try.">
      <p>Open projects. Launch clips. Edit audio and MIDI. Explore the sample map. Work with plug-ins and connect an agent.</p><p class="note">Expect unfinished workflows, changing behavior and bugs. Start with copies of your projects. These are nightly development builds, not a stable release.</p>
      <template #after>
      <ul class="rows platforms"><li v-for="download in downloads" :key="download.name"><a :href="`${repository}/releases/download/nightly/${download.file}`"><b>{{ download.name }}</b><span>{{ download.detail }}</span></a></li></ul>
      <div class="download-notes note"><p>Unpack the archive and keep the app, command-line tool and plug-in host together. The builds are unsigned; Windows and macOS may warn before opening. Linux needs ALSA.</p><p><a class="link" :href="`${repository}/releases/tag/nightly`" target="_blank" rel="noreferrer">Build notes &amp; checksums</a><br><a class="link" :href="`${repository}/actions/workflows/test-build.yml`" target="_blank" rel="noreferrer">Looking for a PR test build?</a></p></div>
      </template>
    </HomeChapter>

    <HomeChapter ruled>
      <template #title><h2 class="statement">Suhina.<br><span>A soft hiss.</span></h2></template>
      <p>In Finnish, <em>suhina</em> is a soft hiss or rustle. A small sound, with something happening inside it.</p><p>Suhina is free and open source under GPL-3.0-or-later. Read the code, report a problem, suggest what comes next, or help build it.</p><p class="open-links"><a class="link" :href="repository" target="_blank" rel="noreferrer">Suhina on GitHub</a><a class="link" :href="`${repository}/issues`" target="_blank" rel="noreferrer">Have a say</a></p>
    </HomeChapter>

    <section class="closing">
      <a class="statement" :href="`${base}guide/`">Connect your audio. Make your first sound.</a>
      <p class="open-links"><a class="link" :href="`${base}settings/`">Settings reference</a><a class="link" :href="`${base}shortcuts/`">Keyboard shortcuts</a></p>
    </section>
  </div>
</template>

<style scoped>
.product-home { --cols: minmax(0, 5fr) minmax(0, 4fr) minmax(0, 3fr); }

.hero-top { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: var(--gutter); align-items: end; padding: clamp(32px, 4vw, 56px) var(--gutter) clamp(24px, 3vw, 44px); }
.hero-top h1 { max-width: 13ch; font-size: clamp(40px, min(6.2vw, 10.5vh), 104px); }
.hero-description { font-size: 19px; color: var(--olive); }
.hero-actions, .open-links { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; margin: 24px 0 0; }
.hero-actions .download { padding: 12px 18px; font-size: 14px; }

/* Pictures sit on black in both themes. */
.stage { margin: 0; padding: clamp(20px, 4vw, 64px) var(--gutter); background: #000; color: #ededea; }
.stage img { display: block; width: 100%; height: auto; }
.stage figcaption { margin-top: 12px; font-size: 14px; color: #8a8a85; }
.hero-media { padding-block: clamp(16px, 2.4vw, 40px) 0; }
/* The first screen shows the top of the app and the headline together. */
.hero-media img { height: min(44vh, 52vw); object-fit: cover; object-position: top; }
.hero-media img, .shot img, .shot figcaption, .status img { width: min(100%, 1280px); margin-inline: auto; }
.status img { width: min(100%, 880px); }

.rows { grid-column: 1 / -1; margin: 0; padding: 0; list-style: none; }
.device-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0 var(--gutter); }
.device-list li { padding: 16px 0 20px; border-top: 1px solid var(--line); }
.device-list p { margin: 4px 0 0; color: var(--olive); }

.platforms a { display: grid; grid-template-columns: var(--cols); gap: var(--gutter); align-items: baseline; padding: 20px 0; border-top: 1px solid var(--line); }
.platforms li:last-child a { border-bottom: 1px solid var(--line); }
.platforms b { font-size: clamp(32px, 4.6vw, 72px); font-weight: 600; letter-spacing: -.04em; line-height: 1; }
.platforms span { color: var(--muted); }
.platforms a:hover b { text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 8px; }
.download-notes { grid-column: 2 / -1; display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 3fr); gap: var(--gutter); }
.download-notes .link { color: var(--ink); }

.statement { font-size: clamp(44px, 6.4vw, 104px); font-weight: 600; letter-spacing: -.045em; line-height: .94; }
.statement span { color: var(--muted); }
.closing { display: grid; gap: 28px; padding: clamp(48px, 6vw, 96px) var(--gutter); border-top: 1px solid var(--line); }
.closing .statement { max-width: 14ch; }
.closing .statement:hover { text-decoration: underline; text-decoration-thickness: 4px; text-underline-offset: 10px; }
.closing .open-links { margin: 0; }

@media (max-width: 1000px) {
  .product-home { --cols: minmax(0, 1fr) minmax(0, 1fr) 0; }
  .download-notes { grid-template-columns: 1fr; gap: 0; }
}
@media (max-width: 720px) {
  .hero-top, .platforms a { grid-template-columns: 1fr; }
  .hero-top { gap: 24px; }
  .platforms a { gap: 4px; }
  .download-notes { grid-column: 1; }
}
</style>
