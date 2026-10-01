const geometryByEdge = Object.freeze({
  'admincli->operator': { d: 'M165 212 V405', role: 'management' },
  'admincli->crd': { d: 'M165 212 V330 H325 V405', role: 'management' },
  'operator->crd': { d: 'M245 430 H275', role: 'management' },
  'ide->ingress': { d: 'M430 212 V235 H675 V260', role: 'primary' },
  'cli->ingress': { d: 'M675 212 V235', arrow: false, role: 'primary' },
  'dashboard->ingress': { d: 'M930 212 V235 H675', arrow: false, role: 'primary' },
  'zui->ingress': { d: 'M1180 212 V235 H675', arrow: false, role: 'primary' },
  'ingress->gateway': { d: 'M675 320 V485', role: 'primary' },
  'auth->authz': { d: 'M270 522 H285 V497 H300', role: 'security' },
  'auth->authn': { d: 'M285 522 V557 H300', role: 'security' },
  'authz->gateway': { d: 'M460 497 H520 V520 H575', role: 'security' },
  'authn->gateway': { d: 'M460 557 H520 V520', arrow: false, role: 'security' },
  'gateway->inference': { d: 'M775 500 H840 V436 H920', role: 'primary' },
  'gateway->bifrost': { d: 'M775 542 H920', role: 'primary' },
  'gateway->zproxy': { d: 'M675 555 V565', role: 'extension' },
  'gateway->metrics': { d: 'M610 555 V580 H500 V640 H395 V660', role: 'management' },
  'gateway->bobadmin': { d: 'M610 555 V570 H480 V625 H175 V670', role: 'management' },
  'auth->bobadmin': { d: 'M175 549 V670', role: 'management' },
  'zproxy->ragproxy': { d: 'M675 615 V625 H662.5 V640', role: 'extension' },
  'ragproxy->ragmcp': { d: 'M710 668 H750', role: 'extension' },
  'zproxy->zu': { d: 'M675 615 V710 H640 V725', role: 'extension' },
  'zproxy->zr': { d: 'M675 615 V710 H805 V725', role: 'extension' },
  'bifrost->audit': { d: 'M1015 574 V670', role: 'data' },
  'inference->router': { d: 'M1110 436 H1140 V485 H1175', role: 'primary' },
  'bifrost->router': { d: 'M1110 542 H1140 V485 H1175', role: 'primary' },
  'router->local': { d: 'M1235 485 H1270 V530 H1355 V550', role: 'primary' },
  'router->public': { d: 'M1235 485 H1500 V450 H1545', role: 'primary' },
  'router->private': { d: 'M1235 485 H1500 V645 H1545', role: 'primary' },
  'auth->authdb': { d: 'M80 522 H65 V810 H150 V868', role: 'data' },
  'bobadmin->admindb': { d: 'M175 724 V810 H325 V868', role: 'data' },
  'metrics->sink': { d: 'M395 728 V810 H485 V868', role: 'data' },
  'zu->db2': { d: 'M640 765 V868', role: 'data' },
  'zr->search': { d: 'M805 765 V868', role: 'data' },
  'audit->vector': { d: 'M1015 726 V810 H985 V868', role: 'data' },
  'audit->pg': { d: 'M1015 726 V810 H1155 V868', role: 'data' },
  'audit->redis': { d: 'M1015 726 V810 H1325 V868', role: 'data' },
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
