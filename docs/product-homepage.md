# Product homepage proposal

Status: history. This proposal was merged (suhina-daw/suhina-web#3) and is the live product page;
the README describes the site as it is now. The notes below record how the page's claims were
checked on 2026-10-21; recheck them against Suhina's main before changing those claims.

## Structure

- `/`: product introduction, agent access, sample map, Session/Arrangement, plug-ins, import,
  pre-alpha downloads, open-source participation and the name's meaning.
- `/guide/`: audio setup and links into the references.
- `/settings/` and `/shortcuts/`: the searchable reference pages.

Vite builds a real index.html for every directory, so direct visits and refreshes work on static
GitHub Pages without a Worker or SPA fallback. Old root hash links redirect to the corresponding
guide pages. No router dependency was added.

## Content evidence

Checked official DAW main `5a8bb9a` (2026-10-21), without modifying the native application:

- `README.md`: platforms, pre-alpha, project import, nightly packages, unsigned binaries,
  keeping app/CLI/host together and the Linux ALSA requirement.
- `docs/mcp.md`, `crates/ui/src/app.rs`, `crates/automation/src/attach.rs`: external MCP agents
  require enablement and connection approval, edit open projects and share their undo history.
- `docs/spec/sample-map.md`, `docs/decisions/0013-sample-map-analysis.md`,
  `crates/ui/src/browser/sample_map_panel.rs`: sound-based neighborhoods, cloud/grid and previews.
- `docs/spec/ui-session-view.md`, `crates/ui/src/app.rs`: Session and Arrangement in one project.
- `docs/decisions/0006-plug-in-hosting.md`, `crates/plugin-host/src/vst3.rs`,
  `crates/plugin-host/src/clap.rs`: sandboxed CLAP/VST3 and transport context.
- `docs/decisions/0028-ara-hosting.md`, `crates/plugin-host/src/ara.rs`,
  `crates/ui/src/app.rs::open_ara_editor`: existing experimental ARA clip editing. Do not claim
  that the wider pending multitrack/shared-document work is in main.

The three direct nightly archive URLs were checked against the GitHub release assets. Recheck
those filenames and current capabilities before a public release. Settings/shortcut prose
ownership and main-only synchronization remain unchanged.

## Visual direction

Redesigned in November 2026 after Elektron product pages: near-black or off-white, Host Grotesk, Geist Mono for labels, one yellow accent,
numbered chapters with a narrow text column, and full-bleed dark media panels that stay dark in both themes. Feature sections alternate text and a visual
explanation. Artcraft was a reference for hierarchy and product-first presentation, not copied
for layout, logo treatment, orbiting media, type pairing or animation.

### Light and dark theme

The site follows the system's light or dark setting. The round button in the header switches to
the other theme and stores that choice in the browser (`localStorage` key `suhina-theme`);
switching back to the system's own theme removes the stored choice. A small script in the
`<head>` of each page (`index.html`, `guide/`, `settings/`, `shortcuts/`) applies the stored
choice before the first paint, so a page never flashes the wrong theme.

The colours are tokens on `:root` in `src/styles/main.css`: `--paper`, `--ink`, `--muted`,
`--line`, `--orange` (the yellow highlight), `--on-orange` (text on it), `--olive` and the song-bar
tints `--sand` and `--clay`. The dark values come from Suhina's own suhina-studio theme. Grey
shades are written as `color-mix(in srgb, var(--ink) N%, var(--paper))` instead of fixed hex
values, so they turn with the theme; a new colour should be one of these mixes or a token. The
sample map illustration stays dark in both themes. The header and footer carry two logo images,
`suhina-logo.svg` and the white-lettered `suhina-logo-dark.svg`, and CSS shows the one that fits
the theme.

The hero now uses the user-supplied Arrangement screenshot (`bQTeTd1jV8.png`), copied unchanged
to `public/assets/product/suhina-arrangement.png`. It is labeled Arrangement detail and links to
the full-size image. The sample map remains an original SVG/Vue concept illustration, visibly
labeled as such. No native app was started, restarted, closed or changed to obtain media.
The sample illustration has no audio autoplay and changes only when selected. Motion respects
reduced-motion preferences.

## Local review

`npm run build`, then use the existing preview server at port 4173 (check for one before
starting `npm run preview`). For shortcut QA only, the companion native proposal's generated
export may be copied to public/shortcuts.json before building, then removed from public after
the build. Never commit that unmerged preview data to this web branch or deploy this build.

Review the copy, desktop/mobile layout, the actual Arrangement screenshot and full-size link, sound-neighborhood
controls, guide navigation, direct page refreshes, settings search, shortcut search and the
Contribute disclosure. No deployment is part of this task.
