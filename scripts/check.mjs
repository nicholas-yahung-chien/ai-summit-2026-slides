import { readFile, access } from 'node:fs/promises'
import assert from 'node:assert/strict'
const deck = await readFile(new URL('../slides.md', import.meta.url), 'utf8')
assert.match(deck, /routerMode: hash/, 'Pages needs hash routing for refreshable slide URLs')
assert.match(deck, /presenter: true/)
assert.match(deck, /timer: countdown/)
assert.match(deck, /provider: none/, 'Use packaged fonts, not a runtime font CDN')
await access(new URL('../layouts/summit.vue', import.meta.url))
await access(new URL('../global-top.vue', import.meta.url))
console.log('Deck configuration and required components verified.')
