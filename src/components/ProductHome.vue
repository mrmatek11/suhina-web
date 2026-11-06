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
    <motion.section id="home" class="product-hero" :initial="{ opacity: reducedMotion || still ? 1 : 0 }" :animate="{ opacity: 1 }" :transition="{ duration: reducedMotion || still ? 0 : .5 }">
      <div class="hero-copy">
        <div class="product-eyebrow"><span class="live-dot"></span> FREE &amp; OPEN SOURCE <span class="stage-tag">PRE-ALPHA</span></div>
        <h1>Make music<br>in the <span>open.</span></h1>
        <p class="hero-description">A free music workstation for Windows, macOS and Linux. Explore samples by sound, build songs with clips and a timeline, and invite an AI agent into your project.</p>
        <div class="hero-actions"><a class="primary-action" href="#download">Try the pre-alpha <span aria-hidden="true">↓</span></a><a class="text-action" :href="`${base}guide/`">Read the guide <span aria-hidden="true">↗</span></a></div>
        <p class="hero-footnote">Yours to use. Yours to change. Built in public.</p>
      </div>
      <figure class="hero-study">
        <div class="capture-label"><span>INSIDE SUHINA</span><span>ARRANGEMENT DETAIL</span></div>
        <a class="product-capture" :href="`${base}assets/product/suhina-arrangement.png`" target="_blank" rel="noreferrer" aria-label="View the Suhina Arrangement screenshot at full size"><img :src="`${base}assets/product/suhina-arrangement.png`" alt="Suhina Arrangement showing audio waveforms, MIDI note clips and track controls together on the song timeline" width="1251" height="492" fetchpriority="high"></a>
        <figcaption><span>Audio and MIDI, arranged together.</span><a :href="`${base}assets/product/suhina-arrangement.png`" target="_blank" rel="noreferrer">View full size ↗</a></figcaption>
      </figure>
    </motion.section>

    <div class="product-index" aria-label="Suhina at a glance"><span><b>01</b> A WORKSTATION, ON YOUR COMPUTER</span><span><b>02</b> A LIBRARY YOU CAN EXPLORE BY EAR</span><span><b>03</b> A PROJECT YOU CAN HELP SHAPE</span></div>

    <section id="features" class="feature-section agent-feature">
      <div class="feature-copy"><div class="product-eyebrow">01 / MAKE ROOM FOR ANOTHER PAIR OF HANDS</div><h2>Let an agent<br>work with you.</h2><p>Your AI agent can inspect and edit the project open in Suhina. See the changes in the same window, hear them in your song, and use the same undo history.</p><p>You choose when to let an agent in. Enable access, approve the connection, and disconnect it from Suhina when you're done.</p><a class="text-action" :href="`${base}settings/?q=agents`">Explore agent access <span aria-hidden="true">↗</span></a><p class="feature-note">Requires an external agent that supports MCP, the connection standard Suhina uses. Agent access is off until you enable it.</p></div>
      <div class="agent-study"><div class="study-kicker">YOU &amp; YOUR CONNECTED AGENT</div><div class="request-label">AN EXAMPLE REQUEST</div><blockquote>“Make some room<br>for the bass.”</blockquote><div class="agent-flow"><div><span>01</span><b>Read the project</b><small>Tracks, clips, notes.</small></div><div><span>02</span><b>Make an edit</b><small>Visible in your open song.</small></div><div><span>03</span><b>Keep or undo</b><small>Your project's edit history.</small></div></div><div class="study-bottom"><span class="live-dot"></span> YOUR PROJECT. YOUR PERMISSION.</div></div>
    </section>

    <section class="feature-section sample-feature">
      <div class="feature-copy"><div class="product-eyebrow">02 / FOLLOW YOUR EARS</div><h2>You know the sound.<br>Maybe not its name.</h2><p>The sample map groups your samples by how they sound. Similar sounds become neighbors, so one good find can lead you to the next.</p><p>Explore a cloud or a grid, preview samples as you move through the map, and bring a sound into your project.</p><a class="text-action" :href="`${base}settings/?category=Browser&q=sample+map`">Explore sample map settings <span aria-hidden="true">↗</span></a><p class="feature-note">The illustration shows the idea. In Suhina, the map is built from samples in your library.</p></div>
      <SampleMapStudy />
    </section>

    <section class="song-section">
      <div class="song-heading"><div class="product-eyebrow">03 / FROM A FIRST CLIP TO A WHOLE SONG</div><h2>Start with a loop.<br>Decide where it goes.</h2></div>
      <div class="song-notes"><p>Launch clips and scenes in Session. Shape audio and MIDI on the Arrangement timeline. Both are part of the same project.</p><p>A short idea can become a song without leaving the workstation.</p><a class="text-action" :href="`${base}shortcuts/`">Find the keys for it <span aria-hidden="true">↗</span></a></div>
      <div class="song-strip" aria-hidden="true"><span>AN IDEA</span><div class="song-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>A SONG</span></div>
    </section>

    <section class="connections-section">
      <div class="connection-card"><div class="product-eyebrow">04 / INSTRUMENTS &amp; EFFECTS</div><h2>Bring your<br>plug-ins along.</h2><p>Use CLAP and VST3 instruments and effects in a separate plug-in host. Supported plug-ins receive the song's tempo and playback position.</p><div class="format-tags"><span>CLAP</span><span>VST3</span><span class="experimental-tag">ARA · EXPERIMENTAL</span></div><p class="connection-detail">Experimental ARA support lets compatible editors work with Arrangement audio clips. Compatibility and the wider ARA workflow are still being developed.</p></div>
      <div class="connection-card"><div class="product-eyebrow">05 / YOUR EXISTING IDEAS</div><h2>A new place<br>for an old project.</h2><p>Open existing .als projects, bring in audio and MIDI, and save your work in Suhina's own project format.</p><div class="file-path" aria-label="Import existing projects and save as Suhina projects"><span>.als</span><span aria-hidden="true">→</span><span>.suhina</span></div><p class="connection-detail">Project import is evolving. Not every imported device or feature is reproduced; try your material and tell us what needs work.</p></div>
    </section>

    <section id="download" class="download-section">
      <div class="download-intro"><div class="product-eyebrow"><span class="live-dot"></span> PRE-ALPHA / BUILT IN PUBLIC</div><h2>Early days.<br>Real things to try.</h2><p>Open projects. Launch clips. Edit audio and MIDI. Explore the sample map. Work with plug-ins and connect an agent.</p><p class="prealpha-note">Expect unfinished workflows, changing behavior and bugs. Start with copies of your projects. These are nightly development builds, not a stable release.</p><a class="text-action" :href="`${repository}/blob/main/ROADMAP.md`" target="_blank" rel="noreferrer">What works &amp; what's next <span aria-hidden="true">↗</span></a></div>
      <div class="download-options"><h3>Pick your platform.</h3><a v-for="download in downloads" :key="download.name" class="platform-download" :href="`${repository}/releases/download/nightly/${download.file}`"><span><b>{{ download.name }}</b><small>{{ download.detail }}</small></span><span aria-hidden="true">↓</span></a><div class="download-notes"><p>Unpack the archive and keep the app, command-line tool and plug-in host together. The builds are unsigned; Windows and macOS may warn before opening. Linux needs ALSA.</p><a :href="`${repository}/releases/tag/nightly`" target="_blank" rel="noreferrer">Build notes &amp; checksums ↗</a><a :href="`${repository}/actions/workflows/test-build.yml`" target="_blank" rel="noreferrer">Looking for a PR test build? ↗</a></div></div>
    </section>

    <section class="open-section"><div><div class="product-eyebrow">A LITTLE ABOUT THE NAME</div><h2>Suhina.<br><span>A soft hiss.</span></h2></div><div><p>In Finnish, <em>suhina</em> is a soft hiss or rustle. A small sound, with something happening inside it.</p><p>Suhina is free and open source under GPL-3.0-or-later. Read the code, report a problem, suggest what comes next, or help build it.</p><div class="open-links"><a class="text-action" :href="repository" target="_blank" rel="noreferrer">Suhina on GitHub ↗</a><a class="text-action" :href="`${repository}/issues`" target="_blank" rel="noreferrer">Have a say ↗</a></div></div></section>

    <section class="guide-invitation"><span class="product-eyebrow">READY TO GET STARTED?</span><a :href="`${base}guide/`">Connect your audio.<br>Make your first sound. <span aria-hidden="true">↗</span></a><div><a :href="`${base}settings/`">Settings reference ↗</a><a :href="`${base}shortcuts/`">Keyboard shortcuts ↗</a></div></section>
  </div>
</template>

<style scoped>
.product-home { max-width: 1600px; margin: 0 auto; }
.product-hero { display: grid; grid-template-columns: .95fr 1.1fr; align-items: center; gap: 70px; padding: 86px 64px 84px; }
.product-eyebrow { display: flex; align-items: center; gap: 8px; color: #72796a; font: 9px/1.7 var(--mono); letter-spacing: .6px; }
.live-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #9da77f; flex-shrink: 0; }
.stage-tag { border: 1px solid #d6d8cc; padding: 2px 7px; margin-left: 5px; font-size: 8px; }
h1 { font-size: clamp(64px, 6.7vw, 105px); line-height: 1.02; letter-spacing: -.075em; font-weight: 500; margin: 32px 0 27px; }
h1 > span { position: relative; z-index: 0; white-space: nowrap; }
h1 > span::after { content: ''; position: absolute; z-index: -1; height: .14em; background: var(--orange); left: .015em; right: -.035em; bottom: .065em; }
.hero-description { font-size: 15px; line-height: 1.9; max-width: 455px; color: #646b5c; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 26px; margin-top: 30px; }
.primary-action { background: var(--ink); color: var(--paper); padding: 15px 21px; display: inline-flex; gap: 34px; align-items: center; font-size: 12px; }
.primary-action:hover { background: #45503c; }
.text-action { display: inline-flex; align-items: center; gap: 18px; font-size: 11px; border-bottom: 1px solid #c7ccbd; padding-bottom: 5px; }
.text-action:hover { border-color: #8a956e; }
.hero-footnote { color: #858b7b; font-size: 10px; margin-top: 19px; }
.hero-study { padding-top: 23px; min-width: 0; margin: 0; }
.capture-label { display: flex; justify-content: space-between; gap: 12px; font: 8px var(--mono); color: var(--muted); letter-spacing: .6px; margin-bottom: 13px; }
.product-capture { display: block; border: 1px solid #c5c9ba; background: #efefe7; box-shadow: 12px 14px 0 #e8e8de; }
.product-capture img { display: block; width: 100%; height: auto; }
.hero-study figcaption { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 10px; color: var(--muted); margin-top: 25px; }
.hero-study figcaption a { border-bottom: 1px solid var(--line); }
.product-index { display: flex; justify-content: space-between; gap: 25px; padding: 22px 64px; border-block: 1px solid var(--line); font: 8px/1.7 var(--mono); letter-spacing: .4px; color: #858a7a; }
.product-index b { color: #505747; margin-right: 12px; font-weight: 400; }
.feature-section { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 110px; padding: 92px 94px; border-bottom: 1px solid var(--line); }
h2 { font-size: clamp(36px, 3.7vw, 58px); letter-spacing: -.06em; line-height: 1.13; margin: 23px 0; }
.feature-copy p, .song-notes p, .connection-card > p, .download-intro > p, .open-section p { font-size: 13px; line-height: 1.95; color: #6e7564; max-width: 450px; }
.feature-copy .text-action { margin-top: 13px; }
.feature-copy .feature-note { font-size: 10px; line-height: 1.8; color: #858d7b; margin-top: 20px; max-width: 400px; }
.agent-study { background: #e9e5d7; padding: 29px; border: 1px solid #d8d4c4; }
.study-kicker, .request-label, .study-bottom { font: 8px/1.6 var(--mono); letter-spacing: .6px; color: #7e806e; }
.request-label { margin-top: 47px; font-size: 7px; }
blockquote { font-size: clamp(28px, 3vw, 46px); line-height: 1.2; font-weight: 500; letter-spacing: -.055em; margin: 12px 0 39px; }
.agent-flow { display: grid; gap: 17px; padding-block: 22px; border-block: 1px solid #d0cdbc; }
.agent-flow > div { display: grid; grid-template-columns: 28px 1fr; column-gap: 7px; }
.agent-flow span { grid-row: 1 / 3; font: 9px var(--mono); color: #8e917b; padding-top: 3px; }
.agent-flow b { font-size: 11px; font-weight: 600; }
.agent-flow small { font-size: 10px; color: #7d8371; }
.study-bottom { display: flex; align-items: center; gap: 8px; margin-top: 19px; font-size: 7px; }
.sample-feature { background: #2f382c; color: #f4f1df; }
.sample-feature .product-eyebrow { color: #b8c0a9; }
.sample-feature .feature-copy p { color: #bac3ae; }
.sample-feature .feature-copy .feature-note { color: #a3ae97; }
.sample-feature .text-action { border-color: #68745b; }
.song-section { padding: 86px 94px 65px; display: grid; grid-template-columns: 1.1fr 1fr; gap: 35px 100px; border-bottom: 1px solid var(--line); }
.song-heading h2 { margin-bottom: 0; }
.song-notes { padding-top: 33px; }
.song-strip { grid-column: 1 / -1; display: flex; gap: 22px; align-items: center; margin-top: 20px; }
.song-strip > span { font: 7px var(--mono); color: #929782; white-space: nowrap; }
.song-bars { display: flex; align-items: center; flex: 1; gap: 6px; height: 80px; border-block: 1px solid #e0e2d6; }
.song-bars i { flex: 1; height: 30px; background: #c8d0b3; border-left: 2px solid #8e9a71; }
.song-bars i:nth-child(3n) { background: #dcc9aa; height: 51px; border-color: #ac9671; }.song-bars i:nth-child(4n) { background: #d8b99f; height: 39px; border-color: #ad8767; }
.connections-section { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--line); }
.connection-card { padding: 65px 70px; }.connection-card + .connection-card { border-left: 1px solid var(--line); }
.connection-card h2 { font-size: clamp(33px, 3vw, 48px); }
.format-tags { display: flex; flex-wrap: wrap; gap: 7px; margin: 25px 0; }.format-tags span { border: 1px solid #cfd3c3; padding: 5px 9px; font: 9px var(--mono); }
.format-tags .experimental-tag { background: #f2e3b4; border-color: #e0ce93; }
.connection-card > .connection-detail { font-size: 11px; color: #858c79; }
.file-path { display: flex; align-items: center; gap: 20px; margin: 25px 0; font: 20px var(--mono); color: #788366; }.file-path > span:first-child { color: #a3aa94; }.file-path > span:nth-child(2) { font-size: 16px; }
.download-section { background: #e9ecdf; padding: 80px 94px; display: grid; grid-template-columns: 1fr 1fr; gap: 110px; border-bottom: 1px solid #cfd5bf; scroll-margin-top: 20px; }
.download-intro h2 { margin-top: 24px; }.download-intro > .prealpha-note { font-size: 11px; }
.download-intro .text-action { margin-top: 15px; }
.download-options { padding-top: 9px; }.download-options h3 { font-size: 18px; font-weight: 500; margin-bottom: 20px; }
.platform-download { display: flex; align-items: center; justify-content: space-between; padding: 19px 0; border-top: 1px solid #c9d0ba; }.platform-download:nth-of-type(3) { border-bottom: 1px solid #c9d0ba; }
.platform-download b { font-size: 18px; font-weight: 500; letter-spacing: -.5px; }.platform-download small { margin-left: 15px; font: 8px var(--mono); color: #858e77; }.platform-download > span:last-child { font-size: 22px; color: #73815c; }.platform-download:hover b { text-decoration: underline; text-decoration-color: #bcc89f; text-underline-offset: 5px; }
.download-notes p { font-size: 10px; color: #7d876f; line-height: 1.9; margin: 20px 0 16px; }.download-notes a { display: block; width: fit-content; font-size: 10px; margin-top: 6px; border-bottom: 1px solid #c8cfbb; }
.open-section { display: grid; grid-template-columns: 1fr 1fr; gap: 110px; padding: 75px 94px; border-bottom: 1px solid var(--line); }.open-section h2 { margin-bottom: 0; }.open-section h2 span { color: #9ba18e; }.open-section > div:last-child { padding-top: 18px; }.open-links { display: flex; gap: 24px; flex-wrap: wrap; margin-top: 23px; }
.guide-invitation { padding: 60px 94px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 22px; align-items: end; border-bottom: 1px solid var(--line); }.guide-invitation > .product-eyebrow { grid-column: 1 / -1; }.guide-invitation > a { font-size: 30px; letter-spacing: -1.3px; line-height: 1.35; }.guide-invitation > a span { margin-left: 14px; color: #8a9574; }.guide-invitation > div { display: flex; gap: 24px; justify-content: end; flex-wrap: wrap; }.guide-invitation > div a { font-size: 11px; border-bottom: 1px solid var(--line); padding-bottom: 3px; }
@media(min-width: 1600px) { .product-hero { padding-top: 110px; padding-bottom: 110px; } }
@media(max-width: 1100px) { .product-hero { gap: 40px; padding: 65px 38px; } .product-index { padding-inline: 38px; font-size: 7px; }.feature-section { padding: 65px 50px; gap: 60px; }.song-section,.download-section,.open-section { padding: 65px 50px; gap: 50px; }.connection-card { padding: 55px 40px; }.guide-invitation { padding: 50px; } }
@media(max-width: 800px) { .product-hero { grid-template-columns: 1fr; gap: 35px; padding: 52px 30px; }.hero-description { max-width: 560px; }.hero-study { max-width: 660px; width: 100%; padding-top: 5px; }h1 { font-size: 86px; }.product-index { padding: 20px 30px; flex-wrap: wrap; gap: 12px 24px; }.feature-section { gap: 35px; padding: 60px 35px; }.feature-copy p { font-size: 12px; }h2 { font-size: 38px; }.agent-study { padding: 20px; }blockquote { font-size: 32px; }.song-section { gap: 30px; padding: 55px 35px; }.connections-section { grid-template-columns: 1fr; }.connection-card { padding: 50px 35px; }.connection-card + .connection-card { border-left: 0; border-top: 1px solid var(--line); }.download-section,.open-section { gap: 35px; padding: 55px 35px; }.guide-invitation { padding: 45px 35px; }.guide-invitation > div { justify-content: start; } }
@media(max-width: 600px) { .product-hero { padding: 38px 23px 43px; }h1 { font-size: 70px; margin: 25px 0; }.product-eyebrow { font-size: 8px; }.stage-tag { font-size: 7px; }.hero-description { font-size: 13px; }.hero-actions { gap: 20px; }.primary-action { padding: 13px 15px; gap: 22px; font-size: 11px; }.text-action { font-size: 10px; }.product-index { display: grid; padding-inline: 23px; gap: 10px; }.feature-section,.song-section,.download-section,.open-section { grid-template-columns: 1fr; padding: 48px 23px; gap: 27px; }h2 { font-size: 39px; }.feature-copy p,.song-notes p,.download-intro > p,.open-section p { max-width: none; }.agent-study { padding: 25px; }.request-label { margin-top: 25px; }blockquote { font-size: 37px; margin-bottom: 25px; }.agent-flow { gap: 14px; }.sample-feature { gap: 26px; }.song-notes { padding-top: 0; }.song-strip { gap: 10px; margin-top: 0; }.song-bars { gap: 4px; }.song-strip > span { font-size: 6px; }.connection-card { padding: 44px 23px; }.connection-card h2 { font-size: 38px; }.download-options { padding-top: 5px; }.open-section > div:last-child { padding-top: 0; }.guide-invitation { grid-template-columns: 1fr; padding: 40px 23px; }.guide-invitation > a { font-size: 29px; }.guide-invitation > div { gap: 20px; } }
@media(min-width: 361px) and (max-width: 600px) { h1 { font-size: 64px; } }
@media(max-width: 360px) { h1 { font-size: 61px; }.stage-tag { margin-left: 0; }.product-eyebrow { letter-spacing: .2px; }.platform-download small { margin-left: 8px; font-size: 7px; } }
</style>
