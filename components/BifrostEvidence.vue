<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
const rounds = [
  { tools: 96, off: 104.04, on: 46.06, offLabel: '$104.04', onLabel: '$46.06', saving: '55.7%', pass: '100 → 100%' },
  { tools: 251, off: 180.07, on: 29.80, offLabel: '$180.07', onLabel: '$29.80', saving: '83.4%', pass: '98.5 → 100%' },
  { tools: 508, off: 377, on: 29, offLabel: '≈ $377', onLabel: '≈ $29', saving: '92.2%', pass: '100 → 100%' },
]
const gateways = [{ name: 'LiteLLM', version: '1.101.0', value: 44.05 }, { name: 'Bifrost', version: '2.2.1', value: 4.30 }]
</script>
<template>
  <section :key="replay" class="bifrost-evidence" :class="{ instant: !active || $renderContext === 'print' }">
    <p class="eyebrow">05 · BIFROST EVIDENCE</p>
    <h1>Bifrost 效益比較：使用費用與 Gateway 處理效能</h1>
    <div class="evidence-content">
      <section>
        <h2>開啟 Bifrost Code Mode 能降低工具使用費用</h2>
        <p class="context">Bifrost · Sonnet 4.6 · 每輪 64–65 題 · 估算總費用 USD ↓</p>
        <div class="legend"><span><i class="off" />關閉</span><span><i class="on" />開啟 Code Mode</span></div>
        <div class="cost-chart" role="img" aria-label="Code Mode 費用：96 個工具，104.04 降至 46.06 美元；251 個工具，180.07 降至 29.80 美元；508 個工具，約 377 降至 29 美元。共用 0 至 400 美元刻度">
          <div class="gridlines"><span v-for="tick in [400, 300, 200, 100, 0]" :key="tick">{{ tick }}</span></div>
          <div v-for="(round, index) in rounds" :key="round.tools" class="cost-group" :style="{ '--delay': `${index * 250 + 150}ms` }">
            <div class="columns">
              <div class="column off" :style="{ height: `${round.off / 400 * 100}%` }"><b>{{ round.offLabel }}</b><i /></div>
              <div class="column on" :style="{ height: `${round.on / 400 * 100}%` }"><b>{{ round.onLabel }}</b><i /></div>
            </div>
            <div class="round-label">{{ round.tools }} <small>工具</small></div>
            <div class="saving">省 {{ round.saving }}</div>
            <div class="pass">通過率 {{ round.pass }}</div>
          </div>
        </div>
        <p class="limit">Bifrost 觀察：第二輪關閉 Code Mode 時，6 題呼叫了不存在的工具；<br>重新執行並選用正確工具後，6 題全數通過</p>
      </section>
      <section class="external">
        <h2>Bifrost 降低 Gateway 額外處理延遲</h2>
        <p class="context">ENTERPILOT · 模擬後端 · Gateway overhead p50（ms）↓</p>
        <div class="latency-chart" role="img" aria-label="Gateway 額外處理延遲 p50：LiteLLM 1.101.0 為 44.05 毫秒，Bifrost 2.2.1 為 4.30 毫秒。共用 0 至 50 毫秒刻度">
          <div v-for="(item, index) in gateways" :key="item.name" class="latency-row" :class="{ winner: index === 1 }" :style="{ '--delay': `${850 + index * 350}ms` }">
            <div class="latency-label"><span>{{ item.name }} <small>{{ item.version }}</small></span><b>{{ item.value.toFixed(2) }} <small>ms</small></b></div>
            <div class="track"><i :style="{ width: `${item.value / 50 * 100}%` }" /></div>
          </div>
          <div class="axis"><span>0</span><span>25</span><span>50 ms</span></div>
        </div>
        <p class="latency-finding">p50 處理延遲低 <strong>90.2%</strong></p>
        <p class="limit">相較 LiteLLM，依上列數據計算<br>模擬後端排除模型與外部網路延遲<br>AWS c7i.large · 併發 10 · 5 輪測試</p>
      </section>
    </div>
    <div class="citations" lang="en">
      <p>Maxim AI. (n.d.). <a href="https://github.com/maximhq/bifrost-benchmarking/blob/main/mcp-code-mode-benchmark/benchmark_report.md" target="_blank" rel="noopener"><em>MCP Code Mode benchmark report</em></a> [Technical report]. GitHub. Summary; Rounds 1–3.</p>
      <p>ENTERPILOT. (2026). <a href="https://github.com/ENTERPILOT/ai-gateway-reproducible-benchmark" target="_blank" rel="noopener"><em>AI gateway reproducible benchmark</em></a> [Benchmark code and results]. GitHub. Run: 20260918-212130. Retrieved September 29, 2026.</p>
    </div>
  </section>
</template>
<style scoped>
.bifrost-evidence h1{font-size:43px;margin:12px 0 16px}.evidence-content{display:grid;grid-template-columns:1.6fr 1fr;gap:32px}.evidence-content h2{font-size:25px;font-weight:500;margin:0 0 6px}.context{font-size:15px;color:#525252;line-height:1.4;margin:0!important}.external{border-left:1px solid #c6c6c6;padding-left:28px}
.legend{display:flex;gap:22px;margin:6px 0 0;font-size:15px}.legend span{display:flex;align-items:center;gap:7px}.legend i{width:12px;height:12px}.off{--bar-color:#697785}.on{--bar-color:#0f62fe}.legend i{background:var(--bar-color)}
.cost-chart{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:22px 0 0 32px}.gridlines{position:absolute;top:22px;left:0;right:0;height:135px;display:flex;flex-direction:column;justify-content:space-between;font-size:11px;color:#6f6f6f}.gridlines span{position:relative;line-height:0}.gridlines span:after{content:'';position:absolute;left:32px;right:0;top:0;border-top:1px solid #e0e0e0}.cost-group{position:relative;text-align:center}.columns{height:135px;display:flex;align-items:flex-end;justify-content:center;gap:19px}.column{width:48px;position:relative}.column i{display:block;width:100%;height:100%;background:var(--bar-color);transform-origin:bottom;animation:grow-up 850ms cubic-bezier(.2,.7,.2,1) var(--delay) both}.column b{position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);white-space:nowrap;font-size:15px;font-weight:500;color:var(--bar-color);animation:reveal 450ms ease calc(var(--delay) + 650ms) both}.round-label{margin-top:10px;font-size:23px;font-weight:500}.round-label small{font-size:15px}.saving{color:#0043ce;font-size:24px;margin-top:5px;animation:reveal 450ms ease calc(var(--delay) + 850ms) both}.pass{font-size:14px;color:#393939;margin-top:3px}
.latency-chart{margin-top:28px}.latency-row{margin-top:22px}.latency-label{display:flex;justify-content:space-between;align-items:baseline;font-size:23px}.latency-label small{font-size:14px;color:#525252}.latency-label b{font-size:29px;font-weight:500;color:#697785}.winner .latency-label b{color:#0043ce}.track{height:16px;background:#e0e5eb;margin-top:8px}.track i{display:block;height:100%;background:#697785;transform-origin:left;animation:grow-right 900ms cubic-bezier(.2,.7,.2,1) var(--delay) both}.winner .track i{background:#0f62fe}.axis{display:flex;justify-content:space-between;font-size:12px;color:#525252;margin-top:7px}.latency-finding{font-size:23px;color:#0043ce;margin:25px 0 10px!important;animation:reveal 500ms ease 1900ms both}.latency-finding strong{font-size:36px;font-weight:500}.limit{font-size:14px;color:#525252;margin-top:12px!important;line-height:1.45}.boundary{font-size:18px;color:#0043ce;margin-top:6px!important;line-height:1.4}
.citations{position:absolute;bottom:83px;left:72px;right:72px;border-top:1px solid #c6c6c6;padding-top:9px;font-size:12.5px;line-height:1.5;color:#393939}.citations p{font:inherit;padding-left:16px;text-indent:-16px;margin:0 0 3px}.citations a{color:#0043ce;text-decoration:none}.citations a:hover{text-decoration:underline}.citations a:focus-visible{outline:2px solid #0f62fe}
@keyframes grow-up{from{transform:scaleY(0)}to{transform:scaleY(1)}}@keyframes grow-right{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes reveal{from{opacity:0}to{opacity:1}}
.instant *{animation:none!important}@media(prefers-reduced-motion:reduce){.bifrost-evidence *{animation:none!important}}@media print{.bifrost-evidence *{animation:none!important}}
</style>
