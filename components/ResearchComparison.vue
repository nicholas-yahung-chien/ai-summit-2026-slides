<script setup>
defineProps({ kind: { type: String, required: true } })
const agents = [
  { name: '單代理', detail: 'Vanilla', quality: 53.33, tokens: 116, label: '116K', color: '#0f62fe' },
  { name: '多代理・多輪', detail: '未精簡協作', quality: 49.17, tokens: 3092, label: '3,092K', color: '#697785' },
  { name: '精簡多代理', detail: 'AgentDropout', quality: 55.84, tokens: 1459, label: '1,459K', color: '#007d79' },
]
</script>

<template>
  <section class="study" :aria-label="kind === 'agents' ? '單代理與多代理程式生成研究比較' : '多模型路由與單模型研究比較'">
    <p class="eyebrow">{{ kind === 'agents' ? 'RESEARCH 01 · CODE GENERATION' : 'RESEARCH 02 · MODEL ROUTING' }}</p>
    <h1>{{ kind === 'agents' ? '增加代理，未必增加交付品質。' : '選對模型，能降低推理費用。' }}</h1>
    <p class="study-context">{{ kind === 'agents' ? 'AgentDropout · ACL 2025 ／ HumanEval · 同一 Llama3-8B-Instruct' : 'LLMRouterBench · ACL Findings 2026 ／ 多任務評測 · Avengers-Pro 路由' }}</p>

    <div v-if="kind === 'agents'" class="agent-chart">
      <div class="chart-head"><span>同一程式生成評測</span><span>品質 · Pass@1 ↑<small>0–60%</small></span><span>資源成本 · 總 tokens ↓<small>0–3,200K</small></span></div>
      <div v-for="row in agents" :key="row.name" class="chart-row">
        <div class="row-name">{{ row.name }}<small>{{ row.detail }}</small></div>
        <div class="bar-cell"><strong :style="{ color: row.color }">{{ row.quality }}<span>%</span></strong><div class="track"><i :style="{ width: `${row.quality / 60 * 100}%`, background: row.color }" /></div></div>
        <div class="bar-cell"><strong :style="{ color: row.color }">{{ row.label }}</strong><div class="track"><i :style="{ width: `${row.tokens / 3200 * 100}%`, background: row.color }" /></div></div>
      </div>
    </div>

    <div v-else class="routing-chart">
      <div class="route-path"><span>相同任務集</span><b>→</b><span>依任務選模型</span><b>→</b><span>維持整體品質</span></div>
      <div class="routing-columns">
        <div><h2>整體品質<span>以最佳單模型為 100</span></h2><div class="indexed"><span>固定 GPT-5</span><b>100</b></div><div class="indexed selected"><span>多模型路由</span><b>≥100</b></div><p>選取達到基準品質的最低費用設定</p></div>
        <div><h2>推理費用<span>以最佳單模型為 100</span></h2><div class="cost-row"><span>固定 GPT-5</span><div class="track"><i style="width:100%;background:#697785" /></div><b>100</b></div><div class="cost-row"><span>多模型路由</span><div class="track"><i style="width:68.3%;background:#0f62fe" /></div><b>68.3</b></div><p class="saving">−31.7% <span>費用，非 token 數量</span></p></div>
      </div>
    </div>

    <p class="study-takeaway">{{ kind === 'agents' ? '與 Uncle Bob 的觀察相呼應：協作負擔，需要被驗證。' : '從「增加執行者」，走向「把工作交給合適的模型」。' }}</p>
    <p class="study-caveat">{{ kind === 'agents' ? '整批輸入＋輸出 tokens；費用代理指標，非美元帳單。此設定不代表所有多代理系統。' : '多任務整體結果，非程式生成專屬；非每題保證。研究結果不是 Jev 或 IBM Bob 的實測。' }}</p>
    <a class="study-source" :href="kind === 'agents' ? 'https://aclanthology.org/2025.acl-long.1170.pdf' : 'https://aclanthology.org/2026.findings-acl.1881.pdf'" target="_blank" rel="noopener">{{ kind === 'agents' ? 'AgentDropout · Tables 1–2 ↗' : 'LLMRouterBench · Figure 6 · CostSave ↗' }}</a>
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
.track i { display:block; height:100%; }
.study .study-takeaway { font-size:27px; color:#0043ce; margin-top:18px; font-weight:500; }
.study .study-caveat { font-size:17px; color:#525252; margin-top:11px; }
.study-source { display:inline-block; font-size:16px; color:#0043ce; margin-top:7px; text-decoration:underline; text-underline-offset:3px; }
.route-path { display:flex; gap:24px; align-items:center; font-size:23px; margin-top:28px; padding:14px 0; border-top:1px solid #a8a8a8; border-bottom:1px solid #a8a8a8; }
.route-path b { color:#0f62fe; font-weight:400; }
.routing-columns { display:grid; grid-template-columns:1fr 1fr; gap:55px; margin-top:24px; }
.routing-columns > div + div { border-left:1px solid #c6c6c6; padding-left:40px; }
.routing-columns h2 { font-size:25px; margin:0 0 14px; }
.routing-columns h2 span { display:block; font-size:17px; color:#525252; font-weight:400; margin-top:3px; }
.indexed { display:flex; justify-content:space-between; align-items:center; font-size:23px; height:54px; }
.indexed b { font-size:35px; font-weight:500; }
.selected { color:#0043ce; }
.routing-columns p { font-size:17px; color:#525252; margin-top:13px; }
.cost-row { display:grid; grid-template-columns:126px 1fr 68px; align-items:center; gap:12px; height:54px; font-size:21px; }
.cost-row b { font-size:28px; font-weight:500; text-align:right; }
.routing-columns .saving { font-size:35px; font-weight:600; color:#0043ce; margin-top:9px; }
.saving span { font-size:18px; font-weight:400; }
</style>
