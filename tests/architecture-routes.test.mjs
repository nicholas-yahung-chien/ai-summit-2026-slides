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

test('entry and routing nodes sit on their intended architecture boundaries', () => {
  assert.equal(model.nodes.ingress.parent, 'cluster')
  assert.equal(model.nodes.ingress.y + model.nodes.ingress.h / 2, 0)
  assert.equal(model.nodes.ingress.kind, 'BoundaryInterface')
  assert.equal(model.nodes.ingress.w, model.nodes.router.w)
  assert.equal(model.nodes.ingress.h, model.nodes.router.h)

  assert.equal(model.nodes.zproxy.parent, 'ppz')
  assert.equal(model.nodes.zproxy.y + model.nodes.zproxy.h / 2, 0)

  assert.equal(model.nodes.router.parent, 'service')
  assert.equal(model.nodes.router.x + model.nodes.router.w / 2, model.nodes.service.w)
})

test('Inference Service and Model Gateway converge on the boundary router before hosting options', () => {
  const routes = buildArchitectureRoutes(model.edges)
  const routeKeys = new Set(routes.map(route => route.key))
  for (const key of ['inference->router', 'bifrost->router', 'router->local', 'router->public', 'router->private'])
    assert.ok(routeKeys.has(key), key)
  for (const key of ['bifrost->local', 'bifrost->public', 'bifrost->private'])
    assert.ok(!routeKeys.has(key), key)

  const byKey = new Map(routes.map(route => [route.key, route]))
  assert.match(byKey.get('inference->router').d, /H1175$/)
  assert.match(byKey.get('bifrost->router').d, /H1175$/)
  for (const key of ['router->local', 'router->public', 'router->private'])
    assert.match(byKey.get(key).d, /^M1235 455/)
})
