# Versioned settings and shortcut documentation

Status: slices 1–3 and the main-only synchronization are live on suhina.org: the settings and shortcut exports are written and reviewed in the Suhina repository and the website follows its main branch. The richer versioned envelope, implementation status field and archived version selection below remain future work. The README describes the current setup.

## Ownership and source

Maintain the setting catalog, action catalog and authored English explanations in the Suhina repository. The website consumes a reviewed export; it must not maintain a second independent description of native behavior. As clarified by the user, human content review happens once, in the DAW repository alongside the implementation. The web repository performs technical validation, not another content approval. Keep the product introduction and beginner guides in the website repository and preserve the current Vue design.

Suggested native layout:

- `docs/guide-data/settings-help.json`: migrate the current authored help with its references and fingerprints.
- `docs/guide-data/shortcuts-help.json`: action explanations keyed by stable action ID.
- `docs/guide-data/schemas/`: JSON Schemas for authored input and exported contracts.
- A native exporter reading the actual setting and action registries, defaults, options and visibility conditions. Prefer a machine-readable registry/API over parsing Rust source with regular expressions.

The current exporter derives IDs from page, section and saved keys. Moving a setting therefore changes its ID. Introduce an explicit stable documentation ID before moving ownership; include old IDs as aliases where necessary. Read-only rows and multi-control panels need IDs too. Do not change a native saved key just to stabilize documentation.

## Export contracts

Produce `settings.json` and `shortcuts.json` together for a specific application revision. Each file should use an envelope with `schemaVersion`, `appVersion`, `sourceCommit`, `contentRevision` and `entries`. A dirty source checkout must be marked as a local preview and cannot create a release export. Keep output deterministic: no changing timestamps in ordinary regeneration.

Settings entries need stable ID, native location, label, summary, saved keys, control kind, typed default, choices, visibility/dependency conditions, description, when-to-change guidance, implementation status and evidence fingerprint. Represent each control in a multi-control panel explicitly, while retaining its panel grouping for display. Distinguish an unavailable feature from an unavailable platform/device capability.

Shortcut entries need:

- Stable action ID and visible action name.
- Plain-language description of the visible result.
- Category and contexts in which it works, including focus requirements, selection requirements and precedence over other bindings.
- Default bindings per preset and operating system, represented as key/modifier tokens rather than only a display string.
- Windows, Linux and macOS differences, including Ctrl/Cmd, Alt/Option, unsupported combinations and platform-only actions.
- Workflow-preset effects, mouse gestures where relevant, implementation status, source references and evidence fingerprints.

Do not derive an explanation from an action ID or a binding alone. Some UI actions operate on the current selection and do not correspond one-to-one with engine commands. Export those context rules as well as command-backed actions. An intentionally unbound action is valid and distinct from a missing action.

Use a dedicated `implementationStatus` (`available`, `partial`, `planned`) and a user-facing status explanation. The current website’s `workInProgress` boolean is a temporary display field: migrate `partial`/`planned` to the yellow Work in progress pill. Documentation review status remains separate from feature completeness.

References remain contributor evidence. Do not add raw JSON or source-code links to individual setting explanations. All explanatory strings remain plain text and are rendered with Vue interpolation.

## Review and CI gates

1. Native CI validates authored inputs and both exported files against schemas, rejects duplicate/unknown IDs, invalid defaults and options, and verifies registry coverage. Every visible setting/control and documented shortcut action must have nonempty explanation and context; non-choice controls explicitly use an empty options array.
2. Require matching evidence fingerprints for help text. Extend fingerprints beyond labels to include defaults, options, conditions and relevant behavioral sources. A changed implementation still requires human assessment even if the metadata hash is unchanged. Reject orphan help IDs so a removed control cannot leave silently accepted prose.
3. Test representative OS/preset exports and known context-sensitive actions. Test malformed and oversized data in the website validator, including the implementation-status field. Test search over descriptions, options, contexts and status.
4. Export reproducibly from an immutable native revision. Native CI should verify expected output rather than silently rewrite reviewed content. Store schemas with fixtures and explicit compatibility tests; a breaking contract increments `schemaVersion`.
5. A human reviews authored prose and behavior claims in a pull request. AI may prepare drafts and flag stale evidence; it must not set a human approval flag or publish unreviewed content. Restrict merge and release permissions to the intended maintainers.
6. Website CI validates the received export's contract and provenance and runs the website build and tests. Native CI owns registry coverage, fingerprints and content approval. Web CI does not check out the native repository or ask for another human settings review. Until migration, the local authoring command `sync-settings.py --require-help` still needs a matching native checkout; this temporary tool does not belong in the future website publishing gate.

The current `helpStatus: reviewed` means that the author checked the implementation and copied its current fingerprint. It is not proof that a maintainer approved the prose for public release. Keep release approval a separate protected process.

## Transfer and version selection

The implemented first slice commits `docs/guide-data/settings.json` with `schemaVersion: 1` and `entries` in the native repository. Its exporter and required docs tests check coverage and deterministic output in source PRs. The website polls that exact file from official `main` about every 30 minutes, verifies official origin and `origin/main`, and reads the committed Git blob. It records the actual fetched commit in `public/settings-source.json`. Missing or invalid exports fail without replacing site data. The original web help covered 73 UI-branch entries, while the native main migration intentionally contains only its current 61 settings; other controls enter with their native merges and reviewed help.

Polling needs no cross-repository token or source dispatch permission. The website's own workflow token commits validated data updates. Once the initial website publishing configuration is authorized, `PAGES_SYNC_PUBLISH=true` enables automatic deployment in that same synchronization workflow, since commits pushed by the workflow token do not trigger a second push workflow.

For the later shortcuts/version-selector slice, preserve both exports, schemas and a digest manifest per immutable app revision. Optional source push notifications can later replace polling, but must still resolve and consume `main`, never a supplied feature ref. Do not add credentials to either JSON file.

The website synchronization job verifies the source repository, main revision and data contract, then copies the website fields and records provenance in an automated commit. Technical checks run before committing/publishing the changed data. A failed source coverage check prevents the source export from merging through the required native CI. A failed web schema/build check leaves the previous site online. No second content-review PR or human approval is required in the website. Direct AI-authored drafts that have not passed native review cannot enter this path.

The website initially keeps one explicit supported version. Later, a version selector can load archived artifacts without mixing a current settings catalog with shortcuts from an older build. Unsupported schema versions show a useful error rather than partially rendering incorrect instructions. Preserve URLs by stable IDs and aliases.

## Migration slices and acceptance criteria

1. Stabilize the current source registry and IDs; specify version-one schemas with fixtures. Acceptance: every current panel/control and action has a unique identity and a mapped native source.
2. Move settings prose to the native repo in a separately authorized change. Acceptance: all 73 current website entries retain reviewed explanations, references, conditions and feature-status notes; native CI rejects missing/stale help.
3. Export shortcut metadata and write its contextual explanations. Acceptance: complete registry coverage, each preset and supported OS checked, and the reset/preset behavior verified against implementation rather than older prose.
4. Produce immutable artifacts and update the website parser. Acceptance: deterministic exports, schema compatibility tests, a pinned provenance manifest and graceful handling of invalid input.
5. Introduce automatic synchronization from approved native artifacts. Acceptance: source review is the only content approval; the website validates provenance and structure, records an auditable update and deploys after passing technical checks. No credentials or user keymaps are published. The initial decision to enable this publishing path still requires release authorization.

Local user `keymap.json` import is a later feature. If implemented, parse it only in the browser, bound its size, validate its structure and resolve it against the selected app version and preset. Never upload it automatically. Show user overrides and conflicts without altering the official defaults.

## Repository and licensing preparation

The website directory initially had no Git repository on 2026-10-21. Following the user's repository request, the existing private `suhina-daw/suhina-web` repository was verified in the browser and the local directory was initialized on `main` with that URL as `origin`. The user subsequently authorized the initial push. GPL-3.0-or-later metadata and ignore rules are prepared; website deployment remains a separate, unauthorized step. Exclude dependencies, `dist`, environment files, logs and QA screenshots. Preserve all third-party notices and font licenses independently of the website’s own license.

## First shortcut directory

The first implementation exports every default-bound and window action (78 in the checked main revision), including unbound window actions, using schemaVersion 1 and scope `default-and-window-actions`. Parameterless commands without defaults, mouse gestures, custom keymap import and archived app versions remain later work. OS/preset bindings are arrays of key tokens with an explicit empty array for unbound actions. Native coverage tests require descriptions, context, use cases, platform notes, valid references and current fingerprints. The web sync validates both catalogs before writing and preserves the existing main-only and deployment-retry rules. The richer immutable version manifest proposed above is not claimed to be implemented by this slice.
