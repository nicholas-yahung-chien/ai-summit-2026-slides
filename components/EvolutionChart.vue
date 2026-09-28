<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { eras, milestones } from '../data/ai-milestones'
const replay = ref(0)
const selected = ref(-1)
const closeButton = ref<HTMLButtonElement>()
const sourceLink = ref<HTMLAnchorElement>()
let opener: HTMLElement | null = null
async function show(index: number, event: MouseEvent) {
  opener = event.currentTarget as HTMLElement
  selected.value = index
  await nextTick()
  closeButton.value?.focus()
}
function close() { selected.value = -1; opener?.focus() }
function trap(event: KeyboardEvent) {
  if (event.key === 'Escape') { event.preventDefault(); close() }
  if (event.key === 'Tab') { event.preventDefault(); (event.target === closeButton.value ? sourceLink.value : closeButton.value)?.focus() }
}
const x = (i: number) => 74 + i * 148
const y = (i: number) => 82 - i * 5
const path = Array.from({length:8}, (_,i) => `${i ? 'L' : 'M'}${x(i)} ${y(i)}`).join(' ')
</script>

<template>
  <div class="evolution-chart">
    <header class="timeline-toolbar"><span>AI 演進 <b>1950—2026</b> · 24 個代表里程碑</span><button @click.stop="replay++" @keydown.stop>重播折線 ↻</button></header>
    <div :key="replay" class="timeline-bands">
      <section v-for="(era,row) in eras" :key="era.title" class="era-band" :style="{'--era':era.color}">
        <header><strong>{{ era.title }}</strong><span>{{ era.span }} <b v-if="row < 2">／續下列 ↓</b></span></header>
        <div class="era-plot">
          <svg viewBox="0 0 1184 150" aria-hidden="true">
            <path d="M0 95 H1184" stroke="#d6d6d6" stroke-dasharray="3 7" />
            <path class="evolution-line" :d="path" pathLength="1" fill="none" stroke="var(--era)" stroke-width="3" :style="{animationDelay:`${row * 1.3}s`}" />
            <g v-for="i in 8" :key="i"><path :d="`M${x(i-1)} ${y(i-1)} V97`" stroke="#b8b8b8"/><circle :cx="x(i-1)" :cy="y(i-1)" r="6" fill="var(--era)" stroke="#f4f4f4" stroke-width="3" /></g>
          </svg>
          <button v-for="(p,i) in milestones.slice(row*8,row*8+8)" :key="p.title+p.date" class="milestone" @click.stop="show(row*8+i,$event)" @keydown.stop :aria-label="`${p.date} ${p.title}：${p.subtitle}，查看說明與來源`">
            <time :style="{top:`${y(i)-36}px`}">{{ p.date }}</time>
            <span class="milestone-copy"><strong>{{ p.title }}</strong><span>{{ p.subtitle }}</span></span>
          </button>
        </div>
      </section>
    </div>
    <div class="timeline-note"><p>由左至右、由上至下閱讀；點選節點查看說明與來源。</p><p>事件等距排列；折線高度為敘事示意，不代表能力分數、成長率或等距時間。</p></div>
    <div v-if="selected >= 0" class="milestone-overlay" @click.stop="close">
      <section role="dialog" aria-modal="true" aria-labelledby="milestone-title" class="milestone-detail" @click.stop @keydown.stop="trap">
        <button ref="closeButton" class="close-detail" @click="close">關閉 ×</button>
        <time>{{ milestones[selected].date }}</time><h2 id="milestone-title">{{ milestones[selected].title }}</h2>
        <p>{{ milestones[selected].detail }}</p><a ref="sourceLink" :href="milestones[selected].source" target="_blank" rel="noopener">查看來源 ↗</a>
      </section>
    </div>
  </div>
</template>

<style scoped>
.evolution-chart { width:1184px; color:#161616; }
.timeline-toolbar { display:flex; align-items:center; justify-content:space-between; height:38px; font-size:18px; color:#525252; }
.timeline-toolbar b { color:#0043ce; margin-left:12px; }
button { cursor:pointer; }
.timeline-toolbar button { font-size:16px; padding:5px 12px; color:#0043ce; background:#e0e9ff; }
.timeline-bands { margin-top:14px; }
.era-band { height:185px; border-top:1px solid #c6c6c6; }
.era-band > header { display:flex; align-items:center; justify-content:space-between; padding-top:8px; font-size:18px; color:var(--era); }
.era-band header strong { font-weight:600; }
.era-band header span { font-size:15px; color:#525252; }
.era-band header b { font-weight:400; margin-left:16px; }
.era-plot { height:150px; position:relative; display:grid; grid-template-columns:repeat(8,1fr); }
svg { position:absolute; inset:0; width:100%; height:150px; pointer-events:none; }
.evolution-line { stroke-dasharray:1; animation:trace 1.3s ease-out both; }
.milestone { position:relative; height:150px; padding:0; text-align:center; background:transparent; border:0; color:#161616; }
.milestone:hover { background:#0f62fe08; }
button:focus-visible,a:focus-visible { outline:3px solid #0f62fe; outline-offset:2px; }
.milestone time { position:absolute; left:0; right:0; color:var(--era); font-size:19px; font-weight:500; font-variant-numeric:tabular-nums; }
.milestone-copy { position:absolute; left:0; right:0; top:99px; }
.milestone-copy strong { display:block; font-size:20px; line-height:1.4; letter-spacing:-.03em; white-space:nowrap; }
.milestone-copy > span { display:block; font-size:16px; line-height:1.5; color:#525252; margin-top:2px; }
.timeline-note { margin-top:5px; font-size:15px; line-height:1.6; color:#525252; }
.milestone-overlay { position:absolute; inset:0; z-index:30; background:#001d6c70; display:grid; place-items:center; }
.milestone-detail { width:800px; padding:42px; background:#f4f4f4; box-shadow:0 12px 60px #001d6c33; position:relative; }
.milestone-detail time { color:#0043ce; font-size:24px; }
.milestone-detail h2 { font-size:38px; margin:12px 0 24px; }
.milestone-detail p { font-size:27px; line-height:1.7; }
.milestone-detail a { display:inline-block; margin-top:28px; color:#0043ce; font-size:22px; }
.close-detail { position:absolute; right:24px; top:24px; font-size:18px; color:#0043ce; }
@keyframes trace { from {stroke-dashoffset:1} to {stroke-dashoffset:0} }
@media(prefers-reduced-motion:reduce) { .evolution-line { animation:none; } }
@media print { .milestone-overlay,.timeline-toolbar button { display:none; } .evolution-line { animation:none; } }
</style>
