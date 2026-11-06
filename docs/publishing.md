# Publishing to suhina.org

The GitHub repository is public. GitHub Pages can host the static Vite build; no server or Worker is required. Domain registration and DNS can stay at Namecheap.

## Verification and approval

`.github/workflows/pages.yml` runs technical checks on pushes and pull requests: Node data-validation/search tests, Python exporter tests and the production build. It uploads only `dist` as a Pages artifact. It does not check out the DAW source or repeat a settings-content review. The native repository owns that review and the settings-coverage gate.

Every push to `main` automatically publishes after the verification job succeeds. Review website changes before merging them into `main`; AI-generated prose still requires human review. Pull requests run verification without deploying. To retry publication without another commit, run **Verify and publish website** from `main` with **publish_reviewed_site** selected. Manual runs on other branches cannot publish.

**Follow DAW main settings** runs about every 30 minutes and can be dispatched manually on web `main`. Its source repository and `main` ref are fixed in the workflow; there is no branch input. The importer additionally verifies official origin and the fetched `origin/main` commit and reads the committed `docs/guide-data/settings.json` blob. It accepts schemaVersion 1, requires source-reviewed complete help and records provenance in `public/settings-source.json`. Missing, stale or invalid source data fails the run before any update is committed or published. No local checkout or unmerged UI setting is a fallback.

Changed data is tested and built before an automated commit updates only the generated settings/shortcuts JSON files and their provenance records. This uses the website's own workflow token, not a cross-repository secret. After the first approved Pages/domain setup, set the repository Actions variable `PAGES_SYNC_PUBLISH` to `true` to let these source-approved data changes deploy automatically. This is a one-time publication setting, not another content approval. Pushes made with the workflow token do not trigger the ordinary push workflow, so the synchronization workflow itself builds and uploads the deployment artifact. Invalid data leaves the last site intact. A native change with identical exported data creates no new web commit.

If artifact upload or deployment fails after the data commit has already been pushed, start a new **Follow DAW main settings** run from Actions → Run workflow on `main`, with **retry_publish** selected. This revalidates the source, reruns installation/tests/build and uploads a fresh artifact even if the JSON is unchanged; it does not create another data commit for unchanged files. The publish job then retries if `PAGES_SYNC_PUBLISH=true`. This input does not bypass source validation or enable publication when that repository variable is off. Ordinary scheduled unchanged runs remain no-ops. Re-running the original run without the retry input is not the recovery path.

Settings prose must be approved in the native repository, alongside its implementation. Local `helpStatus: reviewed` means the author checked implementation evidence; it is not proof of source-repository approval. The companion native export PR migrates the current main subset into that repository. Merge that source PR before running synchronization. This does not introduce a second review gate in the web repository. The older web `settings-help.json` and Python exporter remain as historical migration inputs; the automated importer never uses them.

## GitHub setup

1. In repository Settings → Pages, select GitHub Actions as the build source.
2. Verify ownership of `suhina.org` in the organization's Pages settings using the TXT record GitHub supplies. Its exact verification name and value come from GitHub and must not be guessed.
3. Set the repository's custom domain to `suhina.org` before pointing its DNS to GitHub. A custom Actions deployment does not require a `CNAME` file in the repository.
4. Merge reviewed website changes into `main` to publish after successful verification, or manually dispatch on `main` with **publish_reviewed_site** selected to retry.
5. Once DNS validation and certificate issuance succeed, enable Enforce HTTPS.

## Namecheap DNS

In Domain List → suhina.org → Manage → Advanced DNS, replace only the conflicting parking or URL Redirect host records for `@` and `www` with:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | Automatic |
| A | @ | 185.199.109.153 | Automatic |
| A | @ | 185.199.110.153 | Automatic |
| A | @ | 185.199.111.153 | Automatic |
| CNAME | www | suhina-daw.github.io | Automatic |

Keep unrelated records, particularly mail and domain-verification records. Do not change nameservers for this GitHub Pages setup. If an existing AAAA record points at another host, reconcile it before enabling the domain; optional GitHub IPv6 addresses are listed in the official instructions. The organization verification TXT record is additional to the host records above.

The custom domain serves the app at `/`, matching Vite's current base. Without a custom domain, this repository's default project URL is under `/suhina-web/` and requires a corresponding Vite base; do not use that URL as the final deployment test with the root-domain build.

## Finish checks

Check `https://suhina.org`, the `www` redirect, HTTPS, the brand assets and `settings.json`. Test search, categories, expanded explanations, keyboard controls and a mobile viewport. Record any outstanding content or layout review before approving the first public release.

## Search engines

`suhina.org` is a verified Domain property in Google Search Console, verified with a `google-site-verification` TXT record on `@` in Namecheap. Keep that record: removing it ends the verification. Bing Webmaster Tools imported the site from Search Console and re-checks the verification through it, so Bing needs no record of its own.

Every build writes `sitemap.xml` and `robots.txt` (pointing to the sitemap) into `dist`, and prerenders each page with a canonical URL and link-preview tags. Submit `https://suhina.org/sitemap.xml` once in Search Console under Sitemaps; Bing reads sitemaps submitted there. A new page added to `sitePages` joins the sitemap automatically.

References: [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [custom domain and DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Shortcut rollout

The importer also consumes `docs/guide-data/shortcuts.json` when committed on official DAW main. It validates the supported schema, coverage scope, reviewed help, required context, OS/preset key arrays and unique IDs before updating either catalog. A shortcut-only change triggers the same build/upload/deploy and retry path as a settings change. Both provenance records name the actual consumed main commit; unrelated native commits with unchanged exports remain no-ops.

Merge the native shortcut export and review its prose there before publishing the web shortcut section. Local browser QA may use a generated preview copied from that native proposal, but that preview is not a production input and must not be committed to the web repository. Initial source absence is tolerated for settings-only sync; removing a previously imported shortcut catalog fails closed.

Source shortcut review: [suhina-daw/suhina-daw#789](https://github.com/suhina-daw/suhina-daw/pull/789).
