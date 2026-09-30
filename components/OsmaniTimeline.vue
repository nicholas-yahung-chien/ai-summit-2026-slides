<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
const showAll = ref(false)
function restart() { showAll.value = false; replay.value++ }
watch(active, value => { if (value) restart() })
const milestones = [
  { date: '01.04', title: 'My LLM coding workflow\ngoing into 2026', method: '人與 AI 結對\n小步實作、逐步驗證', detail: '人提供方向與上下文', when: '2025 年累積', progress: '程式助理能讀取專案\n運用工具、執行測試', shift: '協助人完成每一小步' },
  { date: '04.19', title: 'Agent Harness\nEngineering', method: '隨模型能力\n調整約束與檢查', detail: '移除失效機制，補上新需求', when: '2 月模型更新後', progress: '代理因上下文壓力\n而提早收工的情況減少', shift: '部分補救機制不再需要' },
  { date: '06.07', title: 'Loop\nEngineering', method: '由人設計迴圈\n讓代理持續推進', detail: '從逐次提示，走向流程設計', when: '截至 6 月的工具進展', progress: '排程、隔離工作與子代理\n逐漸成為內建能力', shift: '減少人手動串接與催促' },
  { date: '08.14', title: 'Practical Loop\nEngineering', method: '依任務風險\n決定自主程度', detail: '可驗證就委派，敏感就緊盯', when: '文章發表前的功能成熟', progress: '目標驅動與排程迴圈\n可組合成持續工作流程', shift: '人集中判斷目標與品質' },
]
</script>

<template>
  <section class="osmani-timeline" :class="{ instant: showAll || !active || $renderContext === 'print' }">
    <p class="eyebrow">ADDY OSMANI · Google Cloud AI Director</p>
    <h1>AI 能力持續進步，開發方法也跟著改變</h1>
    <div class="timeline-actions" @click.stop @pointerdown.stop><button @click="restart">重播時間軸 ↻</button><button @click="showAll = true">顯示全部</button></div>
    <div :key="replay" class="timeline" aria-label="Addy Osmani 2026 年一月至八月的開發方法演進，節點為文章日期，依序排列">
      <div class="rail" aria-hidden="true"></div>
      <article v-for="(item, i) in milestones" :key="item.date" :style="{ '--delay': `${i * 1.8}s` }">
        <div class="above">
          <p class="article-title">{{ item.title }}</p>
          <h2>{{ item.method }}</h2>
          <p class="detail">{{ item.detail }}</p>
        </div>
        <div class="connector" aria-hidden="true"></div>
        <div v-if="i < milestones.length - 1" class="progress-line" aria-hidden="true"></div>
        <div class="node" aria-hidden="true"></div>
        <time :datetime="`2026-${item.date.replace('.', '-')}`">{{ item.date }}</time>
        <div class="below">
          <p class="when">{{ item.when }}</p>
          <p class="ai-label">AI 進展</p>
          <p class="progress">{{ item.progress }}</p>
          <p class="shift">{{ item.shift }}</p>
        </div>
      </article>
    </div>
    <div class="sources">
      <p>Osmani, A. (2026, January 4). <a href="https://addyosmani.com/blog/ai-coding-workflow/" target="_blank" rel="noopener"><cite>My LLM coding workflow going into 2026</cite></a>.</p>
      <p>Osmani, A. (2026, April 19). <a href="https://addyosmani.com/blog/agent-harness-engineering/" target="_blank" rel="noopener"><cite>Agent harness engineering</cite></a>.</p>
      <p>Osmani, A. (2026, June 7). <a href="https://addyosmani.com/blog/loop-engineering/" target="_blank" rel="noopener"><cite>Loop engineering</cite></a>.</p>
      <p>Osmani, A. (2026, August 14). <a href="https://addyosmani.com/blog/practical-loop-engineering/" target="_blank" rel="noopener"><cite>Practical loop engineering</cite></a>.</p>
    </div>
  </section>
</template>

<style scoped>
h1{font-size:41px!important;line-height:1.2!important;margin:12px 0 0!important;letter-spacing:-1px}
.timeline-actions{display:flex;justify-content:flex-end;gap:17px;margin:10px 0 0;height:23px}
button{font-size:12px;line-height:1.3;color:#525252;background:none;border-bottom:1px solid #a8a8a8;padding:1px 0}
button:hover{color:#0043ce}button:focus-visible{outline:2px solid #0f62fe;outline-offset:4px}
.timeline{display:grid;grid-template-columns:repeat(4,1fr);position:relative;height:407px;margin-top:8px}
article{position:relative;padding:0 14px 0 18px;min-width:0}
.above{height:169px;animation:copy-enter .65s cubic-bezier(.16,1,.3,1) calc(var(--delay) + .2s) both}
.article-title{font-size:17px;line-height:1.35;color:#525252;white-space:pre-line;height:49px;margin:0 0 9px}
h2{font-size:25px;font-weight:600;line-height:1.35;color:#0043ce;white-space:pre-line;margin:0!important}
.detail{font-size:16px;color:#525252;margin:9px 0 0}
.rail{position:absolute;left:18px;right:22px;top:184px;height:2px;background:#d7e0ed}
.connector{position:absolute;left:22px;top:163px;height:22px;width:1px;background:#a6c8ff;animation:node-enter .5s ease var(--delay) both}
.node{position:absolute;left:15px;top:178px;width:15px;height:15px;background:#0f62fe;border:3px solid #f4f4f4;outline:1px solid #78a9ff;border-radius:50%;animation:node-enter .5s ease var(--delay) both}
.progress-line{position:absolute;left:22px;top:184px;width:100%;height:2px;background:#0f62fe;transform-origin:left;animation:line-grow 1.3s cubic-bezier(.4,0,.2,1) calc(var(--delay) + .65s) both}
time{position:absolute;left:18px;top:201px;font-size:24px;line-height:1;font-weight:600;color:#0043ce;letter-spacing:.04em;font-variant-numeric:tabular-nums;animation:copy-enter .5s ease var(--delay) both}
.below{margin-top:73px;animation:copy-enter .75s cubic-bezier(.16,1,.3,1) calc(var(--delay) + .85s) both}
.when{font-size:12px;color:#6f6f6f;margin:0 0 6px}
.ai-label{font-size:13px;letter-spacing:.08em;font-weight:600;color:#0072c3;margin:0 0 5px}
.progress{font-size:20px;line-height:1.5;white-space:pre-line;color:#161616;margin:0}
.shift{font-size:15px;color:#525252;margin:9px 0 0}
.sources{position:absolute;left:72px;right:72px;bottom:79px;border-top:1px solid #d6d6d6;padding-top:9px;display:grid;grid-template-columns:1.12fr 1fr;gap:5px 20px}
.sources p{font-size:10px;line-height:1.4;color:#525252;margin:0}
.sources a{color:inherit;text-decoration:none;border-bottom:1px dotted #8d8d8d}
@keyframes line-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes node-enter{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
@keyframes copy-enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.instant .above,.instant .below,.instant .node,.instant time,.instant .connector,.instant .progress-line{animation:none}
@media(prefers-reduced-motion:reduce){.above,.below,.node,time,.connector,.progress-line{animation:none!important}}
@media print{.above,.below,.node,time,.connector,.progress-line{animation:none!important}.timeline-actions{visibility:hidden}}
</style>
