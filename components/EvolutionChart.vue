<script setup lang="ts">
import { ref } from 'vue'
const replay = ref(0)
// Deliberately nonuniform time spacing and illustrative heights; not measured growth.
const points = [
  { date:'1950', title:'圖靈測試', x:80, y:522, lx:80, ly:469 },
  { date:'1965', title:'專家系統', x:245, y:515, lx:245, ly:460 },
  { date:'1997', title:'Deep Blue', x:402, y:499, lx:402, ly:444 },
  { date:'2011', title:'IBM Watson', x:530, y:472, lx:510, ly:411 },
  { date:'2016', title:'AlphaGo', x:640, y:435, lx:597, ly:374 },
  { date:'2017', title:'Transformer', x:735, y:389, lx:628, ly:331 },
  { date:'2020', title:'GPT-3 · LLM', x:816, y:336, lx:694, ly:278 },
  { date:'2022', title:'ChatGPT', x:885, y:278, lx:760, ly:220 },
  { date:'2023', title:'IBM watsonx', x:946, y:219, lx:795, ly:166 },
  { date:'2025.02', title:'Vibe coding', x:1001, y:160, lx:849, ly:110 },
  { date:'2026.07', title:'IBM Bob V2', x:1050, y:99, lx:900, ly:55 },
  { date:'2026.09', title:'Jev', x:1094, y:36, lx:1130, ly:29 },
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
    <div class="chart-intro"><p>AI EVOLUTION / 1950—2026</p><h2>突破，正在加速。</h2><span>從專用智慧，到代理式開發</span></div>
    <button class="replay-curve" @click.stop="replay++" @keydown.stop aria-label="重播演進曲線">↻ 重播</button>
    <svg :key="replay" viewBox="0 0 1184 650" role="img" aria-labelledby="evolution-title evolution-desc">
      <title id="evolution-title">AI 演進的十二個重要里程碑</title>
      <desc id="evolution-desc">1950 圖靈測試、1965 專家系統、1997 Deep Blue、2011 IBM Watson、2016 AlphaGo、2017 Transformer、2020 GPT-3、2022 ChatGPT、2023 IBM watsonx、2025 年 2 月 Vibe coding、2026 年 7 月 IBM Bob V2、2026 年 9 月 Jev。時間軸非等距；曲線高度為概念示意，不代表實測能力或成長率。</desc>
      <defs>
        <linearGradient id="evolution-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f62fe" stop-opacity=".13"/><stop offset="1" stop-color="#0f62fe" stop-opacity=".015"/></linearGradient>
      </defs>
      <path :d="`${curve} L1094 552 H80 Z`" fill="url(#evolution-area)" />
      <path d="M48 28 V552 H1147" fill="none" stroke="#a8a8a8" stroke-width="1.3" />
      <path d="M44 35 L48 27 L52 35 M1140 548 L1148 552 L1140 556" fill="none" stroke="#a8a8a8" stroke-width="1.3" />
      <g v-for="(p,i) in points" :key="p.date" class="event" :style="{animationDelay:`${i*.22}s`}">
        <path :d="`M${p.x} ${p.y+10} V552`" stroke="#0f62fe" :stroke-opacity="i<5?.09:.16" stroke-dasharray="2 6" />
        <path :d="`M${p.x} 552 V559`" stroke="#8d8d8d" />
        <text class="event-date" :transform="`translate(${p.x+3},577) rotate(-48)`" text-anchor="end">{{ p.date }}</text>
        <path :d="`M${p.x} ${p.y-12} L${p.lx} ${p.ly+12}`" fill="none" stroke="#8d8d8d" stroke-width="1" />
        <text class="event-label" :class="{'recent-label':i>8}" :x="p.lx" :y="p.ly" text-anchor="middle">{{ p.title }}</text>
      </g>
      <path class="curve-stroke" :d="curve" pathLength="1" fill="none" stroke="#0f62fe" stroke-width="4.5" stroke-linecap="round" />
      <g v-for="(p,i) in points" :key="p.title" class="event" :style="{animationDelay:`${i*.22}s`}">
        <circle v-if="i===11" :cx="p.x" :cy="p.y" r="17" fill="#0f62fe" opacity=".1" />
        <circle :cx="p.x" :cy="p.y" :r="i>8?6.5:5.5" fill="#0f62fe" stroke="#f4f4f4" stroke-width="3" />
      </g>
    </svg>
    <p class="chart-footnote">精選里程碑 · 時間軸非等距 · 曲線為概念示意，非實測成長率</p>
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
svg .event-label { font-size:23px !important; font-weight:600; fill:#161616; paint-order:stroke; stroke:#f4f4f4; stroke-width:7px; stroke-linejoin:round; }
svg .recent-label { fill:#0043ce; }
svg .event-date { font-size:18px !important; fill:#525252; font-variant-numeric:tabular-nums; }
.curve-stroke { stroke-dasharray:1; animation:trace 2.8s ease-in both; }
.event { animation:appear .4s both; }
.chart-footnote { position:absolute; bottom:0; left:80px; font-size:14px; color:#6f6f6f; }
@keyframes trace { from {stroke-dashoffset:1} to {stroke-dashoffset:0} }
@keyframes appear { from {opacity:0} to {opacity:1} }
@media(prefers-reduced-motion:reduce) { .curve-stroke,.event { animation:none; } }
@media print { .replay-curve { display:none; } .curve-stroke,.event { animation:none; } }
</style>
