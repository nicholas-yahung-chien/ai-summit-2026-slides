<script setup lang="ts">
import model from './bob-onprem-model.json'
import postgres from '../assets/architecture-logos/postgresql.svg'
import keycloak from '../assets/architecture-logos/keycloak.svg'
import opensearch from '../assets/architecture-logos/opensearch.svg'
import openshift from '../assets/architecture-logos/openshift.svg'
import bob from '../assets/architecture-logos/bob-mascot.webp'
import redis from '../assets/architecture-logos/redis.svg'
import db2 from '../assets/architecture-logos/ibm-db2.svg'
import { buildArchitectureRoutes } from './bob-onprem-routes.mjs'

const containers = ['front', 'cluster', 'service', 'data', 'ext', 'ppz']
const source = model.nodes as Record<string, any>
function position(id: string): { x: number, y: number } {
  const node = source[id]
  const parent = node.parent === '1' ? { x: 0, y: 0 } : position(node.parent)
  return { x: parent.x + node.x, y: parent.y + node.y }
}
const nodes = Object.entries(source).map(([id, node]) => ({ id, ...node, ...position(id) }))
const groups = nodes.filter(n => containers.includes(n.id))
const components = nodes.filter(n => !containers.includes(n.id) && n.parent !== 'data')
const dataDefinitions = [
  { id:'authdb', title:'PostgreSQL', lines:['Auth config', '& sessions'], logo:postgres },
  { id:'admindb', title:'PostgreSQL', lines:['Bobalytics', 'Admin & config'], logo:postgres },
  { id:'sink', title:'Sink', lines:['Metrics'], logo:null },
  { id:'db2', title:'IBM Db2', lines:['Z Understand', 'data'], logo:db2 },
  { id:'search', title:'OpenSearch', lines:['RAG corpus'], logo:opensearch },
  { id:'vector', title:'Vector', lines:['Audit data'], logo:null },
  { id:'pg', title:'Postgres', lines:['Telemetry', 'storage'], logo:postgres },
  { id:'redis', title:'Redis', lines:['Telemetry', 'cache'], logo:redis },
]
const data = dataDefinitions.map(item => ({ ...item, ...nodes.find(node => node.id === item.id) }))
const routes = buildArchitectureRoutes(model.edges)
const logos: Record<string,string> = { ide:bob, auth:keycloak }
function isCircularBoundary(node: any) { return ['Router', 'BoundaryInterface'].includes(node.kind) }
function hasNotation(node: any) { return !logos[node.id] && node.id !== 'crd' && node.kind !== 'Node' && !isCircularBoundary(node) }
function hasGenericDatabaseIcon(item: any) { return ['sink', 'vector'].includes(item.id) }
function dataTitleX(item: any) {
  return item.logo || hasGenericDatabaseIcon(item) ? item.w * .64 : item.w / 2
}
function lineHeight(node: any) { return isCircularBoundary(node) ? 16 : node.parent === 'ppz' || ['zu','zr'].includes(node.id) ? 17 : node.id === 'metrics' ? 20 : 24 }
function lines(node: any) {
  if (node.id === 'ide') return ['IBM Bob IDE']
  if (node.id === 'auth') return ['Auth Server']
  if (node.id === 'local') return ['OPTION 1 · OpenShift AI', 'Local Models', 'All Modes']
  if (node.id === 'metrics') return ['Metrics Collector', 'Open Metrics', 'Forwarder']
  if (node.id === 'ragproxy') return ['Z RAG', 'server', 'proxy']
  if (node.id === 'ragmcp') return ['Z RAG', 'MCP', 'Server']
  if (node.id === 'zu') return ['Z Understand']
  if (node.id === 'zr') return ['Z Refactor']
  if (node.id === 'ingress') return ['Cluster', 'Ingress']
  if (node.id === 'router') return ['Bifrost', 'Router']
  return node.label.split('\n')
}
function textY(node: any) {
  if (node.id === 'auth') return node.y + 23
  if (isCircularBoundary(node)) return node.y + node.h / 2 - 7
  return node.y + node.h / 2 - (lines(node).length - 1) * lineHeight(node) / 2 + (node.parent === 'ppz' ? 5 : 6)
}
function textX(node: any) { return node.x + node.w / 2 + (node.id === 'ide' ? 30 : hasNotation(node) ? 13 : 0) }
</script>

<template>
  <section class="bob-architecture" aria-label="IBM Bob On-premise 架構">
    <header><h1>IBM Bob 的企業內部部署架構</h1></header>
    <svg class="architecture-canvas" viewBox="25 105 1865 870" role="img" aria-labelledby="bob-architecture-title">
      <title id="bob-architecture-title">IBM Bob：前端、OpenShift 服務與資料層，以及三種模型部署選項</title>
      <defs>
        <marker id="bob-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="context-stroke" stroke-width="1.5" /></marker>
        <g id="bob-component"><path d="M4 0H17V19H4 M0 4H8V9H0Z M0 12H8V17H0Z" fill="none" stroke="currentColor" stroke-width="1.3" /></g>
        <g id="bob-database"><ellipse cx="11" cy="4" rx="9" ry="3" /><path d="M2 4V17C2 18.7 6 20 11 20S20 18.7 20 17V4 M2 10C2 11.7 6 13 11 13S20 11.7 20 10 M2 16C2 17.7 6 19 11 19S20 17.7 20 16" /></g>
      </defs>
      <g v-for="group in groups" :key="group.id" :class="['boundary',group.id]">
        <rect :x="group.x" :y="group.y" :width="group.w" :height="group.h" rx="9" :fill="group.fill" />
        <text :x="group.id === 'cluster' ? 820 : group.x+18" :y="group.y+29">{{ group.label }}</text>
        <image v-if="group.id==='cluster'" :href="openshift" :x="group.x+1200" :y="group.y+7" width="180" height="38" />
      </g>
      <g class="service-guides" aria-hidden="true">
        <path d="M520 382 V790 M900 382 V790" />
        <text x="80" y="390">MANAGEMENT &amp; SECURITY</text>
        <text x="545" y="390">API &amp; EXTENSIONS</text>
        <text x="920" y="390">INFERENCE &amp; GOVERNANCE</text>
      </g>
      <g class="connections">
        <path v-for="edge in routes" :key="edge.key" :data-edge="edge.key" :d="edge.d" :class="edge.role" :marker-end="edge.arrow ? 'url(#bob-arrow)' : undefined">
          <title>{{ edge.source }} → {{ edge.target }}</title>
        </path>
      </g>
      <g v-for="node in components" :key="node.id" :data-component="node.id" class="component">
        <circle v-if="isCircularBoundary(node)" :cx="node.x+node.w/2" :cy="node.y+node.h/2" :r="node.w/2" :fill="node.fill || '#edf3fc'" :class="{ 'router-shape': node.id==='router' }" />
        <rect v-else :x="node.x" :y="node.y" :width="node.w" :height="node.h" rx="3" :fill="node.fill || (node.kind==='DataObject' ? '#eee5f4' : '#edf3fc')" />
        <use v-if="hasNotation(node)" href="#bob-component" :transform="`translate(${node.x+8} ${node.y+node.h/2-7}) scale(.72)`" class="notation" />
        <image v-if="node.id==='ide'" :href="bob" :x="node.x+12" :y="node.y+3" width="48" :height="node.h-6" />
        <image v-if="node.id==='auth'" :href="keycloak" :x="node.x+22" :y="node.y+32" :width="node.w-44" height="24" />
        <text :x="textX(node)" :y="textY(node)" :class="{ compact:node.parent==='ppz', narrow:['zu','zr'].includes(node.id), hosting:node.kind==='Node', router:isCircularBoundary(node) }">
          <tspan v-for="(line,i) in lines(node)" :key="i" :x="textX(node)" :dy="i ? lineHeight(node) : 0">{{ line }}</tspan>
        </text>
      </g>
      <g v-for="item in data" :key="item.id" :data-component="item.id" class="data-item" :transform="`translate(${item.x},${item.y})`">
        <rect :width="item.w" :height="item.h" rx="3" />
        <svg v-if="item.id === 'redis'" x="8" y="5" width="38" height="32" viewBox="0 0 100 87.8" aria-label="Redis logo"><image :href="item.logo!" width="357.8" height="87.8" /></svg>
        <image v-if="item.logo && item.title !== 'OpenSearch' && item.id !== 'redis'" :href="item.logo" x="10" y="7" width="30" height="26" />
        <image v-if="item.title === 'OpenSearch'" :href="item.logo!" x="10" y="8" :width="item.w-20" height="23" />
        <use v-if="hasGenericDatabaseIcon(item)" href="#bob-database" transform="translate(11 8)" class="data-generic-icon" />
        <text v-if="item.title !== 'OpenSearch'" :x="dataTitleX(item)" y="26" class="data-title">{{ item.title }}</text>
        <text :x="item.w/2" :y="item.lines.length===1 ? 58 : 51"><tspan v-for="(line,j) in item.lines" :key="j" :x="item.w/2" :dy="j ? 16 : 0">{{ line }}</tspan></text>
      </g>
      <text x="1545" y="213" class="routing-label"><tspan x="1545">Bifrost configuration</tspan><tspan x="1545" dy="28">routes to 3 hosting options</tspan></text>
    </svg>
    <div class="architecture-meta"><div class="legend"><span><i class="application" />Application</span><span><i class="technology" />Technology</span><span><i class="ppz" />PPZ</span><span><i class="management" />Deployment management</span><span><i class="flow primary" />Main flow</span><span><i class="flow control" />Control</span><span><i class="flow storage" />Storage</span></div><span>K8s cluster support: future</span></div>
  </section>
</template>

<style scoped>
.bob-architecture { position:absolute; inset:0; color:#161616; }
header { position:absolute; top:26px; left:72px; right:72px; }
.bob-architecture header h1 { font-size:46px; line-height:1.22; margin:0; font-weight:700; letter-spacing:-.04em; }
.architecture-canvas { position:absolute; top:94px; left:16px; width:calc(100% - 32px); height:522px; overflow:visible; font-family:'IBM Plex Sans','Noto Sans TC',sans-serif; }
.boundary rect { stroke:#bac7d2; stroke-width:1.3; }
.boundary.cluster rect { stroke:#8ba999; }
.boundary text { font-size:18px; font-weight:600; fill:#344b60; }
.service-guides path { fill:none; stroke:#d8e0e8; stroke-width:1; stroke-dasharray:5 7; }
.service-guides text { fill:#607589; font-size:13px; font-weight:600; letter-spacing:.08em; }
.connections path { fill:none; stroke:#526779; stroke-width:1.6; }
.connections path.primary { stroke:#0f62fe; stroke-width:2.2; }
.connections path.security { stroke:#486b7d; stroke-width:1.7; }
.connections path.management { stroke:#8a6d3b; stroke-width:1.5; stroke-dasharray:6 5; }
.connections path.extension { stroke:#6929c4; stroke-width:1.8; }
.connections path.data { stroke:#70808e; stroke-width:1.35; }
.component rect { stroke:#a4b8cd; stroke-width:1.2; }
.component circle { stroke:#a4b8cd; stroke-width:1.4; }
.component circle.router-shape { stroke:#f1c21b; }
.component text { fill:#182c40; font-size:18px; text-anchor:middle; }
.component text.compact { font-size:13px; }
.component text.narrow { font-size:15px; }
.component text.hosting { font-size:17px; }
.component text.router { font-size:13px; font-weight:600; }
.notation { color:#7890a5; }
.data-item rect { fill:#eef7f1; stroke:#a7bfb0; }
.data-item text { text-anchor:middle; font-size:13px; fill:#243d33; }
.data-item .data-title { font-weight:600; font-size:15px; }
.data-generic-icon { fill:none; stroke:#526779; stroke-width:1.45; }
.routing-label { font-size:18px; fill:#0f62fe; font-weight:500; }
.architecture-meta { position:absolute; left:72px; right:72px; bottom:78px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#525252; }
.legend { display:flex; gap:16px; }
.legend span { display:flex; align-items:center; gap:6px; }
.legend i { width:12px; height:9px; border:1px solid #b8c3cc; }
.application { background:#edf3fc; }.technology { background:#def0e2; }.ppz { background:#e0e5ff; }.management { background:#fff1d6; }
.legend i.flow { width:18px; height:0; border:0; border-top:2px solid; }
.legend i.flow.primary { border-color:#0f62fe; }
.legend i.flow.control { border-color:#8a6d3b; border-top-style:dashed; }
.legend i.flow.storage { border-color:#70808e; }
</style>
