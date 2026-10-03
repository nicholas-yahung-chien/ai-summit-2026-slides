<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
defineProps({ kind: { type: String, required: true } })
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
const agents = [
  { name: '單代理', value: 52.2 },
  { name: '混合式多代理', value: 51.1 },
  { name: '集中協調多代理', value: 50.6 },
  { name: '分散協調多代理', value: 49.4 },
  { name: '獨立執行多代理', value: 44.4 },
]
// Cost per million requests; identical 95 input + 264 output tokens assumed.
// Historical Appendix D prices and Table 7 routing overhead, not an invoice.
const baselineCost = 95 * 10 + 264 * 30
const routingCost = 0.134 * baselineCost + 0.866 * (95 + 264) * 0.24 + 3.32
const savings = (1 - routingCost / baselineCost) * 100
</script>

<template>
  <section :key="replay" class="western" :class="{ instant: !active || $renderContext === 'print' }">
    <p class="eyebrow">{{ kind === 'agents' ? 'RESEARCH 01 · GOOGLE × MIT' : 'RESEARCH 02 · ROUTELLM' }}</p>
    <h1>{{ kind === 'agents' ? '程式修復表現比較：單代理 vs 多代理' : '品質與費用比較：單模型 vs 多模型路由' }}</h1>

    <template v-if="kind === 'agents'">
      <div class="agent-layout">
        <div>
          <div class="chart-heading">SWE-bench Verified · 跨模型平均解題率 <span>0–60%</span></div>
          <div v-for="(row, index) in agents" :key="row.name" class="agent-row" :style="{ '--delay': `${150 + index * 200}ms` }">
            <span>{{ row.name }}</span><div class="track"><i :style="{ width: `${row.value / 60 * 100}%`, background: index === 0 ? '#0f62fe' : '#697785' }" /></div><b>{{ row.value.toFixed(1) }}%</b>
          </div>
        </div>
        <aside><p class="aside-label">這次測試的結果</p><h2>在程式修復測試中，<br>單代理的平均表現較好</h2><p>修程式需要掌握前後脈絡<br>能不能分工，要看任務怎麼拆</p><p class="counterpoint">同一研究中，能拆開處理的<span class="highlight-task">金融分析任務</span>，多代理就有幫助</p></aside>
      </div>
      <p class="limits">測試涵蓋 20 題、8 種模型</p>
    </template>
    <template v-else>
      <div class="route-heading">MT-Bench 評測 · GPT-4 與 Mixtral 8×7B 搭配使用 · RouteLLM</div>
      <RouteDumbbells :baseline-cost="baselineCost" :routing-cost="routingCost" :savings="savings" />
      <p class="takeaway">估算費用減少 {{ savings.toFixed(1) }}% <span>／ 評分少 0.5 分，約為 GPT-4 的 95%</span></p>
      <p class="limits cost-assumptions">費用按論文當時價格估算，不是實際帳單或目前報價；每次以輸入 95、輸出 264 tokens 計算<br>每百萬輸入／輸出 tokens：GPT-4 $10／$30、Mixtral $0.24／$0.24；另計每百萬次請求 $3.32 的路由成本</p>
    </template>

    <ResearchCitation :source="kind" />
  </section>
</template>

<style scoped>
.western h1 { font-size:43px; margin:14px 0; letter-spacing:-.035em; }
.agent-layout { display:grid; grid-template-columns:2fr 1fr; gap:40px; margin-top:25px; }
.chart-heading { font-size:21px; padding-bottom:12px; border-bottom:1px solid #a8a8a8; }
.chart-heading span { float:right; font-size:17px; color:#525252; }
.agent-row { display:grid; grid-template-columns:190px 1fr 86px; gap:16px; align-items:center; height:47px; font-size:21px; }
.agent-row b { text-align:right; font-size:25px; font-weight:500; }
.track { height:12px; background:#e0e5eb; }
.track i { display:block; height:100%; transform-origin:left; animation:grow 800ms cubic-bezier(.22,1,.36,1) var(--delay,200ms) both; }
.agent-row b,.route-row b { animation:appear 400ms ease-out calc(var(--delay,200ms) + 400ms) both; }
aside { border-left:1px solid #c6c6c6; padding-left:30px; }
.western aside .aside-label { font-size:18px; color:#0043ce; }
.western aside h2 { font-size:30px; line-height:1.5; margin:8px 0 12px; color:#0043ce; }
.western aside p { font-size:19px; line-height:1.6; }
.western aside .counterpoint { margin-top:13px; color:#525252; }
.highlight-task { color:#0043ce; font-weight:500; text-decoration:underline; text-decoration-thickness:2px; text-underline-offset:5px; white-space:nowrap; }
.western .limits { font-size:17px; color:#525252; margin-top:18px; line-height:1.5; }
.route-heading { margin-top:18px; font-size:19px; color:#525252; }
.western .takeaway { font-size:25px; color:#0043ce; margin-top:8px; padding-top:0; border:0; }
.western .takeaway + .limits { margin-top:8px; }
.western .takeaway span { font-size:21px; }
.western .cost-assumptions { font-size:16px; line-height:1.5; }
@keyframes grow { from { transform:scaleX(0); } to { transform:scaleX(1); } }
@keyframes appear { from { opacity:0; } to { opacity:1; } }
.instant .track i,.instant b { animation:none; }
@media (prefers-reduced-motion:reduce) { .track i,.agent-row b,.route-row b { animation:none !important; } }
@media print { .track i,.agent-row b,.route-row b { animation:none !important; } }
</style>
