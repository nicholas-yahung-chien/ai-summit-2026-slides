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
const money = value => value.toLocaleString('en-US', { maximumFractionDigits: 0 })
const routes = [
  { name: '固定 GPT-4', score: 9.3, calls: 100, cost: baselineCost, scoreColor: '#0f62fe', color: '#697785' },
  { name: 'RouteLLM', score: 8.8, calls: 13.4, cost: routingCost, scoreColor: '#697785', color: '#0f62fe' },
]
</script>

<template>
  <section :key="replay" class="western" :class="{ instant: !active || $renderContext === 'print' }">
    <p class="eyebrow">{{ kind === 'agents' ? 'RESEARCH 01 · GOOGLE × MIT' : 'RESEARCH 02 · ROUTELLM' }}</p>
    <h1>{{ kind === 'agents' ? '程式修復：更多代理，未必更好。' : '保留約 95% 評分，減少昂貴模型呼叫。' }}</h1>

    <template v-if="kind === 'agents'">
      <div class="agent-layout">
        <div>
          <div class="chart-heading">SWE-bench Verified · 跨模型平均解題率 <span>0–60%</span></div>
          <div v-for="(row, index) in agents" :key="row.name" class="agent-row" :style="{ '--delay': `${150 + index * 200}ms` }">
            <span>{{ row.name }}</span><div class="track"><i :style="{ width: `${row.value / 60 * 100}%`, background: index === 0 ? '#0f62fe' : '#697785' }" /></div><b>{{ row.value.toFixed(1) }}%</b>
          </div>
        </div>
        <aside><p class="aside-label">比較結果</p><h2>在程式修復測試情境下，<br>單代理平均較佳。</h2><p>程式修復需要共享上下文；<br>協作效益取決於任務結構。</p><p class="counterpoint">同篇研究中，可拆分的<span class="highlight-task">金融分析任務</span>則受益於多代理。</p></aside>
      </div>
      <p class="limits">20 題子集、8 種模型；單一配置信賴區間寬。此圖不代表所有程式任務，也不提供同設定費用比較。</p>
    </template>
    <template v-else>
      <div class="route-heading">MT-Bench ／ Matrix Factorization · Arena + Judge 訓練資料 · CPT(50%) 設定</div>
      <div class="route-grid head"><span>同一評測設定</span><span>評測分數 <small>0–10 分</small></span><span>推算費用 · USD <small>每百萬次請求</small></span></div>
      <div v-for="(row, index) in routes" :key="row.name" class="route-grid route-row" :style="{ '--delay': `${200 + index * 450}ms` }">
        <span>{{ row.name }}<small class="call-share">GPT-4 呼叫 {{ row.calls }}%</small></span>
        <div><b :style="{ color: row.scoreColor }">{{ row.score.toFixed(1) }}<small> / 10</small></b><div class="track"><i :style="{ width: `${row.score * 10}%`, background: row.scoreColor }" /></div></div>
        <div><b :style="{ color: row.color }">${{ money(row.cost) }}</b><div class="track"><i :style="{ width: `${row.cost / baselineCost * 100}%`, background: row.color }" /></div></div>
      </div>
      <p class="takeaway">推算節省 {{ savings.toFixed(1) }}% 費用 <span>／ 評分 9.3 → 8.8，約保留 95%</span></p>
      <p class="limits cost-assumptions">依論文歷史價格推算，非實測帳單或現行報價。每次假設 95 輸入＋264 輸出 tokens。<br>每百萬輸入／輸出 tokens：GPT-4 $10／$30、Mixtral $0.24／$0.24；另含 $3.32 路由開銷／百萬次請求。</p>
    </template>

    <ResearchCitation :source="kind" />
  </section>
</template>

<style scoped>
.western h1 { font-size:43px; margin:14px 0; letter-spacing:-.035em; }
.western .context { font-size:20px; color:#525252; }
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
.highlight-task { color:#0043ce; font-weight:500; text-decoration:underline; text-decoration-thickness:2px; text-underline-offset:5px; }
.western .limits { font-size:17px; color:#525252; margin-top:18px; line-height:1.5; }
.route-heading { margin-top:18px; font-size:19px; color:#525252; }
.route-grid { display:grid; grid-template-columns:205px 1fr 1fr; gap:38px; align-items:center; }
.head { font-size:23px; margin-top:14px; padding-bottom:10px; border-bottom:1px solid #a8a8a8; }
.head small { font-size:17px; margin-left:10px; color:#525252; }
.route-row { height:66px; font-size:26px; border-bottom:1px solid #d8dce2; }
.route-row b { display:block; font-size:36px; line-height:1.4; font-weight:500; }
.route-row b small { font-size:22px; }
.western .takeaway { font-size:25px; color:#0043ce; margin-top:12px; }
.western .takeaway + .limits { margin-top:8px; }
.call-share { display:block; font-size:17px; color:#525252; margin-top:3px; }
.western .takeaway span { font-size:21px; }
.western .cost-assumptions { font-size:16px; line-height:1.5; }
@keyframes grow { from { transform:scaleX(0); } to { transform:scaleX(1); } }
@keyframes appear { from { opacity:0; } to { opacity:1; } }
.instant .track i,.instant b { animation:none; }
@media (prefers-reduced-motion:reduce) { .track i,.agent-row b,.route-row b { animation:none !important; } }
@media print { .track i,.agent-row b,.route-row b { animation:none !important; } }
</style>
