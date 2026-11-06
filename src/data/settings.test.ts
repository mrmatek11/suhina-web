import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { categoryFromQuery, filterSettings, pageLabel, pageList, pages, parseSettings } from './settings.ts'

const source: unknown = JSON.parse(readFileSync(new URL('../../public/settings.json', import.meta.url), 'utf8'))
const settings = parseSettings(source)

test('published data is valid and includes reviewed help', () => {
  assert.ok(settings.length > 0)
  const reviewed = settings.find(row => row.keys.includes('open_projects'))
  assert.equal(reviewed?.helpStatus, 'reviewed')
  assert.ok(reviewed?.options.some(option => option.name === 'New tab'))
  assert.ok(settings.every(row => row.helpStatus === 'reviewed' && row.description.trim() && row.whenToChange.trim()))
})

test('search combines words, searches extended help, and respects categories', () => {
  // Pages are read from the data, since Suhina moves settings between pages.
  const projects = settings.find(row => row.keys.includes('open_projects'))!.page
  const audio = settings.find(row => row.keys.includes('audio_host'))!.page
  assert.ok(filterSettings(settings, projects, 'comparing projects').some(row => row.keys.includes('open_projects')))
  assert.equal(filterSettings(settings, audio, 'comparing projects').length, 0)
  assert.ok(filterSettings(settings, 'All', 'OPEN_PROJECTS').length > 0)
  assert.equal(filterSettings(settings, 'All', 'xyz-no-such-setting').length, 0)
  assert.equal(filterSettings(settings, 'All', '   ').length, settings.length)
  // Every flagged setting is found by the pill's words; prose may use the same words too.
  const inProgress = filterSettings(settings, 'All', 'work in progress')
  const flagged = settings.filter(row => row.workInProgress)
  assert.ok(flagged.length > 0)
  assert.ok(flagged.every(row => inProgress.includes(row)))
  assert.ok(filterSettings(settings, audio, 'exclusive input').some(row => row.keys.includes('audio_host')))
})

test('invalid structure and duplicate IDs are rejected', () => {
  assert.throws(() => parseSettings({}), /array/)
  for (const page of ['', 'lowercase', '<script>', 'A'.repeat(65), 7]) {
    assert.throws(() => parseSettings([{ ...settings[0], page }]), /Invalid/, String(page))
  }
  assert.throws(() => parseSettings([{ ...settings[0], options: [null] }]), /Invalid/)
  assert.throws(() => parseSettings([{ ...settings[0], workInProgress: 'yes' }]), /Invalid/)
  assert.throws(() => parseSettings([settings[0], settings[0]]), /Duplicate/)
})

test('a page the website does not know yet still loads, named from its id and listed last', () => {
  const [first] = parseSettings([{ ...settings[0], page: 'NewThingsPage' }])
  assert.equal(first!.page, 'NewThingsPage')
  assert.equal(pageLabel('NewThingsPage'), 'New things page')
  assert.equal(pageLabel('ClipEditor'), 'Clip editor')
  assert.equal(pageLabel('Session'), 'Launcher and mixer')
  assert.deepEqual(pageList([first!, { ...first!, id: 'b', page: 'Audio' }, { ...first!, id: 'c', page: 'Projects' }]),
    ['Projects', 'Audio', 'NewThingsPage'])
  assert.deepEqual(pageList([]), Object.keys(pages))
  assert.ok(filterSettings([first!], 'All', 'new things').length === 1)
})

test('category links follow renamed pages and ignore anything else', () => {
  assert.equal(categoryFromQuery('Audio'), 'Audio')
  assert.equal(categoryFromQuery('General'), 'Projects')
  assert.equal(categoryFromQuery('Shortcuts'), 'Keys')
  assert.equal(categoryFromQuery('NoSuchPage'), 'All')
  assert.equal(categoryFromQuery('constructor'), 'All')
  assert.equal(categoryFromQuery(null), 'All')
})
