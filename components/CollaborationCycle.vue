<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
const stages = [
  { name: '釐清', human: '說明目標與限制', ai: '探索現況、提出問題', tx: 796, ty: 10, color: '#0043ce', leader: 'M568 23 H779' },
  { name: '規劃', human: '選擇方案與取捨', ai: '提出步驟與設計', tx: 838, ty: 151, color: '#0f62fe', leader: 'M762 162 H821' },
  { name: '實作', human: '確認範圍、處理分歧', ai: '分段修改程式', tx: 792, ty: 321, color: '#0072c3', leader: 'M695 390 H775' },
  { name: '驗證', human: '判斷是否符合需求', ai: '執行測試、呈現結果', tx: 10, ty: 321, color: '#005d5d', leader: 'M332 390 H441' },
  { name: '回饋', human: '指出差距、調整方向', ai: '修正並更新文件', tx: 10, ty: 151, color: '#003a6d', leader: 'M332 162 H374' },
]
const point = (angle, radius = 149) => ({ x: 568 + radius * Math.cos(angle * Math.PI / 180), y: 215 + radius * Math.sin(angle * Math.PI / 180) })
const coords = p => `${p.x} ${p.y}`
const nodes = stages.map((stage, i) => {
  const angle = -90 + i * 72
  const start = angle - 36, end = angle + 34
  const outerStart = point(start, 184), outerEnd = point(end, 184)
  const tip = point(end + 12, 149), innerEnd = point(end, 114), innerStart = point(start, 114), notch = point(start + 12, 149)
  return { ...stage, ...point(angle - 3), path: `M ${coords(outerStart)} A184 184 0 0 1 ${coords(outerEnd)} L${coords(tip)} L${coords(innerEnd)} A114 114 0 0 0 ${coords(innerStart)} L${coords(notch)} Z` }
})
</script>

<template>
  <section class="collaboration-cycle" :class="{ instant: !active || $renderContext === 'print' }">
    <p class="eyebrow">07 · HUMAN–AI COLLABORATION</p>
    <h1>人機協作短迴圈：小步實作、持續校準</h1>
    <p class="intro">人決定方向，AI 推進工作，每一輪都用結果確認下一步</p>
    <button class="replay" @click="replay++" aria-label="重播五階段循環動畫">重播循環 ↻</button>
    <svg :key="replay" class="cycle" viewBox="0 0 1136 450" role="img" aria-labelledby="cycle-title cycle-desc">
      <title id="cycle-title">人機協作短迴圈的五個階段</title>
      <desc id="cycle-desc">由釐清、規劃、實作、驗證到回饋，再回到釐清，每個階段列出人與 AI 的工作</desc>
      <defs>
        <g id="cycle-human" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10" cy="6" r="3.5"/><path d="M3 21v-4a7 7 0 0 1 14 0v4M6 18v3m8-3v3"/></g>
        <g id="cycle-ai" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2" y="6" width="17" height="14" rx="2"/><path d="M10.5 2v4M0 11v5m21-5v5M7 16h7"/><circle cx="7" cy="11" r=".7"/><circle cx="14" cy="11" r=".7"/></g>
      </defs>
      <g v-for="(stage, i) in nodes" :key="stage.name" :style="{ '--delay': `${i * .9}s` }">
        <path :d="stage.path" :fill="stage.color" stroke="#f4f4f4" stroke-width="4" stroke-linejoin="round" class="ring-segment" />
        <path :d="stage.path" fill="#fff" class="segment-light" />
        <text :x="stage.x" :y="stage.y-12" text-anchor="middle" class="number">0{{ i+1 }}</text>
        <text :x="stage.x" :y="stage.y+21" text-anchor="middle" class="ring-title">{{ stage.name }}</text>
        <path :d="stage.leader" fill="none" :stroke="stage.color" stroke-width="1.5" opacity=".5" />
        <g :transform="`translate(${stage.tx} ${stage.ty})`" class="stage-copy">
          <text class="stage-title" :fill="stage.color" x="0" y="0">0{{ i+1 }} · {{ stage.name }}</text>
          <g transform="translate(0 19)" class="human"><use href="#cycle-human"/><text x="31" y="19">人｜{{ stage.human }}</text></g>
          <g transform="translate(0 50)" class="ai"><use href="#cycle-ai"/><text x="31" y="19">AI｜{{ stage.ai }}</text></g>
        </g>
      </g>
      <text x="568" y="213" text-anchor="middle" class="center-title">共同理解</text>
      <text x="568" y="251" text-anchor="middle" class="center-subtitle">在每一輪中累積</text>
    </svg>
    <p class="sources">流程依下列資料歸納：<a href="https://bob.ibm.com/docs/ide/tutorials/ai-pair-programming-with-ibm-bob" target="_blank" rel="noopener">IBM · AI pair programming with IBM Bob</a> · <a href="https://www.martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html" target="_blank" rel="noopener">Garg (2026) · Design-First Collaboration</a></p>
  </section>
</template>

<style scoped>
h1{font-size:42px!important;line-height:1.2!important;margin:12px 0 10px!important;letter-spacing:-1px}
.intro{font-size:21px;color:#525252;margin:0}
.replay{position:absolute;right:72px;top:134px;font-size:15px;color:#0043ce;padding:4px 10px;border-bottom:1px solid #a6c8ff;background:transparent}
.replay:hover{background:#e0eaff}.replay:focus-visible{outline:2px solid #0f62fe;outline-offset:3px}
.cycle{width:100%;height:450px;overflow:visible;margin-top:7px}
.stage-title{font-size:20px;font-weight:600}
.stage-copy text:not(.stage-title){font-size:21px;fill:currentColor}
.human{color:#393939}.ai{color:#0043ce}
.number{font-size:18px;fill:#fff;opacity:.85}.ring-title{font-size:28px;font-weight:600;fill:#fff}
.ring-segment{animation:segment-enter .65s cubic-bezier(.16,1,.3,1) var(--delay) both;transform-box:fill-box;transform-origin:center}
.segment-light{opacity:0;animation:segment-light 1.2s ease-in-out var(--delay) both;pointer-events:none}
.center-title{font-size:30px;font-weight:600;fill:#0043ce}.center-subtitle{font-size:20px;fill:#525252}
.sources{position:absolute;bottom:80px;left:72px;right:72px;border-top:1px solid #d6d6d6;padding-top:10px;font-size:12px;color:#525252}
.sources a{color:#525252;text-decoration:none;border-bottom:1px dotted #8d8d8d}
@keyframes segment-enter{from{opacity:.3;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
@keyframes segment-light{0%,100%{opacity:0}30%{opacity:.22}}
.instant .ring-segment,.instant .segment-light{animation:none}
@media(prefers-reduced-motion:reduce){.ring-segment,.segment-light{animation:none!important}}
@media print{.ring-segment,.segment-light{animation:none!important}.replay{display:none}}
</style>
