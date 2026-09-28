<script setup lang="ts">
import { ref } from 'vue'
const replay = ref(0)
const milestones = [
  { x: 106, y: 280, date: '1950', title: '圖靈測試', detail: '提出機器智慧的問題' },
  { x: 318, y: 245, date: '2017', title: 'Transformer', detail: '通用模型的重要基礎' },
  { x: 530, y: 180, date: '2025.06', title: '多代理研究系統', detail: '開始協作完成任務' },
  { x: 742, y: 100, date: '2026.07', title: 'IBM Bob V2', detail: '走入企業開發流程' },
  { x: 954, y: 35, date: '2026.09', title: 'Jev', detail: '專門化的決策模型' },
]
</script>

<template>
  <div class="evolution-chart">
    <div class="chart-caption"><span>能力範圍 · 概念示意，非量測指標</span><button @click.stop="replay++" @keydown.stop>重播動畫 ↻</button></div>
    <svg :key="replay" viewBox="0 0 1060 350" preserveAspectRatio="none" role="img" aria-label="1950 圖靈測試、2017 Transformer、2025 多代理研究系統、2026 IBM Bob V2 與 Jev 的概念性演進折線。事件間距不代表時間長度。">
      <path d="M35 15V305H1030" fill="none" stroke="#8d8d8d" stroke-width="2" />
      <path v-for="y in [70,145,220]" :key="y" :d="`M35 ${y} H1030`" stroke="#d6d6d6" stroke-dasharray="4 8" />
      <path class="evolution-line" d="M106 280 L318 245 L530 180 L742 100 L954 35" pathLength="1" fill="none" stroke="#0f62fe" stroke-width="5" />
      <g v-for="(p,i) in milestones" :key="p.date" class="milestone-dot" :style="{ animationDelay: `${i * .7}s` }">
        <circle :cx="p.x" :cy="p.y" r="8" fill="#0f62fe" stroke="#fff" stroke-width="3" />
        <text :x="p.x" y="336" text-anchor="middle" fill="#0043ce" font-size="22">{{ p.date }}</text>
      </g>
    </svg>
    <div class="milestone-labels"><div v-for="p in milestones" :key="p.date"><strong>{{ p.title }}</strong><span>{{ p.detail }}</span></div></div>
    <p class="chart-disclaimer">橫軸依事件排列、非等距年份；折線用於敘事，不代表智慧分數或成長率。</p>
  </div>
</template>

<style scoped>
.chart-caption { display:flex; align-items:center; justify-content:space-between; font-size:20px; color:#525252; }
button { color:#0043ce; background:#e0e9ff; padding:7px 14px; font-size:18px; cursor:pointer; }
button:focus-visible { outline:3px solid #0f62fe; outline-offset:3px; }
svg { width:100%; height:290px; overflow:visible; }
svg text { font-size:22px !important; }
.evolution-line { stroke-dasharray:1; animation:trace-line 3s ease-in-out both; }
.milestone-dot { animation:show-dot .3s both; }
.milestone-labels { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-top:0; }
.milestone-labels strong { font-size:22px; display:block; }
.milestone-labels span { font-size:18px; color:#525252; display:block; margin-top:8px; }
.chart-disclaimer { font-size:16px; color:#525252; margin-top:18px !important; }
@keyframes trace-line { from {stroke-dashoffset:1} to {stroke-dashoffset:0} }
@keyframes show-dot { from {opacity:0} to {opacity:1} }
@media (prefers-reduced-motion:reduce) { .evolution-line,.milestone-dot { animation:none; } }
</style>
