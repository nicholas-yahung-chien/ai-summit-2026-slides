const geometryByEdge = Object.freeze({
  'admincli->operator': { d: 'M175 228 V401' },
  'admincli->crd': { d: 'M175 270 H360 V401' },
  'operator->crd': { d: 'M260 432 H305' },
  'ide->ingress': { d: 'M500 228 V245 H737.5 V260' },
  'cli->ingress': { d: 'M760 228 V245 H737.5', arrow: false },
  'dashboard->ingress': { d: 'M1020 228 V245 H737.5', arrow: false },
  'zui->ingress': { d: 'M1280 228 V245 H737.5', arrow: false },
  'ingress->gateway': { d: 'M737.5 320 V508' },
  'auth->authz': { d: 'M290 534 H320 V506 H345' },
  'auth->authn': { d: 'M320 534 V577 H345' },
  'authz->gateway': { d: 'M525 506 H565 V543 H627.5' },
  'authn->gateway': { d: 'M525 577 H565 V543', arrow: false },
  'gateway->inference': { d: 'M847.5 523 H885 V446 H925' },
  'gateway->bifrost': { d: 'M847.5 543 H925' },
  'gateway->zproxy': { d: 'M775 578 V595' },
  'gateway->metrics': { d: 'M700 578 V620 H457 V647' },
  'gateway->bobadmin': { d: 'M627.5 560 H590 V625 H185 V655' },
  'auth->bobadmin': { d: 'M185 565 V655' },
  'zproxy->ragproxy': { d: 'M775 645 V669' },
  'ragproxy->ragmcp': { d: 'M813 695 H833' },
  'zproxy->zu': { d: 'M775 645 V740 H692.5 V759' },
  'zproxy->zr': { d: 'M775 645 V740 H857.5 V759' },
  'bifrost->audit': { d: 'M1030 577 V668' },
  'inference->router': { d: 'M1135 446 H1155 V455 H1175' },
  'bifrost->router': { d: 'M1135 543 H1155 V455 H1175' },
  'router->local': { d: 'M1235 455 H1260 V500 H1345 V527.5' },
  'router->public': { d: 'M1235 455 H1500 V437.5 H1555' },
  'router->private': { d: 'M1235 455 H1500 V642.5 H1555' },
  'auth->authdb': { d: 'M80 534 H65 V823 H154.5 V868' },
  'bobadmin->admindb': { d: 'M185 717 V823 H328.5 V868' },
  'metrics->sink': { d: 'M457.5 725 V823 H502.5 V868' },
  'zu->db2': { d: 'M692.5 797 V823 H676.5 V868' },
  'zr->search': { d: 'M857.5 797 V823 H850.5 V868' },
  'audit->vector': { d: 'M1030 724 V823 H1024.5 V868' },
  'audit->pg': { d: 'M1030 724 V823 H1198.5 V868' },
  'audit->redis': { d: 'M1030 724 V823 H1372.5 V868' },
})

export function edgeKey(source, target) {
  return `${source}->${target}`
}

export function buildArchitectureRoutes(edges) {
  const seen = new Set()
  const routes = edges.map((edge) => {
    if (!Array.isArray(edge) || edge.length < 2)
      throw new Error('Every architecture edge must contain a source and target')

    const [source, target] = edge
    const key = edgeKey(source, target)
    if (seen.has(key))
      throw new Error(`Duplicate architecture edge: ${key}`)
    seen.add(key)

    const geometry = geometryByEdge[key]
    if (!geometry)
      throw new Error(`Missing SVG route for architecture edge: ${key}`)

    return { key, source, target, arrow: geometry.arrow !== false, ...geometry }
  })

  const orphanedGeometry = Object.keys(geometryByEdge).filter(key => !seen.has(key))
  if (orphanedGeometry.length)
    throw new Error(`SVG routes without architecture edges: ${orphanedGeometry.join(', ')}`)

  return routes
}

export { geometryByEdge }
