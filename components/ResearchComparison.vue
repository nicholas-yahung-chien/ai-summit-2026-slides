<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
defineProps({ kind: { type: String, required: true } })
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
const agents = [
  { name: '單代理', detail: 'Vanilla', quality: 53.33, tokens: 116, label: '116K', color: '#0f62fe' },
  { name: '多代理・多輪', detail: '未精簡協作', quality: 49.17, tokens: 3092, label: '3,092K', color: '#697785' },
  { name: '精簡多代理', detail: 'AgentDropout', quality: 55.84, tokens: 1459, label: '1,459K', color: '#007d79' },
]
</script>

<template>
  <section :key="replay" class="study" :class="{ instant: !active || $renderContext === 'print' }" :aria-label="kind === 'agents' ? '單代理與多代理程式生成研究比較' : '多模型路由與單模型研究比較'">
    <p class="eyebrow">{{ kind === 'agents' ? 'RESEARCH 01 · CODE GENERATION' : 'RESEARCH 02 · MODEL ROUTING' }}</p>
    <h1>{{ kind === 'agents' ? '增加代理，未必增加交付品質' : '模型路由：提升品質，或降低費用' }}</h1>
    <p class="study-context">{{ kind === 'agents' ? 'AgentDropout · ACL 2025 ／ HumanEval · 同一 Llama3-8B-Instruct' : 'LLMRouterBench · ACL Findings 2026 ／ 多任務評測 · Avengers-Pro 路由' }}</p>

    <div v-if="kind === 'agents'" class="agent-chart">
      <div class="chart-head"><span>同一程式生成評測</span><span>品質 · Pass@1 ↑<small>0–60%</small></span><span>資源成本 · 總 tokens ↓<small>0–3,200K</small></span></div>
      <div v-for="(row, index) in agents" :key="row.name" class="chart-row" :style="{ '--bar-delay': `${200 + index * 350}ms` }">
        <div class="row-name">{{ row.name }}<small>{{ row.detail }}</small></div>
        <div class="bar-cell"><strong :style="{ color: row.color }">{{ row.quality }}<span>%</span></strong><div class="track"><i :style="{ width: `${row.quality / 60 * 100}%`, background: row.color }" /></div></div>
        <div class="bar-cell"><strong :style="{ color: row.color }">{{ row.label }}</strong><div class="track"><i :style="{ width: `${row.tokens / 3200 * 100}%`, background: row.color }" /></div></div>
      </div>
    </div>

    <div v-else class="routing-chart">
      <div class="route-path"><span>相同任務集 · 對照固定 GPT-5</span><b>→</b><span>兩種最佳化目標，兩種設定</span></div>
      <div class="routing-columns">
        <div><h2>01 ／ 品質優先<span>取平均正確率最高的路由設定</span></h2><p class="saving quality-gain">+4.0% <span>平均正確率 · 相對提升</span></p><div class="cost-row"><span>固定 GPT-5</span><div class="track"><i style="width:96.1538%;background:#697785" /></div><b>1.00×</b></div><div class="cost-row"><span>多模型路由</span><div class="track"><i style="width:100%;background:#0f62fe" /></div><b>1.04×</b></div><p>相對基準提升 4%，不是增加 4 個百分點</p></div>
        <div><h2>02 ／ 費用優先<span>品質不低於 GPT-5，取最低費用設定</span></h2><p class="saving">−31.7% <span>推理費用</span></p><div class="cost-row"><span>固定 GPT-5</span><div class="track"><i style="width:100%;background:#697785" /></div><b>1.00×</b></div><div class="cost-row"><span>多模型路由</span><div class="track"><i style="width:68.3%;background:#0f62fe" /></div><b>0.683×</b></div><p>維持基準品質，費用約為原本的三分之二</p></div>
      </div>
    </div>

    <p v-if="kind === 'routing'" class="routing-note">兩項成果來自不同設定，不能解讀為同時「品質 +4.0%、費用 −31.7%」</p>
    <div class="study-reference" lang="en">
      <p v-if="kind === 'agents'">Zhexuan Wang, Yutong Wang, Xuebo Liu, Liang Ding, Miao Zhang, Jie Liu, and Min Zhang. 2025. <a href="https://aclanthology.org/2025.acl-long.1170/" target="_blank" rel="noopener">AgentDropout: Dynamic Agent Elimination for Token-Efficient and High-Performance LLM-Based Multi-Agent Collaboration.</a> In <em>Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)</em>, pages 24013–24035, Vienna, Austria. Association for Computational Linguistics. <a href="https://doi.org/10.18653/v1/2025.acl-long.1170" target="_blank" rel="noopener">doi:10.18653/v1/2025.acl-long.1170</a>. <b>Data: Tables 1–2.</b></p>
      <p v-else>Hao Li, Yiqun Zhang, Zhaoyan Guo, Chenxu Wang, Shengji Tang, Qiaosheng Zhang, Yang Chen, Biqing Qi, Peng Ye, Lei Bai, Zhen Wang, and Shuyue Hu. 2026. <a href="https://aclanthology.org/2026.findings-acl.1881/" target="_blank" rel="noopener">LLMRouterBench: A Massive Benchmark and Unified Framework for LLM Routing.</a> In <em>Findings of the Association for Computational Linguistics: ACL 2026</em>, pages 37733–37754, San Diego, California, United States. Association for Computational Linguistics. <a href="https://doi.org/10.18653/v1/2026.findings-acl.1881" target="_blank" rel="noopener">doi:10.18653/v1/2026.findings-acl.1881</a>. <b>Data: Figure 6; §3.4 (PerfGain / CostSave).</b></p>
    </div>
  </section>
</template>

<style scoped>
.study h1 { font-size:46px; margin:14px 0 14px; letter-spacing:-.035em; }
.study .study-context { font-size:20px; color:#525252; }
.agent-chart { margin-top:26px; }
.chart-head,.chart-row { display:grid; grid-template-columns:235px 1fr 1fr; gap:34px; }
.chart-head { font-size:22px; border-bottom:1px solid #a8a8a8; padding-bottom:10px; }
.chart-head small { display:block; font-size:16px; color:#525252; }
.chart-row { align-items:center; height:79px; border-bottom:1px solid #d8dce2; }
.row-name { font-size:25px; font-weight:500; }
.row-name small { display:block; font-size:17px; color:#525252; font-weight:400; }
.bar-cell strong { display:block; font-size:31px; line-height:1.3; font-weight:600; font-variant-numeric:tabular-nums; }
.bar-cell strong span { font-size:22px; }
.track { height:10px; background:#e0e5eb; width:100%; }
.track i { display:block; height:100%; transform-origin:left center; animation:bar-reveal 800ms cubic-bezier(.22,1,.36,1) var(--bar-delay,200ms) both; }
.bar-cell strong,.cost-row b { animation:value-reveal 400ms ease-out calc(var(--bar-delay,200ms) + 400ms) both; }
.cost-row:nth-of-type(2) { --bar-delay:650ms; }
.saving { animation:value-reveal 450ms ease-out 1300ms both; }
@keyframes bar-reveal { from { transform:scaleX(0); } to { transform:scaleX(1); } }
@keyframes value-reveal { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:none; } }
.instant .track i,.instant .bar-cell strong,.instant .cost-row b,.instant .saving { animation:none; }
@media (prefers-reduced-motion:reduce) { .track i,.bar-cell strong,.cost-row b,.saving { animation:none !important; } }
@media print { .track i,.bar-cell strong,.cost-row b,.saving { animation:none !important; } }
.study .study-takeaway { font-size:27px; color:#0043ce; margin-top:10px; font-weight:500; }
.study-reference { position:absolute; left:72px; right:72px; bottom:83px; padding-top:12px; border-top:1px solid #c6c6c6; font-size:15px; line-height:1.45; color:#393939; }
.study-reference a { color:#0043ce; text-decoration:none; }
.study-reference a:hover { text-decoration:underline; }
.study-reference b { font-weight:600; }
.route-path { display:flex; gap:24px; align-items:center; font-size:23px; margin-top:14px; padding:7px 0; border-top:1px solid #a8a8a8; border-bottom:1px solid #a8a8a8; }
.route-path b { color:#0f62fe; font-weight:400; }
.routing-columns { display:grid; grid-template-columns:1fr 1fr; gap:55px; margin-top:16px; }
.routing-columns > div + div { border-left:1px solid #c6c6c6; padding-left:40px; }
.routing-columns h2 { font-size:25px; margin:0 0 6px; }
.routing-columns h2 span { display:block; font-size:17px; color:#525252; font-weight:400; margin-top:3px; }
.indexed { display:flex; justify-content:space-between; align-items:center; font-size:23px; height:54px; }
.indexed b { font-size:35px; font-weight:500; }
.selected { color:#0043ce; }
.routing-columns p { font-size:17px; color:#525252; margin-top:7px; }
.cost-row { display:grid; grid-template-columns:126px 1fr 86px; align-items:center; gap:12px; height:44px; font-size:21px; }
.cost-row b { font-size:28px; font-weight:500; text-align:right; }
.study .routing-note { font-size:18px; color:#525252; margin-top:0; }
.routing-columns .saving { font-size:44px; font-weight:600; color:#0043ce; margin-top:5px; }
.saving span { font-size:18px; font-weight:400; }
</style>
