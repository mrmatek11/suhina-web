/**
 * The order to show shortcut categories in. The export names each action's category; one missing
 * here still loads and is listed after these, so a new category in Suhina never stops the website
 * from following main.
 */
export const shortcutCategories = ['File', 'Transport', 'View', 'Edit', 'Tracks', 'Arrangement', 'Launcher', 'Piano roll', 'Help', 'Commands'] as const
export const presets = ['Select-first', 'Draw-first', 'Mouse-first'] as const
export const platforms = { windows: 'Windows', linux: 'Linux', macos: 'macOS' } as const
export type ShortcutCategory = string
export type Preset = typeof presets[number]
export type Platform = keyof typeof platforms
export type Keys = string[][]
export interface Shortcut {
  id: string
  name: string
  category: ShortcutCategory
  description: string
  context: string
  whenToUse: string
  platformNotes: string
  sourceFingerprint: string
  helpStatus: 'reviewed'
  bindings: Record<Preset, Record<Platform, Keys>>
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
const text = (value: unknown): value is string => typeof value === 'string' && !!value.trim() && value.length <= 16000
function keys(value: unknown): value is Keys {
  return Array.isArray(value) && value.length <= 12 && value.every(chord =>
    Array.isArray(chord) && chord.length > 0 && chord.length <= 5 && chord.every(token => text(token) && token.length <= 32)
    && new Set(chord).size === chord.length)
}

export function parseShortcuts(value: unknown): Shortcut[] {
  if (!record(value) || value.schemaVersion !== 1 || value.scope !== 'default-and-window-actions'
    || !Array.isArray(value.entries) || !value.entries.length || value.entries.length > 10000) {
    throw new Error('Unsupported or empty shortcuts export.')
  }
  const ids = new Set<string>()
  return value.entries.map((entry: unknown) => {
    if (!record(entry) || !['id', 'name', 'category', 'description', 'context', 'whenToUse', 'platformNotes', 'sourceFingerprint'].every(field => text(entry[field]))
      || typeof entry.id !== 'string' || !/^[a-zA-Z][a-zA-Z0-9.]*$/.test(entry.id) || ids.has(entry.id)
      || String(entry.category).length > 64
      || entry.helpStatus !== 'reviewed' || !/^[a-f0-9]{64}$/.test(String(entry.sourceFingerprint))
      || !record(entry.bindings)) throw new Error('Invalid or duplicate shortcut action.')
    const bindings = entry.bindings
    for (const preset of presets) {
      const binding = bindings[preset]
      if (!record(binding) || !Object.keys(platforms).every(platform => Object.hasOwn(binding, platform) && keys(binding[platform]))) {
        throw new Error('Missing or invalid shortcut preset/platform bindings.')
      }
    }
    ids.add(entry.id)
    const cleanBindings = Object.fromEntries(presets.map(preset => [preset, Object.fromEntries(
      Object.keys(platforms).map(platform => [platform,
        ((bindings[preset] as Record<string, Keys>)[platform]!).map(chord => [...chord])]),
    )])) as Shortcut['bindings']
    // Only the validated contract reaches components; references remain contributor data.
    return { id: entry.id, name: entry.name, category: entry.category, description: entry.description,
      context: entry.context, whenToUse: entry.whenToUse, platformNotes: entry.platformNotes,
      sourceFingerprint: entry.sourceFingerprint, helpStatus: entry.helpStatus, bindings: cleanBindings } as Shortcut
  })
}

/** The categories the entries use: the known ones in their order, then any others in the order they appear. */
export function categoryList(entries: readonly Shortcut[]): string[] {
  const used = new Set(entries.map(entry => entry.category))
  const known: readonly string[] = shortcutCategories
  return [...known.filter(category => used.has(category)), ...[...used].filter(category => !known.includes(category))]
}

function searchable(value: string): string {
  return value.toLowerCase().replaceAll('⌘', ' cmd ').replaceAll('⌥', ' option ')
    .replaceAll('↑', ' up ').replaceAll('↓', ' down ').replaceAll('←', ' left ').replaceAll('→', ' right ')
    .replaceAll('+', ' ').replace(/\s+/g, ' ').trim()
}
export function filterShortcuts(entries: Shortcut[], category: string, query: string, preset: Preset, platform: Platform): Shortcut[] {
  const parts = query.trim().split(/\s+/).filter(Boolean)
  const keyQueries = parts.filter(part => part.includes('+')).map(part => searchable(part.replace(/\+\+$/, '+Plus')))
  const words = searchable(parts.filter(part => !part.includes('+')).join(' ')).split(' ').filter(Boolean)
  return entries.filter(entry => {
    if (category !== 'All' && entry.category !== category) return false
    const chords = entry.bindings[preset][platform]
    if (!keyQueries.every(keyQuery => chords.some(chord => searchable(chord.map(key => key === '+' ? 'Plus' : key).join(' ')) === keyQuery))) return false
    const index = searchable([entry.id, entry.name, entry.category, entry.description, entry.context, entry.whenToUse,
      entry.platformNotes, ...chords.map(chord => chord.join(' ')), !chords.length ? 'unbound no default key' : ''].join(' '))
    return words.every(word => index.includes(word))
  })
}
