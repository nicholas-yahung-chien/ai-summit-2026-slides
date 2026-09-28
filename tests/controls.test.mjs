import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseSlideNumber, formatCountdown } from '../lib/controls.mjs'

test('slide jump rejects invalid, fractional, and out-of-range pages', () => {
  for (const input of ['', ' ', 'abc', '2.5', '0', '-1', '9', '1e0', 'Infinity'])
    assert.equal(parseSlideNumber(input, 8), null, input)
  assert.equal(parseSlideNumber('1', 8), 1)
  assert.equal(parseSlideNumber(' 8 ', 8), 8)
})
test('countdown remains readable at start, zero, overtime and hour boundaries', () => {
  assert.equal(formatCountdown(1800, 0), '30:00')
  assert.equal(formatCountdown(1800, 60), '29:00')
  assert.equal(formatCountdown(1800, 1800), '00:00')
  assert.equal(formatCountdown(1800, 1801), '+00:01')
  assert.equal(formatCountdown(3600, 0), '60:00')
})
