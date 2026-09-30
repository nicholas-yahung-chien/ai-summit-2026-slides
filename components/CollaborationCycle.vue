<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
const stages = [
  { name: '釐清', human: '說明目標與限制', ai: '探索現況、提出問題', tx: 796, ty: 10, color: '#0043ce', leader: 'M568 27 V12 H779' },
  { name: '規劃', human: '選擇方案與取捨', ai: '提出步驟與設計', tx: 838, ty: 151, color: '#0f62fe', leader: 'M763 155 L790 132 H821' },
  { name: '實作', human: '確認範圍、處理分歧', ai: '分段修改程式', tx: 792, ty: 321, color: '#0072c3', leader: 'M703 373 L723 390 H775' },
  { name: '驗證', human: '判斷是否符合需求', ai: '執行測試、呈現結果', tx: 10, ty: 321, color: '#005d5d', leader: 'M433 373 L413 390 H332' },
  { name: '回饋', human: '整合成果、確認下一輪', ai: '整理決策、更新文件', tx: 10, ty: 125, color: '#003a6d', leader: 'M373 155 L346 132 H332' },
]
const point = (angle, radius = 140) => ({ x: 568 + radius * Math.cos(angle * Math.PI / 180), y: 215 + radius * Math.sin(angle * Math.PI / 180) })
const coords = p => `${p.x} ${p.y}`
const nodes = stages.map((stage, i) => {
  const angle = -90 + i * 72
  const center = point(angle)
  const local = degrees => ({ x: center.x + 62 * Math.cos(degrees * Math.PI / 180), y: center.y + 62 * Math.sin(degrees * Math.PI / 180) })
  return { ...stage, ...center, path: `M${coords(local(-65))} A62 62 0 1 1 ${coords(local(255))}`, next: `M${coords(point(angle + 29))} A140 140 0 0 1 ${coords(point(angle + 43))}` }
})
</script>

<template>
  <section class="collaboration-cycle" :class="{ instant: !active || $renderContext === 'print' }">
    <p class="eyebrow">08 · AI PAIR PROGRAMMING</p>
    <h1>AI 結對程式設計：小步實作、持續校準</h1>
    <p class="intro">每個階段都反覆提出、檢視與修正，必要時回到前一階段</p>
    <button class="replay" @click="replay++" aria-label="重播五階段循環動畫">重播循環 ↻</button>
    <svg :key="replay" class="cycle" viewBox="0 0 1136 450" role="img" aria-labelledby="cycle-title cycle-desc">
      <title id="cycle-title">AI 結對程式設計的五個階段</title>
      <desc id="cycle-desc">五個相連的小迴圈代表釐清、規劃、實作、驗證與回饋，各階段內反覆提出、檢視與修正，必要時可回到前一階段；第五階段回饋是整合成果與確認下一輪方向</desc>
      <defs>
        <marker v-for="(stage,i) in nodes" :id="`local-arrow-${i}`" :key="stage.name" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path d="M1 1 L9 5 L1 9 Z" :fill="stage.color" /></marker>
        <marker id="stage-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1 L9 5 L1 9" fill="none" stroke="#8d9db3" stroke-width="1.5"/></marker>
        <g id="cycle-human" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10" cy="6" r="3.5"/><path d="M3 21v-4a7 7 0 0 1 14 0v4M6 18v3m8-3v3"/></g>
        <g id="cycle-ai" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2" y="6" width="17" height="14" rx="2"/><path d="M10.5 2v4M0 11v5m21-5v5M7 16h7"/><circle cx="7" cy="11" r=".7"/><circle cx="14" cy="11" r=".7"/></g>
      </defs>
      <g v-for="(stage, i) in nodes" :key="stage.name" :style="{ '--ring-delay': `${i * .22}s`, '--line-delay': `${2.2 + i * .18}s`, '--copy-delay': `${4 + i * .18}s` }">
        <g class="ring-piece">
        <circle :cx="stage.x" :cy="stage.y" r="53" :fill="stage.color" opacity=".045" />
        <path :d="stage.path" pathLength="1" fill="none" :stroke="stage.color" stroke-width="6" stroke-linecap="butt" class="ring-segment" />
        <path :d="stage.path" fill="none" stroke="transparent" stroke-width="6" :marker-end="`url(#local-arrow-${i})`" class="loop-arrow" />
        <text :x="stage.x" :y="stage.y-14" text-anchor="middle" class="number" :fill="stage.color">0{{ i+1 }}</text>
        <text :x="stage.x" :y="stage.y+16" text-anchor="middle" class="ring-title" :fill="stage.color">{{ stage.name }}</text>
        <text :x="stage.x" :y="stage.y+38" text-anchor="middle" class="loop-caption">提出 · 檢視 · 修正</text>
        <path :d="stage.next" fill="none" stroke="#8d9db3" stroke-width="2" marker-end="url(#stage-arrow)" />
        </g>
        <path :d="stage.leader" class="leader" pathLength="1" fill="none" :stroke="stage.color" stroke-width="1.5" stroke-linejoin="round" opacity=".65" />
        <g :transform="`translate(${stage.tx} ${stage.ty})`"><g class="stage-copy">
          <text class="stage-title" :fill="stage.color" x="0" y="0">0{{ i+1 }} · {{ stage.name }}</text>
          <g transform="translate(0 19)" class="human"><use href="#cycle-human"/><text x="31" y="19">人｜{{ stage.human }}</text></g>
          <g transform="translate(0 50)" class="ai"><use href="#cycle-ai"/><text x="31" y="19">AI｜{{ stage.ai }}</text></g>
        </g></g>
      </g>
      <text x="568" y="213" text-anchor="middle" class="center-title">共同理解</text>
      <text x="568" y="241" text-anchor="middle" class="center-subtitle">在每一輪中累積</text>
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
.number{font-size:16px;opacity:.85}.ring-title{font-size:24px;font-weight:600}.loop-caption{font-size:11px;fill:#525252}
.ring-piece{animation:segment-enter .35s cubic-bezier(.16,1,.3,1) var(--ring-delay) both;transform-box:fill-box;transform-origin:center}
.ring-segment{stroke-dasharray:1;stroke-dashoffset:0;animation:line-wipe 1.1s linear var(--ring-delay) both}
.loop-arrow{animation:arrow-reveal .16s ease-out calc(var(--ring-delay) + 1.1s) both}
.leader{stroke-dasharray:1;stroke-dashoffset:0;animation:line-wipe .8s ease-out var(--line-delay) both}
.stage-copy{animation:copy-enter .8s cubic-bezier(.16,1,.3,1) var(--copy-delay) both}
.center-title{font-size:25px;font-weight:600;fill:#0043ce}.center-subtitle{font-size:15px;fill:#525252}
.sources{position:absolute;bottom:80px;left:72px;right:72px;border-top:1px solid #d6d6d6;padding-top:10px;font-size:12px;color:#525252}
.sources a{color:#525252;text-decoration:none;border-bottom:1px dotted #8d8d8d}
@keyframes segment-enter{from{opacity:0;transform:translateY(7px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes line-wipe{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes arrow-reveal{from{opacity:0}to{opacity:1}}
@keyframes copy-enter{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.instant .ring-piece,.instant .ring-segment,.instant .loop-arrow,.instant .leader,.instant .stage-copy{animation:none}
@media(prefers-reduced-motion:reduce){.ring-piece,.ring-segment,.loop-arrow,.leader,.stage-copy{animation:none!important}}
@media print{.ring-piece,.ring-segment,.loop-arrow,.leader,.stage-copy{animation:none!important}.replay{display:none}}
</style>
