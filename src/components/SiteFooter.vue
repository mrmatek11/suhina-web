<script setup lang="ts">
const base = import.meta.env.BASE_URL
</script>

<template>
<footer>
  <a class="brand" :href="base"><img class="brand-logo logo-on-light" :src="`${base}assets/brand/suhina-logo.svg?v=3`" alt="Suhina" width="125" height="37"><img class="brand-logo logo-on-dark" :src="`${base}assets/brand/suhina-logo-dark.svg`" alt="Suhina" width="125" height="37"></a>
  <p>A soft hiss. A free, open music workstation.</p>
  <div class="footer-links">
    <div><span class="link-heading">Community</span><a href="https://discord.gg/rgwp4DDNsU" target="_blank" rel="noreferrer">Discord ↗</a><a href="https://www.reddit.com/r/suhina/" target="_blank" rel="noreferrer">r/suhina on Reddit ↗</a></div>
    <div><span class="link-heading">Help improve the guide</span><a href="https://github.com/suhina-daw/suhina-daw/issues" target="_blank" rel="noreferrer">Settings &amp; shortcuts ↗</a><a href="https://github.com/suhina-daw/suhina-web/issues" target="_blank" rel="noreferrer">Website feedback ↗</a></div>
    <details class="contribute"><summary>Contribute <span class="expand" aria-hidden="true">+</span></summary><div class="contribute-options">
      <a href="https://github.com/suhina-daw/suhina-daw/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer" aria-label="Contribute to Suhina DAW"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 7v10M17 7v2a5 5 0 0 1-5 5H7"/><circle cx="7" cy="4" r="3"/><circle cx="7" cy="20" r="3"/><circle cx="17" cy="4" r="3"/></svg>DAW <span aria-hidden="true">↗</span></a>
      <a href="https://github.com/suhina-daw/suhina-web" target="_blank" rel="noreferrer" aria-label="Contribute to the website"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 7v10M17 7v2a5 5 0 0 1-5 5H7"/><circle cx="7" cy="4" r="3"/><circle cx="7" cy="20" r="3"/><circle cx="17" cy="4" r="3"/></svg>Web <span aria-hidden="true">↗</span></a>
    </div></details>
  </div>
  <span>OPEN SOURCE / GPL-3.0-OR-LATER</span>
</footer>
</template>

<style scoped>
.footer-links { margin-left: auto; display: flex; gap: 48px; }
.footer-links > div { display: grid; gap: 8px; align-content: start; }
.link-heading { font: 12px var(--mono); color: var(--muted); margin-bottom: 4px; }
.footer-links a { font-size: 14px; }
.footer-links a:hover { color: var(--orange); }
.contribute { min-width: 190px; align-self: start; border: 1px solid var(--line); border-radius: 4px; overflow: hidden; }
.contribute summary { padding: 10px 14px; cursor: pointer; list-style: none; font-size: 14px; }
.contribute summary::-webkit-details-marker { display: none; }
.expand { float: right; margin-left: 25px; }
.contribute[open] .expand { transform: rotate(45deg); }
.contribute summary:hover { background: var(--orange); color: var(--on-orange); }
.contribute-options { display: flex; border-top: 1px solid var(--line); }
.contribute-options a { flex: 1; display: flex; align-items: center; gap: 7px; padding: 10px; }
.contribute-options a + a { border-left: 1px solid var(--line); }
.contribute-options a { font-size: 14px; }
.contribute-options a:hover { background: var(--raised); }
@media (max-width: 900px) { .footer-links { width: 100%; margin-left: 0; flex-wrap: wrap; gap: 24px; } }
</style>
