<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)

watch(active, value => {
  if (value) replay.value++
})
</script>

<template>
  <section
    :key="replay"
    class="bob-token-cost"
    :class="{ instant: !active || $renderContext === 'print' }"
  >
    <p class="eyebrow">IBM BOB · TOKEN COST SCENARIO</p>
    <h1>65,000 token 的程式開發工作階段，費用差距有多大</h1>

    <div class="scenario-strip" aria-label="Anthropic 公開計價情境為一小時程式開發工作階段，包含五萬個輸入 token 與一萬五千個輸出 token">
      <div class="scenario-name">
        <span>ANTHROPIC 公開計價情境</span>
        <b>1 小時程式開發工作階段</b>
      </div>
      <div class="token-stat input">
        <small>INPUT</small>
        <b>50,000</b>
        <span>tokens</span>
      </div>
      <strong>＋</strong>
      <div class="token-stat output">
        <small>OUTPUT</small>
        <b>15,000</b>
        <span>tokens</span>
      </div>
      <strong>＝</strong>
      <div class="token-stat total">
        <small>TOTAL</small>
        <b>65,000</b>
        <span>tokens</span>
      </div>
    </div>

    <div class="comparison-layout">
      <div class="cost-chart" role="img" aria-label="Bob 估算費用為 0.081 美元，Claude Sonnet 4.6 啟用 prompt caching 為 0.267 美元，標準計價為 0.375 美元">
        <div class="axis"><span>USD 0</span><span>0.10</span><span>0.20</span><span>0.30</span><span>0.40</span></div>

        <article class="cost-row bob">
          <header><b>IBM Bob</b><small>原比較資料採統一單價</small></header>
          <div class="track"><i /><strong>$0.081</strong></div>
          <p>65,000 × $1.25 / MTok</p>
        </article>

        <article class="cost-row cached">
          <header><b>Claude</b><small>Sonnet 4.6 · Prompt caching</small></header>
          <div class="track"><i /><strong>$0.267</strong></div>
          <p>10k 一般輸入 ＋ 40k 快取讀取 ＋ 15k 輸出</p>
        </article>

        <article class="cost-row standard">
          <header><b>Claude</b><small>Sonnet 4.6 · 標準計價</small></header>
          <div class="track"><i /><strong>$0.375</strong></div>
          <p>50k 輸入 ＋ 15k 輸出</p>
        </article>
      </div>

      <aside class="savings-panel">
        <span class="panel-label">相同 token 結構下</span>
        <div class="saving cached-saving">
          <small>相較快取情境</small>
          <b>低 69.6%</b>
        </div>
        <div class="saving standard-saving">
          <small>相較標準情境</small>
          <b>低 78.3%</b>
        </div>
        <p>這是定價試算，未衡量任務品質、完成率或成功率</p>
      </aside>
    </div>

    <div class="scope-note">
      <b>比較口徑</b>
      <span>只計 token 使用費 · 金額顯示至小數三位 · Claude 依 Sonnet 4.6 公開單價與快取規則重算 · Bob 採原比較資料的 $1.25 / MTok 前提</span>
    </div>

    <div class="citations" lang="en">
      <p>IBM Japan. (2026). <em>IBM Bobコスト・ROI優位性</em>, slide 2 [Internal comparison material]</p>
      <p>Anthropic. (2026). <a href="https://platform.claude.com/docs/en/about-claude/pricing#worked-example" target="_blank" rel="noopener"><em>Pricing</em></a> [Model rates, prompt caching, and one-hour coding-session example]</p>
    </div>
  </section>
</template>

<style scoped>
.bob-token-cost h1 {
  margin: 8px 0 14px;
  font-size: 42px;
  letter-spacing: -.035em;
}

.scenario-strip {
  display: grid;
  grid-template-columns: 1.58fr 1fr 30px 1fr 30px 1fr;
  align-items: center;
  gap: 10px;
  min-height: 84px;
  padding: 12px 17px;
  border: 1px solid #a6c8ff;
  background: linear-gradient(90deg, #edf5ff 0%, #f7f9ff 100%);
  animation: rise-in 520ms cubic-bezier(.2, .75, .2, 1) both;
}

.scenario-name span,
.token-stat small,
.panel-label {
  display: block;
  color: #0043ce;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .09em;
}

.scenario-name b {
  display: block;
  margin-top: 5px;
  font-size: 20px;
  font-weight: 600;
}

.token-stat {
  padding-left: 16px;
  border-left: 1px solid #a6c8ff;
}

.token-stat b {
  display: inline-block;
  margin-top: 2px;
  color: #161616;
  font-size: 25px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.token-stat span {
  margin-left: 4px;
  color: #525252;
  font-size: 11px;
}

.token-stat.total b { color: #0043ce; }
.scenario-strip > strong { color: #525252; font-size: 23px; font-weight: 400; text-align: center; }

.comparison-layout {
  display: grid;
  grid-template-columns: 2.25fr .88fr;
  gap: 27px;
  margin-top: 18px;
}

.cost-chart {
  position: relative;
  padding: 24px 0 0;
}

.axis {
  position: absolute;
  top: 0;
  right: 0;
  left: 197px;
  display: flex;
  justify-content: space-between;
  color: #6f6f6f;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
}

.cost-row {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 37px 22px;
  column-gap: 17px;
  align-items: center;
  margin: 9px 0 13px;
  animation: rise-in 480ms cubic-bezier(.2, .75, .2, 1) both;
}

.cost-row.cached { animation-delay: 180ms; }
.cost-row.standard { animation-delay: 360ms; }

.cost-row header {
  grid-row: 1 / 3;
  min-width: 0;
}

.cost-row header b {
  display: block;
  color: #161616;
  font-size: 19px;
  font-weight: 600;
}

.cost-row.bob header b { color: #0043ce; }

.cost-row header small {
  display: block;
  margin-top: 3px;
  color: #6f6f6f;
  font-size: 10.5px;
  line-height: 1.25;
}

.track {
  position: relative;
  height: 30px;
  border-bottom: 1px solid #c6c6c6;
  background-image: linear-gradient(to right, transparent calc(25% - 1px), #e0e0e0 25%, transparent calc(25% + 1px)), linear-gradient(to right, transparent calc(50% - 1px), #e0e0e0 50%, transparent calc(50% + 1px)), linear-gradient(to right, transparent calc(75% - 1px), #e0e0e0 75%, transparent calc(75% + 1px));
}

.track i {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 22px;
  transform-origin: left;
  animation: grow-right 900ms cubic-bezier(.2, .75, .2, 1) both;
}

.bob .track i { width: 20.3%; min-width: 78px; background: #0f62fe; animation-delay: 260ms; }
.cached .track i { width: 66.75%; background: #8d8d8d; animation-delay: 500ms; }
.standard .track i { width: 93.75%; background: #525252; animation-delay: 740ms; }

.track strong {
  position: absolute;
  top: -5px;
  right: 4px;
  color: #393939;
  font-size: 22px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  animation: metric-in 420ms ease 1.05s both;
}

.bob .track strong { color: #0043ce; }
.standard .track strong { right: 12px; color: #fff; }

.cost-row p {
  margin: 2px 0 0 !important;
  color: #6f6f6f;
  font-size: 10.5px;
  line-height: 1.2;
}

.savings-panel {
  min-height: 250px;
  padding: 19px 21px 17px;
  border-top: 4px solid #0f62fe;
  background: #fff;
  box-shadow: 0 10px 28px rgba(22, 22, 22, .07);
  animation: rise-in 520ms cubic-bezier(.2, .75, .2, 1) 420ms both;
}

.saving {
  margin-top: 15px;
  padding-top: 12px;
  border-top: 1px solid #d6d6d6;
}

.saving small {
  display: block;
  color: #525252;
  font-size: 12px;
}

.saving b {
  display: block;
  margin-top: 1px;
  color: #0043ce;
  font-size: 30px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  animation: metric-in 430ms ease both;
}

.cached-saving b { animation-delay: 1.15s; }
.standard-saving b { animation-delay: 1.36s; }

.savings-panel p {
  margin: 15px 0 0 !important;
  padding-top: 12px;
  border-top: 1px solid #d6d6d6;
  color: #525252;
  font-size: 11.5px;
  line-height: 1.45;
  animation: metric-in 430ms ease 1.55s both;
}

.scope-note {
  display: flex;
  align-items: baseline;
  gap: 13px;
  margin-top: 4px;
  color: #525252;
  font-size: 12px;
  line-height: 1.35;
  animation: metric-in 430ms ease 1.65s both;
}

.scope-note b {
  color: #0043ce;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}

.citations {
  position: absolute;
  right: 72px;
  bottom: 73px;
  left: 72px;
  padding-top: 7px;
  border-top: 1px solid #c6c6c6;
  color: #525252;
  font-size: 10px;
  line-height: 1.3;
}

.citations p {
  margin: 0 0 2px;
  padding-left: 12px;
  font: inherit;
  text-indent: -12px;
}

.citations a {
  color: #0043ce;
  text-decoration: underline;
  text-underline-offset: 2px;
}

@keyframes grow-right {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@keyframes rise-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes metric-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.instant * { animation: none !important; }

@media (prefers-reduced-motion: reduce) {
  .bob-token-cost * { animation: none !important; }
}

@media print {
  .bob-token-cost * { animation: none !important; }
}
</style>
