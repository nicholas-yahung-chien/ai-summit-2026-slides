<script setup lang="ts">
import model from './bob-onprem-model.json'
import { computed, ref, watch, onUnmounted } from 'vue'
import { useSlideContext } from '@slidev/client'
import postgres from '../assets/architecture-logos/postgresql.svg'
import keycloak from '../assets/architecture-logos/keycloak.svg'
import opensearch from '../assets/architecture-logos/opensearch.svg'
import openshift from '../assets/architecture-logos/openshift.svg'
import bob from '../assets/architecture-logos/bob-mascot.webp'
import redis from '../assets/architecture-logos/redis.svg'
import db2 from '../assets/architecture-logos/ibm-db2.svg'

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
const data = [
  { title:'PostgreSQL', lines:['Auth config', '& sessions'], logo:postgres },
  { title:'PostgreSQL', lines:['Bobalytics', 'Admin & config'], logo:postgres },
  { title:'Sink', lines:['Metrics'], logo:null },
  { title:'IBM Db2', lines:['Z Understand', 'data'], logo:db2 },
  { title:'OpenSearch', lines:['RAG corpus'], logo:opensearch },
  { title:'Vector', lines:['Audit data'], logo:null },
  { title:'Postgres', lines:['Telemetry', 'storage'], logo:postgres },
  { title:'Redis', lines:['Telemetry', 'cache'], logo:redis },
]
const routes = [
  'M175 228 V401', 'M175 270 H360 V401', 'M260 432 H305',
  'M500 228 V270 H737 V401', 'M760 228 V270', 'M1020 228 V270 H737', 'M1280 228 V270 H1020',
  'M737 463 V503', 'M290 534 H320 V506 H345', 'M320 534 V577 H345',
  'M525 506 H565 V543 H620', 'M525 577 H565 V543',
  'M855 520 H895 V496 H965', 'M855 545 H925 V600 H965',
  'M737 583 V638 H677 V665', 'M818 695 H828',
  'M835 583 V608 H950 V747 H692 V757', 'M950 747 H857 V757',
  'M1077 638 V665', 'M1190 600 H1220 V445 H1500 V437 H1545',
  'M1345 445 V520', 'M1500 445 V642 H1545',
]
const flow = ref('model')
const hosting = ref('local')
const step = ref(-1)
const running = ref(false)
const playId = ref(0)
let timer: ReturnType<typeof setTimeout> | undefined
const { $page, $nav } = useSlideContext()
const journeys = computed(() => {
  if (flow.value === 'deployment') return [
    { d: routes[0], label: 'Admin CLI → Bob Operator', nodes: ['admincli', 'operator'] },
    { d: routes[2], label: 'Bob Operator → CRD', nodes: ['operator', 'crd'] },
  ]
  const start = [
    { d: routes[3], label: 'IBM Bob IDE → Cluster Ingress', nodes: ['ide', 'ingress'] },
    { d: routes[7], label: 'Cluster Ingress → API Gateway', nodes: ['ingress', 'gateway'] },
  ]
  if (flow.value === 'tools') return [...start,
    { d: routes[14], label: 'API Gateway → zProxy', nodes: ['gateway', 'zproxy'] },
  ]
  const destinations: Record<string, string> = {
    local: 'M1190 600 H1220 V445 H1345 V520',
    public: routes[19],
    private: 'M1190 600 H1220 V445 H1500 V642 H1545',
  }
  return [...start,
    { d: routes[13], label: 'API Gateway → Bifrost', nodes: ['gateway', 'bifrost'] },
    { d: destinations[hosting.value], label: `Bifrost → ${hosting.value === 'local' ? 'OpenShift AI' : hosting.value === 'public' ? 'Public Cloud' : 'Private Infrastructure'}`, nodes: ['bifrost', hosting.value] },
  ]
})
const current = computed(() => journeys.value[step.value])
function stop() { clearTimeout(timer); running.value = false }
function reset() { stop(); step.value = -1 }
function advance() {
  if (step.value < journeys.value.length - 1) { step.value++; timer = setTimeout(advance, 1700) }
  else stop()
}
function play() { reset(); playId.value++; running.value = true; advance() }
watch([flow, hosting], reset)
watch(() => $nav.value.currentSlideNo, page => { if (page !== $page.value) reset() })
onUnmounted(stop)
const logos: Record<string,string> = { ide:bob, auth:keycloak }
function hasNotation(node: any) { return !logos[node.id] && node.id !== 'crd' && node.kind !== 'Node' }
function lineHeight(node: any) { return node.parent === 'ppz' || ['zu','zr'].includes(node.id) ? 17 : node.id === 'metrics' ? 20 : 24 }
function lines(node: any) {
  if (node.id === 'ide') return ['IBM Bob IDE']
  if (node.id === 'auth') return ['Auth Server']
  if (node.id === 'local') return ['OPTION 1 · OpenShift AI', 'Local Models', 'All Modes']
  if (node.id === 'metrics') return ['Metrics Collector', 'Open Metrics', 'Forwarder']
  if (node.id === 'ragproxy') return ['Z RAG', 'server', 'proxy']
  if (node.id === 'ragmcp') return ['Z RAG', 'MCP', 'Server']
  if (node.id === 'zu') return ['Z Understand']
  if (node.id === 'zr') return ['Z Refactor']
  return node.label.split('\n')
}
function textY(node: any) {
  if (node.id === 'auth') return node.y + 23
  if (node.id === 'local') return node.y + 62
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
        <marker id="bob-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="#526779" stroke-width="1.5" /></marker>
        <g id="bob-component"><path d="M4 0H17V19H4 M0 4H8V9H0Z M0 12H8V17H0Z" fill="none" stroke="currentColor" stroke-width="1.3" /></g>
      </defs>
      <g v-for="group in groups" :key="group.id" :class="['boundary',group.id]">
        <rect :x="group.x" :y="group.y" :width="group.w" :height="group.h" rx="9" :fill="group.fill" />
        <text :x="group.id === 'cluster' ? 800 : group.id === 'service' ? 405 : group.x+18" :y="group.y+29">{{ group.label }}</text>
        <image v-if="group.id==='cluster'" :href="openshift" :x="group.x+1200" :y="group.y+7" width="180" height="38" />
      </g>
      <g class="connections"><path v-for="(d,i) in routes" :key="i" :d="d" :marker-end="[4,5,6,11].includes(i) ? undefined : 'url(#bob-arrow)'" /></g>
      <g v-for="node in components" :key="node.id" :data-component="node.id" class="component">
        <rect :x="node.x" :y="node.y" :width="node.w" :height="node.h" rx="3" :fill="node.fill || (node.kind==='DataObject' ? '#eee5f4' : '#edf3fc')" />
        <use v-if="hasNotation(node)" href="#bob-component" :transform="`translate(${node.x+8} ${node.y+node.h/2-7}) scale(.72)`" class="notation" />
        <image v-if="node.id==='ide'" :href="bob" :x="node.x+12" :y="node.y+3" width="48" :height="node.h-6" />
        <image v-if="node.id==='auth'" :href="keycloak" :x="node.x+22" :y="node.y+32" :width="node.w-44" height="24" />
        <text :x="textX(node)" :y="textY(node)" :class="{ compact:node.parent==='ppz', narrow:['zu','zr'].includes(node.id), hosting:node.kind==='Node' }">
          <tspan v-for="(line,i) in lines(node)" :key="i" :x="textX(node)" :dy="i ? lineHeight(node) : 0">{{ line }}</tspan>
        </text>
      </g>
      <g v-for="(item,i) in data" :key="i" class="data-item" :transform="`translate(${73+i*174},868)`">
        <rect width="163" height="80" rx="3" />
        <image v-if="item.logo && !['OpenSearch','Redis'].includes(item.title)" :href="item.logo" x="10" y="7" width="30" height="26" />
        <image v-if="['OpenSearch','Redis'].includes(item.title)" :href="item.logo!" x="10" y="8" width="143" height="23" />
        <text v-else :x="item.logo ? 100 : 81.5" y="26" class="data-title">{{ item.title }}</text>
        <text x="81.5" :y="item.lines.length===1 ? 61 : 55"><tspan v-for="(line,j) in item.lines" :key="j" x="81.5" :dy="j ? 18 : 0">{{ line }}</tspan></text>
      </g>
      <text x="1545" y="213" class="routing-label"><tspan x="1545">Bifrost configuration</tspan><tspan x="1545" dy="28">routes to 3 hosting options</tspan></text>
      <g v-if="current" class="flow-overlay" aria-hidden="true">
        <path :key="`${playId}-${step}`" :d="current.d" pathLength="1" class="flow-trace" />
        <rect v-for="id in current.nodes" :key="id" :x="position(id).x-3" :y="position(id).y-3" :width="source[id].w+6" :height="source[id].h+6" rx="5" class="flow-node" />
      </g>
    </svg>
    <div class="flow-controls" @click.stop @keydown.stop>
      <label>流向示意 <select v-model="flow" aria-label="選擇流向"><option value="model">模型請求</option><option value="tools">Z 工具</option><option value="deployment">部署管理</option></select></label>
      <select v-if="flow==='model'" v-model="hosting" aria-label="模型部署選項"><option value="local">OpenShift AI</option><option value="public">Public Cloud</option><option value="private">Private Infrastructure</option></select>
      <button type="button" @click="running ? stop() : play()">{{ running ? '停止' : step >= 0 ? '重播' : '播放' }}</button>
      <button type="button" @click="reset">清除</button>
      <span role="status">{{ current ? `${step+1}/${journeys.length} · ${current.label}` : '選擇路徑，逐段查看流向' }}</span>
    </div>
    <div class="architecture-meta"><div class="legend"><span><i class="application" />Application</span><span><i class="technology" />Technology</span><span><i class="ppz" />PPZ</span><span><i class="management" />Deployment management</span></div><span>K8s cluster support: future</span></div>
  </section>
</template>

<style scoped>
.bob-architecture { position:absolute; inset:0; color:#161616; }
header { position:absolute; top:26px; left:72px; right:72px; }
.bob-architecture header h1 { font-size:46px; line-height:1.22; margin:0; font-weight:700; letter-spacing:-.04em; }
.architecture-canvas { position:absolute; top:94px; left:16px; width:calc(100% - 32px); height:522px; overflow:visible; font-family:'IBM Plex Sans','Noto Sans TC',sans-serif; }
.boundary rect { stroke:#bac7d2; stroke-width:1.3; }
.boundary.cluster rect { stroke:#8ba999; }
.boundary text { font-size:20px; font-weight:600; fill:#344b60; }
.connections path { fill:none; stroke:#526779; stroke-width:1.8; }
.component rect { stroke:#a4b8cd; stroke-width:1.2; }
.component text { fill:#182c40; font-size:21px; text-anchor:middle; }
.component text.compact { font-size:15px; }
.component text.narrow { font-size:17px; }
.component text.hosting { font-size:20px; }
.notation { color:#7890a5; }
.data-item rect { fill:#eef7f1; stroke:#a7bfb0; }
.data-item text { text-anchor:middle; font-size:16px; fill:#243d33; }
.data-item .data-title { font-weight:600; font-size:17px; }
.routing-label { font-size:22px; fill:#0f62fe; font-weight:500; }
.architecture-meta { position:absolute; left:72px; right:72px; bottom:70px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#525252; }
.flow-controls{position:absolute;left:72px;right:72px;bottom:86px;display:flex;align-items:center;gap:8px;font-size:12px;color:#393939}
.flow-controls label{display:flex;align-items:center;gap:8px}.flow-controls select,.flow-controls button{font:inherit;border:1px solid #c6c6c6;border-radius:3px;padding:3px 7px;background:#f4f7fb;color:#0043ce}.flow-controls button{cursor:pointer}.flow-controls span{margin-left:6px}.flow-controls :focus-visible{outline:2px solid #0f62fe;outline-offset:2px}
.flow-overlay{pointer-events:none}.flow-trace{fill:none;stroke:#0f62fe;stroke-width:5;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0;animation:trace-flow 1.3s ease-out both}.flow-node{fill:none;stroke:#0f62fe;stroke-width:3}
@keyframes trace-flow{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@media(prefers-reduced-motion:reduce){.flow-trace{animation:none}}@media print{.flow-controls,.flow-overlay{display:none}}
.legend { display:flex; gap:20px; }
.legend span { display:flex; align-items:center; gap:6px; }
.legend i { width:12px; height:9px; border:1px solid #b8c3cc; }
.application { background:#edf3fc; }.technology { background:#def0e2; }.ppz { background:#e0e5ff; }.management { background:#fff1d6; }
</style>
