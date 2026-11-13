<script setup lang="ts">
const base = import.meta.env.BASE_URL
const daw = 'https://github.com/suhina-daw/suhina-daw'
</script>

<template>
<footer>
  <div>
    <a class="brand" :href="base"><img class="brand-logo logo-on-light" :src="`${base}assets/brand/suhina-logo.svg?v=3`" alt="Suhina" width="125" height="37"><img class="brand-logo logo-on-dark" :src="`${base}assets/brand/suhina-logo-dark.svg`" alt="Suhina" width="125" height="37"></a>
    <p>A soft hiss. A free, open music workstation.</p>
    <p class="note">Open source, GPL-3.0-or-later.</p>
  </div>
  <nav class="footer-links" aria-label="Community and contributing">
    <div><h2>Community</h2><a href="https://discord.gg/rgwp4DDNsU" target="_blank" rel="noreferrer">Discord</a><a href="https://www.reddit.com/r/suhina/" target="_blank" rel="noreferrer">r/suhina on Reddit</a></div>
    <div><h2>Help improve the guide</h2><a :href="`${daw}/issues`" target="_blank" rel="noreferrer">Settings &amp; shortcuts</a><a href="https://github.com/suhina-daw/suhina-web/issues" target="_blank" rel="noreferrer">Website feedback</a></div>
    <div><h2>Contribute</h2><a :href="`${daw}/blob/main/CONTRIBUTING.md`" target="_blank" rel="noreferrer">To Suhina</a><a href="https://github.com/suhina-daw/suhina-web" target="_blank" rel="noreferrer">To the website</a></div>
  </nav>
</footer>
</template>

<style scoped>
.brand { display: inline-block; margin-bottom: 16px; }
p { margin: 0; }
.footer-links { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px var(--gutter); }
.footer-links div { display: grid; gap: 6px; align-content: start; }
h2 { margin-bottom: 6px; font-size: 14px; font-weight: 400; letter-spacing: 0; line-height: 1.5; color: var(--muted); }
.footer-links a { width: fit-content; color: var(--ink); }
.footer-links a:hover { text-decoration: underline; text-underline-offset: 4px; }
@media (max-width: 720px) { .footer-links { grid-template-columns: 1fr 1fr; } }
</style>
