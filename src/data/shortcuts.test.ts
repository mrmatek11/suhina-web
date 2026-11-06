import assert from 'node:assert/strict'
import test from 'node:test'
import { categoryList, filterShortcuts, parseShortcuts, presets } from './shortcuts.ts'

export function shortcutFixture() {
  return { schemaVersion: 1, scope: 'default-and-window-actions', entries: [{
    id: 'example.action', name: 'Example action', category: 'Edit', description: 'A test-only action.',
    context: 'Example editor must have focus.', whenToUse: 'To exercise searching.', platformNotes: 'Example system note.',
    sourceFingerprint: 'a'.repeat(64), helpStatus: 'reviewed', bindings: Object.fromEntries(presets.map(preset =>
      [preset, { windows: [['Ctrl', 'B']], linux: [['Ctrl', 'B']], macos: [['Cmd', 'B']] }])) }] }
}

test('shortcut contract rejects incomplete, duplicate and unsupported data', () => {
  const source = shortcutFixture()
  assert.equal(parseShortcuts(source).length, 1)
  const commands = parseShortcuts({ ...source, entries: [{ ...source.entries[0], category: 'Commands' }] })
  assert.equal(filterShortcuts(commands, 'Commands', '', 'Select-first', 'windows').length, 1)
  assert.throws(() => parseShortcuts({ ...source, schemaVersion: 2 }))
  assert.throws(() => parseShortcuts({ ...source, scope: 'all-actions' }))
  assert.throws(() => parseShortcuts({ ...source, entries: [] }))
  assert.throws(() => parseShortcuts({ ...source, entries: [...source.entries, ...source.entries] }))
  for (const patch of [{ context: '' }, { helpStatus: 'needs-review' }, { sourceFingerprint: 'bad' },
    { category: '' }, { category: 'x'.repeat(65) }, { bindings: {} }, { bindings: { ...source.entries[0]!.bindings, 'Select-first': { windows: [[]] } } }]) {
    assert.throws(() => parseShortcuts({ ...source, entries: [{ ...source.entries[0], ...patch }] }))
  }
})

test('a category the website does not know yet still loads and is listed after the known ones', () => {
  const source = shortcutFixture()
  const entry = source.entries[0]!
  const entries = parseShortcuts({ ...source, entries: [
    { ...entry, id: 'a', category: 'Mixer' }, { ...entry, id: 'b', category: 'Launcher' }, { ...entry, id: 'c', category: 'File' },
  ] })
  assert.deepEqual(categoryList(entries), ['File', 'Launcher', 'Mixer'])
  assert.equal(filterShortcuts(entries, 'Mixer', '', 'Select-first', 'windows').length, 1)
})

test('shortcut search combines key tokens, context and category for the chosen OS and preset', () => {
  const entries = parseShortcuts(shortcutFixture())
  assert.equal(filterShortcuts(entries, 'Edit', 'Ctrl+B focus', 'Select-first', 'windows').length, 1)
  assert.equal(filterShortcuts(entries, 'Edit', '⌘ B', 'Select-first', 'macos').length, 1)
  assert.equal(filterShortcuts(entries, 'View', '', 'Select-first', 'windows').length, 0)
  assert.equal(filterShortcuts(entries, 'All', 'missing', 'Select-first', 'windows').length, 0)
  assert.equal(filterShortcuts(entries, 'All', 'Ctrl+Shift+B', 'Select-first', 'windows').length, 0)
  entries[0]!.bindings['Draw-first'].windows = []
  assert.equal(filterShortcuts(entries, 'All', 'unbound', 'Draw-first', 'windows').length, 1)
  assert.equal(filterShortcuts(entries, 'All', 'unbound', 'Select-first', 'windows').length, 0)
})
