<script setup>
defineProps({tiers:Array})
const x = value => 65 + value / 40 * 940
const y = value => 270 - value / 100 * 220
const labelX = (row,index) => x(row.cost) + (index === 0 && row.cost > 30 ? -14 : 14)
const labelY = (row,t,index) => y(row.score) + (t === 0 && index === 1 ? 29 : -14)
</script>
<template>
  <svg class="scatter" viewBox="0 0 1136 324" role="img" aria-labelledby="scatter-title">
    <title id="scatter-title">RouterArena：不同難度的成本與準確率。GPT-5：容易95.1%、5.68美元，中等68.6%、14.80美元，困難27.5%、35.73美元；Azure Router：容易93.3%、0.30美元，中等59.5%、0.63美元，困難17.9%、1.05美元。費用為每千次查詢美元。</title>
    <text x="0" y="20" class="heading">準確率 ↑</text>
    <circle cx="765" cy="15" r="6" class="point"/><text x="780" y="22" class="legend">GPT-5</text><path d="M 897 8 l 7 7 l -7 7 l -7 -7 Z" class="point"/><text x="912" y="22" class="legend">Azure Router</text>
    <g v-for="tick in [0,25,50,75,100]" :key="tick"><line x1="65" :y1="y(tick)" x2="1005" :y2="y(tick)" class="grid"/><text x="52" :y="y(tick)+5" text-anchor="end" class="tick">{{tick}}%</text></g>
    <line x1="65" y1="50" x2="65" y2="270" class="axis"/><line x1="65" y1="270" x2="1005" y2="270" class="axis"/>
    <g v-for="tick in [0,10,20,30,40]" :key="tick"><line :x1="x(tick)" y1="270" :x2="x(tick)" y2="275" class="axis"/><text :x="x(tick)" y="294" text-anchor="middle" class="tick">${{tick}}</text></g>
    <text x="1005" y="320" text-anchor="end" class="unit">費用 · USD／千次查詢 →</text>
    <g v-for="(tier,t) in tiers" :key="tier.name" class="pair" :style="{'--delay':`${t*650}ms`}">
      <line :x1="x(tier.rows[0].cost)" :y1="y(tier.rows[0].score)" :x2="x(tier.rows[1].cost)" :y2="y(tier.rows[1].score)" class="connector"/>
      <g v-for="(row,index) in tier.rows" :key="row.name">
        <circle v-if="index===0" :cx="x(row.cost)" :cy="y(row.score)" r="6" class="point"/>
        <path v-else :d="`M ${x(row.cost)} ${y(row.score)-7} l 7 7 l -7 7 l -7 -7 Z`" class="point"/>
        <text :x="labelX(row,index)" :y="labelY(row,t,index)" :text-anchor="index===0 && row.cost>30 ? 'end':'start'" class="label">{{tier.name}} <tspan :class="{blue:index===0}">{{row.score.toFixed(1)}}%</tspan><tspan> · </tspan><tspan :class="{blue:index===1}">${{row.cost.toFixed(2)}}</tspan></text>
      </g>
    </g>
  </svg>
  <p class="difficulty">42 模型答對數分級：容易 ≥20 ／ 中等 5–19 ／ 困難 ≤4</p>
</template>
<style scoped>
.scatter{display:block;width:100%;height:273px;overflow:visible;font:18px 'IBM Plex Sans','Noto Sans TC',sans-serif;fill:#393939}.heading{font-size:20px}.legend,.unit,.tick{font-size:16px;fill:#525252}.grid{stroke:#dfe3e8;stroke-dasharray:3 5}.axis{stroke:#8d99a5;stroke-width:1}.connector{stroke:#8d99a5;stroke-width:1.5}.point{fill:#525e6b;stroke:#f4f4f4;stroke-width:1.5}.label{font-size:18px;paint-order:stroke;stroke:#f4f4f4;stroke-width:4px;stroke-linejoin:round}.blue{fill:#0043ce;font-weight:600}.difficulty{font-size:15px!important;color:#525252;margin:0!important}
.pair{animation:appear 650ms ease-out var(--delay) both}@keyframes appear{from{opacity:0}to{opacity:1}}:global(.instant) .pair{animation:none}@media(prefers-reduced-motion:reduce){.pair{animation:none}}@media print{.pair{animation:none}}
</style>
