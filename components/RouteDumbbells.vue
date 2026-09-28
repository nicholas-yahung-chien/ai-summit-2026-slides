<script setup>
defineProps({ baselineCost:Number, routingCost:Number, savings:Number })
const costX = value => 95 + value / 10000 * 860
</script>
<template>
  <svg class="dumbbells" viewBox="0 0 1136 240" role="img" aria-labelledby="dumbbell-title">
    <title id="dumbbell-title">評分：GPT-4 9.3、RouteLLM 8.8；推算每百萬次請求費用：GPT-4 8,870 美元、RouteLLM 約 1,267 美元</title>
    <text x="0" y="22" class="heading">評測分數 ↑</text><text x="400" y="22" class="unit">GPT-4 呼叫占比：100% → 13.4%</text><text x="1136" y="22" text-anchor="end" class="delta">差 0.5 分</text>
    <line x1="95" y1="76" x2="955" y2="76" class="axis" />
    <g v-for="tick in [0,2,4,6,8,10]" :key="tick"><line :x1="95+tick*86" y1="72" :x2="95+tick*86" y2="81" class="tick"/><text :x="95+tick*86" y="102" text-anchor="middle" class="tick-text">{{tick}}</text></g>
    <g class="reveal"><line :x1="95+8.8*86" y1="76" :x2="95+9.3*86" y2="76" class="connector"/>
      <circle :cx="95+9.3*86" cy="76" r="7" class="winner"/><path :d="`M ${95+8.8*86} 68 l 8 8 l -8 8 l -8 -8 Z`" class="other"/>
      <text :x="95+8.8*86-12" y="59" text-anchor="end">RouteLLM <tspan class="muted">8.8</tspan></text>
      <text :x="95+9.3*86+12" y="59">GPT-4 <tspan class="blue">9.3</tspan></text>
    </g>
    <text x="0" y="139" class="heading">推算費用 ↓ <tspan class="unit">USD／百萬次請求</tspan></text><text x="1136" y="139" text-anchor="end" class="delta">節省 {{savings.toFixed(1)}}%</text>
    <line x1="95" y1="195" x2="955" y2="195" class="axis"/>
    <g v-for="tick in [0,2000,4000,6000,8000,10000]" :key="tick"><line :x1="costX(tick)" y1="191" :x2="costX(tick)" y2="200" class="tick"/><text :x="costX(tick)" y="224" text-anchor="middle" class="tick-text">${{tick.toLocaleString('en-US')}}</text></g>
    <g class="reveal later"><line :x1="costX(routingCost)" y1="195" :x2="costX(baselineCost)" y2="195" class="connector"/>
      <circle :cx="costX(baselineCost)" cy="195" r="7" class="other"/><path :d="`M ${costX(routingCost)} 187 l 8 8 l -8 8 l -8 -8 Z`" class="winner"/>
      <text :x="costX(routingCost)" y="178" text-anchor="middle">RouteLLM <tspan class="blue">${{Math.round(routingCost).toLocaleString('en-US')}}</tspan></text>
      <text :x="costX(baselineCost)" y="178" text-anchor="middle">GPT-4 <tspan class="muted">${{baselineCost.toLocaleString('en-US')}}</tspan></text>
    </g>
  </svg>
</template>
<style scoped>
.dumbbells{display:block;width:100%;height:205px;margin-top:10px;overflow:visible;font:19px 'IBM Plex Sans','Noto Sans TC',sans-serif;fill:#393939}
.heading{font-size:21px}.unit,.tick-text{font-size:16px;fill:#525252}.delta{font-size:21px;fill:#0043ce}.axis{stroke:#d6dbe2;stroke-width:2}.tick{stroke:#a8a8a8}.connector{stroke:#8d99a5;stroke-width:3}.winner{fill:#0f62fe;stroke:#f4f4f4;stroke-width:2}.other{fill:#697785;stroke:#f4f4f4;stroke-width:2}.blue{fill:#0043ce;font-weight:600}.muted{fill:#697785;font-weight:600}
.reveal{animation:appear 700ms ease-out 150ms both}.later{animation-delay:650ms}.delta{animation:appear 400ms ease-out 1200ms both}@keyframes appear{from{opacity:0}to{opacity:1}}
:global(.instant) .reveal,:global(.instant) .delta{animation:none}@media(prefers-reduced-motion:reduce){.reveal,.delta{animation:none}}@media print{.reveal,.delta{animation:none}}
</style>
