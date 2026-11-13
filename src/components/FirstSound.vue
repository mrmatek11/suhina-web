<template>
<section class="page-section" id="first-sound">
  <h2>Start with the sound.</h2>
  <ol class="steps">
    <li><h3>Choose your output</h3><p>Open <strong>Options → Settings → Audio</strong>. Choose a driver and the device connected to your speakers or headphones.</p></li>
    <li><h3>Check what's playing</h3><p>The <strong>Now</strong> section shows the active output, latency, and underruns. Use this readout when checking your audio setup.</p></li>
    <li><h3>Make room for ideas</h3><p>In <strong>Projects and backups → Projects</strong>, choose your project folder and what Suhina opens at start. Set up backups before a longer session.</p></li>
  </ol>
</section>
</template>

<style scoped>
.steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--gutter); margin: 36px 0 0; padding: 0; list-style: none; counter-reset: step; }
.steps li { padding-top: 16px; border-top: 1px solid var(--line); counter-increment: step; }
.steps h3::before { content: counter(step) '. '; color: var(--muted); }
.steps p { margin: 10px 0 0; color: var(--olive); }
@media (max-width: 720px) { .steps { grid-template-columns: 1fr; gap: 24px; } }
</style>
