const geometryByEdge = Object.freeze({
  'admincli->operator': { d: 'M175 228 V401' },
  'admincli->crd': { d: 'M175 270 H360 V401' },
  'operator->crd': { d: 'M260 432 H305' },
  'ide->ingress': { d: 'M500 228 V270 H737 V401' },
  'cli->ingress': { d: 'M760 228 V270', arrow: false },
  'dashboard->ingress': { d: 'M1020 228 V270 H737', arrow: false },
  'zui->ingress': { d: 'M1280 228 V270 H737', arrow: false },
  'ingress->gateway': { d: 'M737 463 V503' },
  'auth->authz': { d: 'M290 534 H320 V506 H345' },
  'auth->authn': { d: 'M320 534 V577 H345' },
  'authz->gateway': { d: 'M525 506 H565 V543 H620' },
  'authn->gateway': { d: 'M525 577 H565 V543', arrow: false },
  'gateway->inference': { d: 'M855 520 H895 V446 H965' },
  'gateway->bifrost': { d: 'M855 543 H965' },
  'gateway->zproxy': { d: 'M737 583 V638 H677 V665' },
  'gateway->metrics': { d: 'M700 583 V620 H457 V647' },
  'gateway->bobadmin': { d: 'M620 560 H590 V625 H185 V655' },
  'auth->bobadmin': { d: 'M185 565 V655' },
  'ragproxy->ragmcp': { d: 'M818 695 H828' },
  'gateway->zu': { d: 'M835 583 V608 H950 V747 H692 V757' },
  'gateway->zr': { d: 'M950 747 H857 V757' },
  'bifrost->audit': { d: 'M1077 580.5 V665' },
  'bifrost->local': { d: 'M1190 543 H1220 V437.5 H1345 V520' },
  'bifrost->public': { d: 'M1190 543 H1220 V437.5 H1545' },
  'bifrost->private': { d: 'M1190 543 H1220 V437.5 H1500 V642 H1545' },
  'auth->authdb': { d: 'M80 534 H65 V823 H154.5 V868' },
  'bobadmin->admindb': { d: 'M185 717 V823 H328.5 V868' },
  'metrics->sink': { d: 'M457.5 725 V823 H502.5 V868' },
  'zu->db2': { d: 'M692.5 799 V823 H676.5 V868' },
  'zr->search': { d: 'M857.5 799 V823 H850.5 V868' },
  'audit->vector': { d: 'M1077.5 727 V823 H1024.5 V868' },
  'audit->pg': { d: 'M1077.5 727 V823 H1198.5 V868' },
  'audit->redis': { d: 'M1077.5 727 V823 H1372.5 V868' },
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
