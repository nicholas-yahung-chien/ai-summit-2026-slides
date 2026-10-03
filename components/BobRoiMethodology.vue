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
    class="roi-methodology"
    :class="{ instant: !active || $renderContext === 'print' }"
  >
    <p class="eyebrow">IBM REVTECH · ROI METHODOLOGY</p>
    <h1>IBM 如何將 Bob 的產出、品質與成本換算為 ROI</h1>

    <div class="value-equation" aria-label="產出提升價值加上風險避免的價值，再扣除 Bob 總成本">
      <div class="equation-term throughput"><b>產出提升價值</b><span>Increased Throughput Value</span></div>
      <strong class="operator plus">＋</strong>
      <div class="equation-term quality"><b>風險避免的價值</b><span>Quality Savings</span></div>
      <strong class="operator minus">−</strong>
      <div class="equation-term cost"><b>Bob 總成本</b><span>Bob Cost</span></div>
    </div>

    <div class="method-grid">
      <section class="method-column throughput-column">
        <article class="formula-row">
          <span class="formula-label">功能產出</span>
          <div class="factor">功能更新的<br><b>PR 增量</b></div>
          <i>×</i>
          <div class="factor">每件功能更新的<br><b>原定工時估算</b><small>用來估值</small></div>
        </article>
        <article class="formula-row">
          <span class="formula-label">缺陷修復產出</span>
          <div class="factor">非正式環境修復的<br><b>PR 增量</b></div>
          <i>×</i>
          <div class="factor">每件缺陷修復的<br><b>原定工時估算</b><small>用來估值</small></div>
        </article>
        <article class="formula-row">
          <span class="formula-label">資安修復產出</span>
          <div class="factor">低風險弱點修復的<br><b>PR 增量</b></div>
          <i>×</i>
          <div class="factor">每件弱點修復的<br><b>原定工時估算</b><small>用來估值</small></div>
        </article>
      </section>

      <section class="method-column quality-column">
        <article class="quality-row">
          <span class="formula-label">避免缺陷損失</span>
          <div class="quality-formula">
            <div class="factor">正式環境修復的<br><b>PR 增量</b></div>
            <i>×</i>
            <div class="factor">缺陷修復的<br><b>原定工時估算</b></div>
            <i>×</i>
            <div class="factor">事件或延誤造成的<br><b>每小時營運可能損失</b></div>
          </div>
        </article>
        <article class="quality-row">
          <span class="formula-label">避免資安風險</span>
          <div class="quality-formula">
            <div class="factor">高風險弱點修復的<br><b>PR 增量</b></div>
            <i>×</i>
            <div class="factor">嚴重弱點遭利用的<br><b>發生機率</b></div>
            <i>×</i>
            <div class="factor">監管產業的<br><b>資料外洩可能成本</b></div>
          </div>
        </article>
        <div class="loss-examples">
          <b>營運可能的損失有，舉例...</b>
          <span>營收轉換下降</span>
          <span>延後現代化而暴露舊弱點</span>
          <span>事件處理造成的生產力損失</span>
        </div>
      </section>

      <section class="method-column cost-column">
        <div class="cost-group">
          <span class="cost-label">產生價值所需成本</span>
          <div class="cost-item">Bob 授權成本</div>
          <i>＋</i>
          <div class="cost-item">產生價值所需<br>DevOps 執行次數成本</div>
        </div>
        <div class="cost-group">
          <span class="cost-label">維運成本</span>
          <div class="cost-item">採用 Bob 後的開發成本</div>
          <i>＋</i>
          <div class="cost-item">Bob 的行政管理成本</div>
        </div>
      </section>
    </div>

    <p class="measurement-note"><b>核心量測單位是 PR</b><span>綠色欄以原定工時估算替新增產出估值；只有紅色欄是 Bob 的實際投入成本</span></p>

    <p class="citation" lang="en">McDaniel, A. (2026). <a href="https://www.ibm.com/think/perspectives/measuring-roi-ai-assisted-development-how-ibm-did-it" target="_blank" rel="noopener"><em>Measuring the ROI of AI-assisted development, and how IBM did it</em></a>. IBM Think.</p>
  </section>
</template>

<style scoped>
.roi-methodology h1 {
  margin: 7px 0 13px;
  font-size: 39px;
  letter-spacing: -.035em;
}

.value-equation {
  display: grid;
  grid-template-columns: 1.07fr 35px 1.62fr 35px .82fr;
  align-items: center;
  margin-bottom: 13px;
}

.equation-term {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 10px 14px;
  border: 2px solid;
  border-radius: 13px;
  background: #fff;
  animation: equation-in 1040ms cubic-bezier(.2, .75, .2, 1) both;
}

.equation-term b {
  font-size: 23px;
  font-weight: 600;
  white-space: nowrap;
}

.equation-term span {
  color: #6f6f6f;
  font-size: 11.5px;
  white-space: nowrap;
}

.throughput { border-color: #42be65; }
.quality { border-color: #4589ff; animation-delay: 280ms; }
.cost { border-color: #fa4d56; animation-delay: 560ms; }

.operator {
  text-align: center;
  color: #161616;
  font-size: 31px;
  line-height: 1;
  animation: operator-in 720ms ease both;
}

.plus { animation-delay: 180ms; }
.minus { animation-delay: 460ms; }

.method-grid {
  display: grid;
  grid-template-columns: 1.07fr 1.62fr .82fr;
  gap: 20px;
  height: 340px;
}

.method-column {
  min-width: 0;
  padding-top: 7px;
  border-top: 3px solid;
}

.throughput-column { border-color: #24a148; }
.quality-column { border-color: #0f62fe; }
.cost-column { border-color: #da1e28; }

.formula-row,
.quality-row,
.cost-group {
  animation: row-in 960ms cubic-bezier(.2, .75, .2, 1) both;
}

.formula-row {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 17px 1fr;
  align-items: center;
  gap: 5px;
  margin-top: 19px;
  padding-top: 9px;
}

.formula-row:nth-child(1) { animation-delay: 860ms; }
.formula-row:nth-child(2) { animation-delay: 1200ms; }
.formula-row:nth-child(3) { animation-delay: 1540ms; }

.formula-label,
.cost-label {
  position: absolute;
  top: -16px;
  left: 0;
  padding: 2px 7px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .02em;
  line-height: 1.35;
}

.throughput-column .formula-label { background: #24a148; }
.quality-column .formula-label { background: #0f62fe; }
.cost-label { background: #da1e28; }

.factor {
  display: flex;
  min-height: 69px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 7px;
  border-radius: 8px;
  color: #393939;
  background: #defbe6;
  font-size: 14px;
  line-height: 1.28;
  text-align: center;
}

.factor b {
  font-weight: 600;
}

.factor small {
  margin-top: 2px;
  color: #198038;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: .03em;
}

.quality-formula .factor small {
  color: #0043ce;
}

.formula-row i,
.quality-formula i,
.cost-group i {
  color: #393939;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
}

.quality-row {
  position: relative;
  margin-top: 19px;
  padding-top: 9px;
}

.quality-row:nth-child(1) { animation-delay: 1040ms; }
.quality-row:nth-child(2) { animation-delay: 1440ms; }

.quality-formula {
  display: grid;
  grid-template-columns: 1fr 15px 1fr 15px 1fr;
  align-items: center;
  gap: 4px;
}

.quality-formula .factor {
  background: #d0e2ff;
}

.loss-examples {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3px;
  margin-top: 10px;
  padding: 5px;
  border: 1px dashed #8d8d8d;
  animation: loss-shell-in 720ms ease 3.44s both;
}

.loss-examples b,
.loss-examples span {
  min-height: 28px;
  padding: 4px 9px;
  border: 1px solid #c6c6c6;
  background: #fff;
  color: #525252;
  font-size: 12.8px;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
}

.loss-examples b {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 0;
  background: transparent;
  color: #0043ce;
  font-size: 12.5px;
  font-weight: 600;
  animation: loss-title-in 840ms cubic-bezier(.2, .75, .2, 1) 3.64s both;
}

.loss-examples span {
  animation: loss-item-in 1120ms cubic-bezier(.2, .75, .2, 1) both;
}

.loss-examples span:nth-of-type(1) { animation-delay: 4.32s; }
.loss-examples span:nth-of-type(2) { animation-delay: 5.04s; }
.loss-examples span:nth-of-type(3) { animation-delay: 5.76s; }

.cost-column {
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  gap: 21px;
}

.cost-group {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3px;
  margin-top: 19px;
  padding-top: 9px;
}

.cost-group:nth-child(1) { animation-delay: 1240ms; }
.cost-group:nth-child(2) { animation-delay: 1640ms; }

.cost-item {
  display: flex;
  min-height: 48px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 8px;
  background: #ffd7d9;
  color: #393939;
  font-size: 14px;
  line-height: 1.25;
  text-align: center;
}

.cost-item b {
  font-weight: 600;
}

.measurement-note {
  position: absolute;
  right: 72px;
  bottom: 101px;
  left: 72px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
  border-top: 1px solid #c6c6c6;
  color: #525252;
  font-size: 13.5px;
  line-height: 1.35;
  animation: row-in 960ms ease 2.16s both;
}

.measurement-note b {
  color: #0043ce;
  font-size: 16px;
  font-weight: 600;
}

.citation {
  position: absolute;
  right: 72px;
  bottom: 78px;
  left: 72px;
  color: #525252;
  font-size: 10.5px;
  line-height: 1.3;
}

.citation a {
  color: #0043ce;
  text-decoration: underline;
  text-underline-offset: 2px;
}

@keyframes equation-in {
  from { opacity: 0; transform: translateY(9px) scale(.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes operator-in {
  from { opacity: 0; transform: scale(.65); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes row-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes loss-shell-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes loss-title-in {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes loss-item-in {
  0% { opacity: 0; transform: translateY(7px) scale(.985); background: #edf5ff; border-color: #78a9ff; }
  62% { opacity: 1; transform: translateY(0) scale(1); background: #edf5ff; border-color: #78a9ff; }
  100% { opacity: 1; transform: translateY(0) scale(1); background: #fff; border-color: #c6c6c6; }
}

.instant * { animation: none !important; }

@media (prefers-reduced-motion: reduce) {
  .roi-methodology * { animation: none !important; }
}

@media print {
  .roi-methodology * { animation: none !important; }
}
</style>
