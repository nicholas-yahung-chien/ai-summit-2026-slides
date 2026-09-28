<script setup lang="ts">
import { ref } from 'vue'
const replay = ref(0)
// Deliberately nonuniform time spacing and illustrative heights; not measured growth.
const points = [
  {
    "date": "1950",
    "title": "\u5716\u9748\u6e2c\u8a66",
    "x": 80,
    "y": 522,
    "lx": 80,
    "ly": 469
  },
  {
    "date": "1965",
    "title": "\u5c08\u5bb6\u7cfb\u7d71",
    "x": 210,
    "y": 518,
    "lx": 210,
    "ly": 457
  },
  {
    "date": "1997",
    "title": "Deep Blue",
    "x": 340,
    "y": 507,
    "lx": 330,
    "ly": 443
  },
  {
    "date": "2011",
    "title": "Watson",
    "x": 440,
    "y": 490,
    "lx": 425,
    "ly": 421
  },
  {
    "date": "2016",
    "title": "AlphaGo",
    "x": 520,
    "y": 467,
    "lx": 495,
    "ly": 393
  },
  {
    "date": "2020.05",
    "title": "GPT-3",
    "x": 590,
    "y": 437,
    "lx": 550,
    "ly": 363
  },
  {
    "date": "2020.11",
    "title": "AlphaFold 2",
    "x": 650,
    "y": 404,
    "lx": 595,
    "ly": 333
  },
  {
    "date": "2022.11",
    "title": "ChatGPT",
    "x": 704,
    "y": 370,
    "lx": 635,
    "ly": 303
  },
  {
    "date": "2023",
    "title": "RAG",
    "x": 755,
    "y": 334,
    "lx": 675,
    "ly": 273
  },
  {
    "date": "2024",
    "title": "Agentic AI",
    "x": 801,
    "y": 297,
    "lx": 715,
    "ly": 243
  },
  {
    "date": "2025.02",
    "title": "Vibe coding",
    "x": 845,
    "y": 260,
    "lx": 750,
    "ly": 213
  },
  {
    "date": "2026.02",
    "title": "Agentic CI",
    "x": 887,
    "y": 223,
    "lx": 790,
    "ly": 183
  },
  {
    "date": "2026.02",
    "title": "\u591a\u4ee3\u7406\u4e26\u884c\u958b\u767c",
    "x": 925,
    "y": 187,
    "lx": 830,
    "ly": 153
  },
  {
    "date": "2026.03",
    "title": "\u9577\u6642\u4efb\u52d9\u4ee3\u7406",
    "x": 960,
    "y": 151,
    "lx": 870,
    "ly": 123
  },
  {
    "date": "2026.04",
    "title": "\u4ee3\u7406\u8a17\u7ba1\u670d\u52d9",
    "x": 995,
    "y": 115,
    "lx": 895,
    "ly": 93
  },
  {
    "date": "2026.05",
    "title": "\u641c\u5c0b\u4ee3\u7406\u5316",
    "x": 1029,
    "y": 80,
    "lx": 945,
    "ly": 63
  },
  {
    "date": "2026.06",
    "title": "\u4ee3\u7406\u8d70\u5165\u8fa6\u516c",
    "x": 1062,
    "y": 50,
    "lx": 990,
    "ly": 33
  },
  {
    "date": "2026.08",
    "title": "\u4ee3\u7406\u6210\u70ba\u4f7f\u7528\u8005",
    "x": 1094,
    "y": 20,
    "lx": 1075,
    "ly": 3
  }
]
const slope = (i: number) => {
  const a = points[Math.max(0,i-1)], b = points[Math.min(points.length-1,i+1)]
  return (b.y-a.y)/(b.x-a.x)
}
const curve = points.reduce((path,p,i) => {
  if (!i) return `M${p.x} ${p.y}`
  const prev = points[i-1], step = (p.x-prev.x)/3
  return `${path} C${prev.x+step} ${prev.y+slope(i-1)*step} ${p.x-step} ${p.y-slope(i)*step} ${p.x} ${p.y}`
}, '')
</script>

<template>
  <div class="acceleration-chart">
    <div class="chart-intro"><p>AI EVOLUTION / 1950—2026</p><h2>AI 發展的重要里程碑</h2><span>從回答問題，到協助我們完成工作</span></div>
    <button class="replay-curve" @click.stop="replay++" @keydown.stop aria-label="重播演進曲線">↻ 重播</button>
    <svg :key="replay" viewBox="0 0 1184 650" role="img" aria-labelledby="evolution-title evolution-desc">
      <title id="evolution-title">AI 演進的十八個里程碑與應用趨勢</title>
      <desc id="evolution-desc">{{ points.map(p => `${p.date} ${p.title}`).join('、') }}。</desc>
      <defs>
        <linearGradient id="evolution-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f62fe" stop-opacity=".13"/><stop offset="1" stop-color="#0f62fe" stop-opacity=".015"/></linearGradient>
      </defs>
      <path :d="`${curve} L1094 552 H80 Z`" fill="url(#evolution-area)" />
      <path d="M48 28 V552 H1147" fill="none" stroke="#a8a8a8" stroke-width="1.3" />
      <path d="M44 35 L48 27 L52 35 M1140 548 L1148 552 L1140 556" fill="none" stroke="#a8a8a8" stroke-width="1.3" />
      <g v-for="(p,i) in points" :key="p.title" class="event" :style="{animationDelay:`${i*.22}s`}">
        <path :d="`M${p.x} ${p.y+10} V552`" stroke="#0f62fe" :stroke-opacity="i<5?.09:.16" stroke-dasharray="2 6" />
        <path :d="`M${p.x} 552 V559`" stroke="#8d8d8d" />
        <text class="event-date" :transform="`translate(${p.x+3},577) rotate(-48)`" text-anchor="end">{{ p.date }}</text>
        <path :d="`M${p.x} ${p.y-12} L${p.lx} ${p.ly+12}`" fill="none" stroke="#8d8d8d" stroke-width="1" />
        <text class="event-label" :class="{'recent-label':i>=8}" :x="p.lx" :y="p.ly" text-anchor="middle">{{ p.title }}</text>
      </g>
      <path class="curve-stroke" :d="curve" pathLength="1" fill="none" stroke="#0f62fe" stroke-width="4.5" stroke-linecap="round" />
      <g v-for="(p,i) in points" :key="p.title" class="event" :style="{animationDelay:`${i*.22}s`}">
        <circle v-if="i===points.length-1" :cx="p.x" :cy="p.y" r="17" fill="#0f62fe" opacity=".1" />
        <circle :cx="p.x" :cy="p.y" :r="i>8?6.5:5.5" fill="#0f62fe" stroke="#f4f4f4" stroke-width="3" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.acceleration-chart { position:relative; width:1184px; height:668px; color:#161616; }
.chart-intro { position:absolute; left:80px; top:36px; pointer-events:none; }
.chart-intro p { color:#0043ce; font-size:16px; font-weight:500; letter-spacing:.12em; }
.chart-intro h2 { font-size:46px; font-weight:600; letter-spacing:-.04em; margin:16px 0 12px; }
.chart-intro span { font-size:23px; color:#525252; }
.replay-curve { position:absolute; left:80px; top:206px; z-index:1; color:#0043ce; font-size:16px; border-bottom:1px solid #a6c8ff; padding:2px 0; cursor:pointer; }
.replay-curve:focus-visible { outline:3px solid #0f62fe; outline-offset:5px; }
svg { width:1184px; height:650px; overflow:visible; }
svg .event-label { font-size:20px !important; font-weight:600; fill:#161616; paint-order:stroke; stroke:#f4f4f4; stroke-width:6px; stroke-linejoin:round; }
svg .recent-label { fill:#0043ce; }
svg .event-date { font-size:18px !important; fill:#525252; font-variant-numeric:tabular-nums; }
.curve-stroke { stroke-dasharray:1; animation:trace 2.8s ease-in both; }
.event { animation:appear .4s both; }
@keyframes trace { from {stroke-dashoffset:1} to {stroke-dashoffset:0} }
@keyframes appear { from {opacity:0} to {opacity:1} }
@media(prefers-reduced-motion:reduce) { .curve-stroke,.event { animation:none; } }
@media print { .replay-curve { display:none; } .curve-stroke,.event { animation:none; } }
</style>
