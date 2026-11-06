/**
 * Suhina's Settings pages, in the order its Settings list shows them, with their names
 * (`Page::ALL` in crates/ui/src/settings/settings_view.rs). The export names a page by its id. A page
 * missing here still loads: it is named from its id and listed after these, so a new page in
 * Suhina never stops the website from following main. Add it here to give it its own name.
 */
export const pages: Readonly<Record<string, string>> = {
  Projects: 'Projects and backups', Audio: 'Audio', Midi: 'MIDI', Plugins: 'Plug-ins',
  Devices: 'Devices', Importing: 'Importing', Arrangement: 'Arrangement', Session: 'Launcher and mixer',
  ClipEditor: 'Clip editor', Browser: 'Browser', Keys: 'Keys', Appearance: 'Appearance',
  Theme: 'Themes', Agents: 'Agents and updates',
}

/** Pages Suhina has since renamed or merged, so that an old `?category=` link still lands somewhere. */
const formerPages: Readonly<Record<string, string>> = {
  General: 'Projects', Transport: 'Arrangement', DetailArea: 'Devices', Shortcuts: 'Keys',
}

/** A page id from the export, such as `ClipEditor`. */
export type Page = string
/** `All` or a page id. */
export type Category = string

const pageId = /^[A-Z][A-Za-z0-9]{0,63}$/

/** The name a page goes by: its own, or for a page this list does not know yet, its id in words. */
export function pageLabel(page: Page): string {
  if (Object.hasOwn(pages, page)) return pages[page]!
  const words = page.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ')
  return [words[0], ...words.slice(1).map(word => word.toLowerCase())].join(' ')
}

/**
 * The pages to offer as categories: those the settings use, known ones in Suhina's order and then any
 * others. Before any settings have loaded, every known page.
 */
export function pageList(settings: readonly Setting[]): Page[] {
  const known = Object.keys(pages)
  if (!settings.length) return known
  const used = new Set(settings.map(row => row.page))
  return [...known.filter(page => used.has(page)), ...[...used].filter(page => !Object.hasOwn(pages, page))]
}

/** The category a `?category=` value asks for, following renamed pages; anything else shows all. */
export function categoryFromQuery(value: string | null): Category {
  if (!value) return 'All'
  if (Object.hasOwn(pages, value)) return value
  return Object.hasOwn(formerPages, value) ? formerPages[value]! : 'All'
}
export interface SettingOption { name: string; description: string }
export interface Setting {
  id: string
  page: Page
  section: string
  name: string
  note: string
  keys: string[]
  sourceFingerprint: string
  helpStatus: 'reviewed' | 'needs-review'
  description: string
  options: SettingOption[]
  whenToChange: string
  workInProgress: boolean
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function parseSettings(value: unknown): Setting[] {
  if (!Array.isArray(value)) throw new Error('Settings must be an array.')
  const ids = new Set<string>()
  return value.map((row: unknown) => {
    if (!isRecord(row) || !['id', 'page', 'section', 'name', 'note', 'sourceFingerprint', 'description', 'whenToChange']
      .every(key => typeof row[key] === 'string')
      || typeof row.page !== 'string' || !pageId.test(row.page)
      || (row.helpStatus !== 'reviewed' && row.helpStatus !== 'needs-review')
      || typeof row.workInProgress !== 'boolean'
      || !Array.isArray(row.keys) || !row.keys.every(key => typeof key === 'string')
      || !Array.isArray(row.options) || !row.options.every(option => isRecord(option) && typeof option.name === 'string' && typeof option.description === 'string')) {
      throw new Error('Invalid settings entry.')
    }
    const setting = row as unknown as Setting
    if (!setting.id || ids.has(setting.id)) throw new Error('Duplicate or empty setting ID.')
    ids.add(setting.id)
    return setting
  })
}

export function filterSettings(settings: Setting[], category: Category, query: string): Setting[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return settings.filter(row => {
    if (category !== 'All' && row.page !== category) return false
    const text = [pageLabel(row.page), row.section, row.name, row.note, row.description,
      row.whenToChange, row.workInProgress ? 'Work in progress' : '', ...row.keys, ...row.options.flatMap(option => [option.name, option.description])].join(' ').toLowerCase()
    return words.every(word => text.includes(word))
  })
}
