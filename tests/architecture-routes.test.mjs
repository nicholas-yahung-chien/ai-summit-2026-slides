import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { buildArchitectureRoutes } from '../components/bob-onprem-routes.mjs'

const model = JSON.parse(await readFile(new URL('../components/bob-onprem-model.json', import.meta.url), 'utf8'))

test('every Bob architecture relationship has exactly one rendered SVG route', () => {
  const routes = buildArchitectureRoutes(model.edges)
  assert.equal(routes.length, model.edges.length)
  assert.equal(new Set(routes.map(route => route.key)).size, model.edges.length)
})

test('audit and telemetry stores remain connected to the data plane', () => {
  const routeKeys = new Set(buildArchitectureRoutes(model.edges).map(route => route.key))
  for (const key of ['audit->vector', 'audit->pg', 'audit->redis'])
    assert.ok(routeKeys.has(key), key)
})

test('PPZ owns its tools and zProxy dispatches to each PPZ capability', () => {
  assert.equal(model.nodes.zu.parent, 'ppz')
  assert.equal(model.nodes.zr.parent, 'ppz')

  const routeKeys = new Set(buildArchitectureRoutes(model.edges).map(route => route.key))
  for (const key of ['zproxy->ragproxy', 'zproxy->zu', 'zproxy->zr', 'ragproxy->ragmcp'])
    assert.ok(routeKeys.has(key), key)
  for (const key of ['gateway->zu', 'gateway->zr'])
    assert.ok(!routeKeys.has(key), key)
})
