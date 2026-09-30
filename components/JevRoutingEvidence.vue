<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
const showAll = ref(false)
function restart() { showAll.value = false; replay.value++ }
watch(active, value => { if (value) restart() })
</script>

<template>
  <section class="jev-evidence" :class="{ instant: showAll || !active || $renderContext === 'print' }">
    <p class="eyebrow">JEV · TWO ROUTING APPROACHES</p>
    <h1>Jev 路由：選擇模型，也能調整推理強度</h1>
    <div class="actions" @click.stop @pointerdown.stop><button @click="restart">重播 ↻</button><button @click="showAll = true">顯示全部</button></div>
    <div :key="replay" class="approaches">
      <article>
        <h2><span>01</span> 多模型路由</h2>
        <p class="question">這個任務，需要哪一種模型？</p>
        <div class="flow"><b>任務</b><i>→</i><b class="decision">Jev 判斷</b><i>→</i><div class="options"><span>快速模型</span><span>平衡模型</span><span>高能力模型</span></div></div>
        <div class="result">
          <p class="study">Vaaya 自家平台實測 · 50 題 × 3 次／組</p>
          <p class="saving"><strong>34.7<small>%</small></strong><span>用量費用減少</span></p>
          <p class="comparison"><span>$0.257437</span><i>→</i><b>$0.168121</b><small>USD／整組測試</small></p>
          <p class="quality">規則檢查通過率 <b>75.3% → 80.0%</b></p>
          <p class="quality">p95 延遲 <b>11.47 → 15.36 秒</b></p>
          <p class="limit">含 Jev 呼叫與平台 3% 加價<br>文字任務測試，非完整程式開發流程</p>
        </div>
      </article>
      <article>
        <h2><span>02</span> 同模型、多強度路由</h2>
        <p class="question">同一個模型，這次需要想多深？</p>
        <div class="flow"><b>任務</b><i>→</i><b class="decision">Jev 判斷</b><i>→</i><div class="options effort"><span>低強度</span><span>中強度</span><span>高強度</span></div></div>
        <div class="result">
          <p class="study">社群實測 · SWE-bench 保留集 6 題 × 6 次／組</p>
          <p class="saving"><strong>16.3<small>%</small></strong><span>輸出 tokens 減少</span></p>
          <p class="comparison"><span>1,800</span><i>→</i><b>1,507</b><small>tokens／次 · 含推理</small></p>
          <p class="quality">固定 high 與動態強度均通過 <b>36 / 36</b></p>
          <p class="quality">平均耗時 <b>118.4 → 111.0 秒</b></p>
          <p class="limit">同為 GPT-6 Astra · 平均耗時含路由<br>未報告美元節費率，不能將 tokens 當成帳單</p>
        </div>
      </article>
    </div>
    <p class="scope">兩組為不同工作負載的早期實測，不能直接比較節省幅度；分流與呼叫仍由應用程式執行</p>
    <div class="citations">
      <p>Khanna, A. (2026, September 20). <a href="https://vaaya.ai/blog/jev-ai-model-routing-vaaya-benchmark" target="_blank" rel="noopener"><cite>Jev model routing: What 450 real calls revealed</cite></a> [Benchmark report]. Vaaya. <a href="https://vaaya.ai/blog/assets/jev-model-routing-current/summary.json" target="_blank" rel="noopener">Data</a>.</p>
      <p>robertn702. (2026, September 25). <a href="https://github.com/robertn702/opencode-jev-router/blob/main/eval/results/router-consolidated-2026-09-25.md" target="_blank" rel="noopener"><cite>Jev router: Consolidated Astra evaluation</cite></a> [Benchmark report; preselected holdout]. GitHub.</p>
    </div>
  </section>
</template>

<style scoped>
h1{font-size:39px!important;line-height:1.2!important;margin:12px 0 0!important;letter-spacing:-.025em}
.actions{height:22px;display:flex;justify-content:flex-end;gap:18px;margin:8px 0 5px}
button{font-size:12px;color:#525252;border-bottom:1px solid #a8a8a8}button:focus-visible{outline:2px solid #0f62fe;outline-offset:4px}
.approaches{display:grid;grid-template-columns:1fr 1fr;gap:32px}
article+article{border-left:1px solid #c6c6c6;padding-left:32px}
h2{font-size:25px;margin:0!important;font-weight:600;color:#161616}h2 span{font-size:17px;color:#0043ce;margin-right:12px}
.question{font-size:19px;color:#525252;margin:6px 0 8px!important}
.flow{display:flex;align-items:center;gap:13px;height:57px;margin-bottom:6px;font-size:17px}
.flow>b{font-weight:500}.decision{color:#0043ce;border:1px solid #78a9ff;padding:9px 13px;background:#edf5ff}
i{font-style:normal;color:#6f6f6f}.options{display:flex;flex-direction:column;gap:2px;border-left:2px solid #0f62fe;padding-left:12px;font-size:15px;color:#0043ce}
.study{font-size:13px;color:#525252;margin:0 0 5px!important}
.saving{display:flex;align-items:baseline;gap:15px;margin:0!important;color:#0043ce}.saving strong{font-size:51px;line-height:1.2;font-weight:600;font-variant-numeric:tabular-nums}.saving small{font-size:29px}.saving>span{font-size:21px}
.comparison{display:flex;align-items:baseline;gap:10px;font-size:22px;margin:5px 0 8px!important;font-variant-numeric:tabular-nums}.comparison>span{color:#697782}.comparison b{color:#0043ce;font-weight:500}.comparison small{font-size:12px;color:#525252}
.quality{font-size:17px;line-height:1.5;margin:3px 0!important}.quality b{font-weight:500}
.limit{font-size:14px;line-height:1.45;color:#525252;margin:6px 0 0!important}
.scope{font-size:14px;color:#525252;margin:10px 0 0!important}
.citations{position:absolute;bottom:80px;left:72px;right:72px;border-top:1px solid #c6c6c6;padding-top:8px;font-size:11px;line-height:1.5;color:#393939}.citations p{margin:0 0 3px!important;padding-left:14px;text-indent:-14px}.citations a{color:inherit;border-bottom:1px dotted #8d8d8d;text-decoration:none}
.flow{animation:jev-enter .7s ease .2s both}.result{animation:jev-enter .8s ease 1s both}article+article .flow{animation-delay:2s}article+article .result{animation-delay:2.8s}
@keyframes jev-enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.instant .flow,.instant .result{animation:none}
@media(prefers-reduced-motion:reduce){.flow,.result{animation:none!important}}
@media print{.flow,.result{animation:none!important}.actions{visibility:hidden}}
</style>
