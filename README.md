# Suhina web

The Suhina product website, beginner guide and searchable settings/shortcut references. Built with Vue 3, TypeScript, Vite, plain CSS, and Motion for Vue. The existing visual design is kept in reusable Vue components.

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
npm test            # Data validation and search checks (Node 22.12+)
python -m unittest discover -s scripts -p "test_*.py"
```

The output is static: deploy `dist/` to a static host. Production needs no Python, Node server, or backend. Vite's `base` option can be set when deploying under a subdirectory; the settings URL and brand assets follow it. The canonical URLs, link-preview tags, `sitemap.xml` and `robots.txt` use the published address in `src/data/site.ts`, so a deployment elsewhere changes it there.

The build renders each page's HTML in Node (`src/entry-server.ts`, `scripts/prerender.ts`), so the published files already contain their text, including every settings explanation and shortcut, for search engines, link previews and readers without JavaScript. The browser then renders the same page over it. A new page goes in `sitePages` in `src/data/pages.ts`, which makes it a build entry, prerenders it and lists it in the sitemap. Code that runs while a page renders must not touch `window` or `document` unguarded, since the prerender has neither.

## Structure

- `src/components/`: header, sidebar, landing sections, settings reference and setting entries.
- `src/data/settings.ts`: typed data validation and search.
- `src/styles/main.css`: shared CSS and responsive design tokens.
- `public/assets/`: existing brand assets.
- `public/settings.json`: generated data, publicly served for the website and developer use.
- `settings-help.json`: reviewed extended explanations.

## Settings documentation

Generate data from Suhina's `crates/ui/src/settings/settings_rows.rs`:

```sh
python scripts/sync-settings.py --source ../suhina-ui-polish
```

Pass the path to another checkout when needed. The website fetches the generated `/settings.json`. Raw JSON source links are intentionally omitted from individual setting explanations. Multi-control panels remain grouped as in the native UI. Search includes setting names, saved keys, notes, options and extended explanations.

See `AGENTS.md` for authoring instructions. The current main-owned website export contains 61 entries with implementation-checked English help (the earlier UI-branch authoring snapshot contained 73), including choices, dependencies, practical guidance and contributor references. See [the review notes](docs/settings-review.md) for source provenance and discrepancies in native specs. Authored `summary` text can replace a terse native UI note without modifying the application source. Run `python scripts/sync-settings.py --source ../suhina-ui-polish --require-help` during local authoring to check completeness against a native checkout. Native changes after the recorded review may require new help. The Pages workflow tests and builds pull requests, then automatically publishes pushes to `main` after those checks succeed. Review website changes before merging; manual dispatch remains available to retry publication. Settings-content review belongs in the native repository; the website must not repeat it. See [publishing and Namecheap DNS instructions](docs/publishing.md).

`workInProgress: true` in an authored help entry displays a yellow Work in progress pill when that help's fingerprint matches. It describes an incomplete feature, independently of the documentation review status. Search also finds that phrase. It currently marks Warp mode and Plug-in library. Public release of AI-assisted text still requires maintainer review; the local `reviewed` status is not a release approval.

The proposed [versioned documentation data plan](docs/documentation-data-plan.md) moves settings and shortcut sources into the native repository, with schemas, coverage gates, pinned exports and human review before publication.

The **Follow DAW main settings** workflow polls only `suhina-daw/suhina-daw`'s `main` branch about every 30 minutes. It imports the committed version-one export at `docs/guide-data/settings.json`, validates it, tests/builds and records changes with source provenance. It never reads local or PR-branch settings. [Native export PR #783](https://github.com/suhina-daw/suhina-daw/pull/783) is merged. Invalid source exports fail without replacing website data. Setting `PAGES_SYNC_PUBLISH=true` after the initial Pages setup enables automatic publication of source-approved data updates without another web content approval. See [publishing](docs/publishing.md).

If upload or deployment fails after a data commit, manually run that workflow on `main` with `retry_publish=true`. It rebuilds and retries publication even when settings are unchanged, without creating an empty data commit. Publication still requires `PAGES_SYNC_PUBLISH=true`.

Only the setting list fades for 500 ms when changing categories; headings, search, filters, entry count and Reset filters stay in place. The opening hero and expanded help also use motion. All respect reduced-motion preferences. Fonts use Google Fonts with local fallbacks. External release links lead to pre-alpha nightly builds. The complete settings reference is one part of a broader product site; this is not yet a complete application manual.

## License and repository

Website-owned code and content are GPL-3.0-or-later; see LICENSE and NOTICE. Third-party materials retain their own licenses. The local Git repository uses `main` and its `origin` is `https://github.com/suhina-daw/suhina-web.git`. The user has made the repository public. GitHub Pages setup and the first website publication require completing the steps in `docs/publishing.md`. Review of settings prose belongs in the native repository, with no duplicate content approval in this repository.

## Keyboard shortcut reference

The new `#shortcuts` section supports action/key search, categories, OS and preset selection, contextual explanations and deliberately unbound window actions. `src/data/shortcuts.ts` validates the version-one contract before it reaches Vue. No custom keymap is uploaded or imported.

The companion [native PR #789](https://github.com/suhina-daw/suhina-daw/pull/789) owns `docs/guide-data/shortcuts-help.json`, the deterministic `shortcuts.json` export and its coverage gate. The first directory covers all default-bound actions and window actions; parameterless commands without default keys are not part of this directory. Prose is reviewed once in the DAW PR. The web importer reads only the official committed main export, validates both settings and shortcuts before changing files, and records `shortcuts-source.json` provenance. If main has not gained its first shortcut export yet, settings sync continues and the page shows an unavailable state; after the first import, disappearing source data fails closed. Never publish a local preview of unmerged shortcut prose.

For local review only, copy the companion branch's generated shortcut export to `public/shortcuts.json` and build. Do not commit that preview file to this website branch. Once the native PR merges, the main-only sync creates the production data automatically. Website feedback and native content feedback have separate footer links; the Contribute disclosure offers matching DAW and Web links.

## Local product-page proposal

The current local proposal separates the product homepage (`/`) from `/guide/`, `/settings/` and `/shortcuts/`. Vite emits a directory index for each route so static-host refreshes work. Existing `/#settings`, `/#shortcuts`, `/#guide` and `/#first-sound` links are retained through redirects. Settings links may include `category` and `q` query parameters.

See [the product-page review notes](docs/product-homepage.md) for main-source claim checks, the illustration/screenshot distinction and the local-only preview policy. This proposal is for localhost review before any publication.
