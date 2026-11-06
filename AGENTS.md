# AGENTS.md

How to work on the Suhina website. The README explains the structure; read it first.

## Website development

Use Vue 3 single-file components with TypeScript, Vite, plain CSS, and Motion for Vue (`motion-v`). Preserve the established warm paper palette, typography, spacing and responsive layout. Shared tokens and base styles live in `src/styles/main.css`; component-specific styles belong in scoped style blocks. Respect reduced motion and retain semantic keyboard-accessible controls. Treat JSON as untrusted data; validate it and render text through Vue interpolation, never `v-html`.

Every page is prerendered at build time, so component setup code must not use `window` or `document` without checking that they exist; read browser state in `onMounted` or behind a guard. An entrance animation that starts hidden must also start visible when replacing the prerendered page (`src/prerendered.ts`).

Run `npm test`, `npm run build` and the Python tests (`python -m unittest discover -s scripts -p "test_*.py"`) after changes. `npm run dev` uses port 5173; `npm run preview` serves the production build on 4173. Check the production build in the browser. Do not manually edit `dist/` or commit dependencies, build output or preview screenshots.

## Settings and shortcut content

The explanations of settings and shortcuts are not written in this repository. They live in the Suhina repository (`docs/guide-data/` on `suhina-daw/suhina-daw`), are reviewed there with the code they describe, and reach `public/settings.json` and `public/shortcuts.json` only through the **Follow DAW main settings** workflow. Never edit those JSON files by hand, and never commit data from a local or unmerged Suhina branch. To change what a setting's or shortcut's help says, change it in the Suhina repository.

`scripts/sync-settings.py` and `settings-help.json` are the retired original exporter and help text; do not use them.

The website does own the display names and order of Settings pages and shortcut categories (`pages` and `formerPages` in `src/data/settings.ts`, `shortcutCategories` in `src/data/shortcuts.ts`). Keep them matching Suhina's `Page::ALL` in `crates/ui/src/settings/settings_view.rs` and the shortcut export's categories. Validation must never reject a page or category only because it is new: that stops the site following Suhina without anyone noticing.

Do not publish unreviewed AI-generated prose on the product or guide pages.
