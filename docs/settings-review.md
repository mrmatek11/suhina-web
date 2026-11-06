# Settings documentation review

Status: history. This review covers the website's own 73-entry help text from before the settings content moved to the Suhina repository. The published settings now come from `docs/guide-data/settings.json` on Suhina's main, reviewed there; see the README. The native-prose conflicts listed below were handed to the Suhina repository at the time.

Checked on 2026-10-21 against the local Suhina checkout at commit `430a100958d0dc55d9561eb0d2305480b1ccf33a`. This is a documentation-only website change; the native working tree was read without modification, branch changes or application restarts.

Later on the same day, a read-only completeness check against the concurrently developed native working tree found three additional settings without matching help: `liquid_panel_strength`, `liquid_track_strength` and `liquid_clip_strength`. The 73-entry website snapshot is unchanged; it is not a claim of coverage for those newer native controls. Their content review belongs in the DAW repository under the revised source-ownership plan. The recorded local review commit was not available from the GitHub commit endpoint when publishing preparation was checked, so it cannot serve as a remote CI source pin. Future exports must use reachable immutable source revisions.

`settings-help.json` contains implementation-checked help for all 73 exported rows, including the three pre-existing entries. Each entry records the native control, implementation and relevant spec paths used for its review. Defaults were checked in `Settings::default`, `ViewSettings::default`, `TrackSizes::default`, `UpdateSettings::default`, the workflow definitions and the library store. References stay in authored contributor data, outside individual page explanations.

The yellow Work in progress pill currently marks:

- **Warp mode:** Rhythmic, Tonal, Texture, Smooth and High quality currently use the same stretch backend. Re-pitch has a distinct speed/pitch behavior.
- **Plug-in library:** the panel exposes a disabled VST2 format choice; VST2 hosting is not implemented.

These are implementation limitations, not unfinished descriptions. Their help passes the same completeness checks as the other entries. Platform restrictions such as editor embedding are documented as conditions rather than treating every platform-dependent setting as unfinished.

## Conflicts found in native prose

The current code is the basis for the website where older specs disagree:

- `docs/shortcuts.md` says choosing a preset leaves other custom bindings alone. `Keymap::set_preset` in `crates/ui/src/settings/keymap.rs` actually replaces bindings with the defaults before applying the preset. The website describes that reset.
- The same document says Reset all returns to the current preset. `shortcuts_page` in `crates/ui/src/settings/settings_view.rs` assigns `Keymap::default()`, which returns to Select-first. The website describes the implemented behavior.
- The native stretch setting’s note mentions Alt, but the control title, Arrangement spec and `edge_keys` implementation require Ctrl+Alt (Cmd+Option on macOS). Alt alone allows unsnapped trimming. The website explains the actual gesture.
- Browser preview prose predates cue routing. The current cue spec, engine cue path and output controls support separate preview outputs; the website includes that dependency.

These conflicts are follow-up work for the native repository. No source evidence is missing for a current website entry; future behavior changes must trigger another review. A matching metadata fingerprint does not detect every implementation change.

`helpStatus: reviewed` records the implementation check; it does not replace maintainer approval to publish AI-assisted prose. Nothing in this change publishes the website.

## Verification

- Strict export: 73 entries, zero needing extended-help review.
- Production build and TypeScript check: passed.
- Node validation/search tests: passed, including complete help and Work in progress search.
- Python exporter tests: passed, including stale-fingerprint invalidation and rejection of malformed status, references and options.
- Existing production preview on port 4173: search, category selection and expanded Warp mode and Audio Output content checked in the browser. The yellow pill is visible and accessible as text; there are no per-entry JSON links. Category transitions remain confined to the list with the existing reduced-motion guard.
- Mobile browser verification remains pending: the available browser interface did not expose viewport resizing, and opening a separate mobile test view was blocked. Responsive CSS was inspected, but that is not a completed mobile browser check.
