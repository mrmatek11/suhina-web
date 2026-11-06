# Suhina web

The Suhina product website at [suhina.org](https://suhina.org): the product page, a beginner guide and searchable references for Suhina's settings and keyboard shortcuts. Built with Vue 3, TypeScript, Vite, plain CSS and Motion for Vue.

## Development

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. Vite provides hot reload. Stop a server with Ctrl+C.

```sh
npm run build       # Type-check, build to dist/ and prerender every page
npm run preview     # Serve the production build at http://127.0.0.1:4173
npm test            # Data validation, search and prerender checks (Node 22.12+)
python -m unittest discover -s scripts -p "test_*.py"
```

The output is static: `dist/` is published to GitHub Pages, with no server or backend. Vite's `base` option can be set when deploying under a subdirectory; the settings URL and brand assets follow it. The canonical URLs, link-preview tags, `sitemap.xml` and `robots.txt` use the published address in `src/data/site.ts`, so a deployment elsewhere changes it there.

The build renders each page's HTML in Node (`src/entry-server.ts`, `scripts/prerender.ts`), so the published files already contain their text, including every settings explanation and shortcut, for search engines, link previews and readers without JavaScript. The browser then renders the same page over it. A new page goes in `sitePages` in `src/data/pages.ts`, which makes it a build entry, prerenders it and lists it in the sitemap. Code that runs while a page renders must not touch `window` or `document` unguarded, since the prerender has neither.

## Pages

- `/`: the product page (`ProductHome.vue`), with the pre-alpha nightly downloads.
- `/guide/`: getting started and audio setup.
- `/settings/`: every documented setting, searchable and filtered by Settings page. `?category=<page id>` and `?q=<words>` open it filtered; links to pages Suhina has since renamed (such as `General`) land on the page that replaced them.
- `/shortcuts/`: every default-bound and window action, per operating system and keymap preset.

Old `/#settings`, `/#shortcuts`, `/#guide` and `/#first-sound` links redirect to these pages.

## Structure

- `src/components/`: the header, sidebar, product page, guide and the two references.
- `src/data/pages.ts`: the list of pages and their URLs.
- `src/data/settings.ts`, `src/data/shortcuts.ts`: validation of the reference data, the names and order of Settings pages and shortcut categories, and search.
- `src/data/site.ts`: the published address, head tags, sitemap and robots.txt.
- `src/styles/main.css`: shared CSS and responsive design tokens.
- `public/settings.json`, `public/shortcuts.json`: the reference data, generated from Suhina's main branch (below); never edit them by hand.
- `scripts/import-main-settings.ts`: the importer the sync workflow runs.

## Where the reference content comes from

The settings and shortcut explanations are written and reviewed in the Suhina repository, next to the code they describe: `docs/guide-data/settings.json` and `docs/guide-data/shortcuts.json` on `suhina-daw/suhina-daw` `main`, with coverage tests there. This repository does not review that prose again or keep a second copy of it.

The **Follow DAW main settings** workflow (`.github/workflows/sync-settings.yml`) reads those two files from DAW `main` about every 30 minutes, validates them, runs the tests and build, commits changed data with its source commit in `public/settings-source.json` and `public/shortcuts-source.json`, and publishes. Invalid data fails the run and leaves the published site as it was, so **a failing run means the site has stopped following Suhina**. The workflow then opens an issue titled *The website stopped following Suhina main* and closes it again once a run succeeds; read the failing run's log. If publishing fails after a data commit, run the workflow on `main` with `retry_publish` selected.

Suhina names each setting's Settings page by an id (`Projects`, `ClipEditor`, …) and each shortcut's category by name. The website knows their display names and order (`pages` in `src/data/settings.ts`, `shortcutCategories` in `src/data/shortcuts.ts`, matching `Page::ALL` in Suhina's `crates/ui/src/settings/settings_view.rs`). When Suhina adds or renames one, the data still loads: an unknown page is named from its id and listed last. Add it to the list to give it its own name and place, and add a renamed page to `formerPages` so old links keep working.

`workInProgress: true` on a setting shows a yellow Work in progress pill; it marks an unfinished feature, not unfinished documentation, and search finds it by those words.

`scripts/sync-settings.py` and `settings-help.json` are the website's original settings exporter and help text from before the content moved to the Suhina repository. Nothing reads them any more; they are kept for history.

## Publishing

See [docs/publishing.md](docs/publishing.md): the Pages workflow, the domain and DNS, Search Console and Bing, and recovery steps. Pushes to `main` publish after the tests and build pass; pull requests run the same checks without publishing.

The remaining documents record how the site came about: [the product page review](docs/product-homepage.md), [the documentation data plan](docs/documentation-data-plan.md) and [the first settings review](docs/settings-review.md).

## License and repository

Website-owned code and content are GPL-3.0-or-later; see LICENSE and NOTICE. Third-party materials keep their own licenses. The repository is public at `https://github.com/suhina-daw/suhina-web` and uses `main`.
