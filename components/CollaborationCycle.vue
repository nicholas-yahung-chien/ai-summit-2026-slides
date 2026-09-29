<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
const stages = [
  { name: '釐清', human: '說明目標與限制', ai: '探索現況、提出問題', tx: 617, ty: 10 },
  { name: '規劃', human: '選擇方案與取捨', ai: '提出步驟與設計', tx: 842, ty: 153 },
  { name: '實作', human: '確認範圍、處理分歧', ai: '分段修改程式', tx: 759, ty: 333 },
  { name: '驗證', human: '判斷是否符合需求', ai: '執行測試、呈現結果', tx: 112, ty: 333 },
  { name: '回饋', human: '指出差距、調整方向', ai: '修正並更新文件', tx: 12, ty: 153 },
]
const point = angle => ({ x: 568 + 230 * Math.cos(angle * Math.PI / 180), y: 225 + 150 * Math.sin(angle * Math.PI / 180) })
const nodes = stages.map((stage, i) => {
  const angle = -90 + i * 72
  const start = point(angle + 10), end = point(angle + 62)
  return { ...stage, ...point(angle), path: `M ${start.x} ${start.y} A 230 150 0 0 1 ${end.x} ${end.y}` }
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
        <marker id="cycle-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 1 1 L 8 5 L 1 9" fill="none" stroke="#0f62fe" stroke-width="1.5" /></marker>
        <g id="cycle-human" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10" cy="6" r="3.5"/><path d="M3 21v-4a7 7 0 0 1 14 0v4M6 18v3m8-3v3"/></g>
        <g id="cycle-ai" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2" y="6" width="17" height="14" rx="2"/><path d="M10.5 2v4M0 11v5m21-5v5M7 16h7"/><circle cx="7" cy="11" r=".7"/><circle cx="14" cy="11" r=".7"/></g>
      </defs>
      <ellipse cx="568" cy="225" rx="230" ry="150" fill="none" stroke="#dce5f3" stroke-width="2" />
      <g v-for="(stage, i) in nodes" :key="stage.name" :style="{ '--delay': `${i * .9}s` }">
        <path :d="stage.path" fill="none" stroke="#0f62fe" stroke-width="2.5" marker-end="url(#cycle-arrow)" class="connection" />
        <circle :cx="stage.x" :cy="stage.y" r="30" fill="#f4f4f4" stroke="#a6c8ff" stroke-width="2" />
        <circle :cx="stage.x" :cy="stage.y" r="30" fill="#0f62fe" class="spotlight" />
        <text :x="stage.x" :y="stage.y+8" text-anchor="middle" class="number">0{{ i+1 }}</text>
        <g :transform="`translate(${stage.tx} ${stage.ty})`" class="stage-copy">
          <text class="stage-title" x="0" y="0">{{ stage.name }}</text>
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
.stage-title{font-size:29px;font-weight:600;fill:#161616}
.stage-copy text:not(.stage-title){font-size:21px;fill:currentColor}
.human{color:#393939}.ai{color:#0043ce}
.number{font-size:22px;font-weight:600;fill:#0043ce;animation:number-active .9s ease-in-out var(--delay) both}
.spotlight{opacity:0;animation:spotlight .9s ease-in-out var(--delay) both}
.connection{opacity:.45;animation:connection .9s ease-in-out calc(var(--delay) + .45s) both}
.center-title{font-size:30px;font-weight:600;fill:#0043ce}.center-subtitle{font-size:20px;fill:#525252}
.sources{position:absolute;bottom:80px;left:72px;right:72px;border-top:1px solid #d6d6d6;padding-top:10px;font-size:12px;color:#525252}
.sources a{color:#525252;text-decoration:none;border-bottom:1px dotted #8d8d8d}
@keyframes spotlight{0%,100%{opacity:0}15%,75%{opacity:1}}
@keyframes number-active{0%,100%{fill:#0043ce}15%,75%{fill:#fff}}
@keyframes connection{0%{opacity:.45}40%,100%{opacity:1}}
.instant .spotlight,.instant .number,.instant .connection{animation:none}
@media(prefers-reduced-motion:reduce){.spotlight,.number,.connection{animation:none!important}}
@media print{.spotlight,.number,.connection{animation:none!important}.replay{display:none}}
</style>
