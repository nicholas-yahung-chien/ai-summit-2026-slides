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
    class="bob-roi-evidence"
    :class="{ instant: !active || $renderContext === 'print' }"
  >
    <p class="eyebrow">IBM BOB · MEASURED OUTCOMES</p>
    <h1>從內部 ROI 到客戶交付，Bob 的價值可以被量化</h1>

    <div class="evidence-panels">
      <article class="revtech-card">
        <header>
          <span class="case-label">IBM REVTECH｜生產環境</span>
          <h2>IBM 報告：ROI 約為每位開發者年度 Bob 成本的 10 倍</h2>
        </header>

        <div class="roi-visual" role="img" aria-label="IBM RevTech 估算的年度效益約為每位開發者使用 Bob 年度成本的十倍">
          <div class="roi-cost">
            <span>年度 Bob 成本</span>
            <i />
            <b>1×</b>
          </div>
          <div class="roi-value">
            <span>IBM 報告的 ROI</span>
            <i />
            <b>約 10×</b>
          </div>
        </div>

        <p class="finding">最大效益來自避免缺陷損失，而非單純增加產出</p>
        <p class="method">相同開發者與程式庫的兩個 12 週期間 · 以 PR 為衡量單位 · 納入授權、DevOps、支援與維運成本</p>
      </article>

      <article class="bluepearl-card">
        <header>
          <span class="case-label">BLUE PEARL｜具名客戶案例</span>
          <h2>Java 現代化由約 30 天縮短至 3 天</h2>
        </header>

        <div class="duration-visual" role="img" aria-label="Blue Pearl 的 Java 現代化工作由約三十天縮短至三天，交付時間約縮短百分之九十">
          <div class="duration-track baseline">
            <span>傳統方式</span>
            <i />
            <b>約 30 天</b>
          </div>
          <div class="duration-track bob">
            <span>使用 Bob</span>
            <i />
            <b>3 天</b>
          </div>
          <strong class="reduction">交付時間縮短約 90%</strong>
        </div>

        <div class="supporting-metrics">
          <div><b>160+</b><span>工程工時保留</span></div>
          <div><b>92%</b><span>自動化測試覆蓋率</span></div>
          <div><b>0</b><span>上線後生產事故</span></div>
        </div>
      </article>
    </div>

    <div class="citations" lang="en">
      <p>McDaniel, A. (2026). <a href="https://www.ibm.com/think/perspectives/measuring-roi-ai-assisted-development-how-ibm-did-it" target="_blank" rel="noopener"><em>Measuring the ROI of AI-assisted development, and how IBM did it</em></a>. IBM Think.</p>
      <p>IDC. (2026). <em>IBM Bob Advances IBM’s Position in Agentic SDLC Development</em> [Analyst report]; IBM. (2026). <a href="https://www.ibm.com/case-studies/blue-pearl-bob" target="_blank" rel="noopener"><em>The new pace of modernization</em></a> [Client case study].</p>
    </div>
  </section>
</template>

<style scoped>
.bob-roi-evidence h1 {
  margin: 10px 0 18px;
  font-size: 42px;
  letter-spacing: -.035em;
}

.evidence-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

article {
  min-height: 365px;
  padding: 22px 25px 20px;
  border-top: 4px solid #0f62fe;
  background: #fff;
  box-shadow: 0 10px 28px rgba(22, 22, 22, .06);
  animation: card-in 650ms cubic-bezier(.2, .75, .2, 1) both;
}

.bluepearl-card {
  border-top-color: #007d79;
  animation-delay: 180ms;
}

.case-label {
  color: #0043ce;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .1em;
}

.bluepearl-card .case-label { color: #006b68; }

article h2 {
  margin: 7px 0 0;
  font-size: 25px;
  line-height: 1.35;
  font-weight: 600;
}

.roi-visual,
.duration-visual {
  margin-top: 23px;
}

.roi-cost,
.roi-value,
.duration-track {
  display: grid;
  grid-template-columns: 92px 1fr 74px;
  align-items: center;
  gap: 12px;
  margin: 14px 0;
}

.roi-cost span,
.roi-value span,
.duration-track span {
  color: #525252;
  font-size: 15px;
}

.roi-cost i,
.roi-value i,
.duration-track i {
  display: block;
  height: 20px;
  transform-origin: left;
  animation: grow-right 1s cubic-bezier(.2, .75, .2, 1) both;
}

.roi-cost i {
  width: 10%;
  min-width: 26px;
  background: #8d8d8d;
  animation-delay: 350ms;
}

.roi-value i {
  width: 100%;
  background: #0f62fe;
  animation-delay: 550ms;
}

.roi-cost b,
.roi-value b,
.duration-track b {
  font-size: 19px;
  font-weight: 600;
  white-space: nowrap;
}

.roi-value b {
  color: #0043ce;
  font-size: 29px;
  animation: metric-in 500ms ease 1.25s both;
}

.finding {
  margin-top: 27px !important;
  color: #0043ce;
  font-size: 21px;
  line-height: 1.45;
  animation: metric-in 500ms ease 1.45s both;
}

.method {
  margin-top: 13px !important;
  color: #525252;
  font-size: 13px;
  line-height: 1.5;
}

.duration-track {
  grid-template-columns: 80px 1fr 74px;
}

.duration-track i { animation-delay: 520ms; }
.baseline i { width: 100%; background: #8d8d8d; }
.bob i { width: 10%; min-width: 26px; background: #007d79; animation-delay: 760ms; }
.bob b { color: #006b68; font-size: 27px; }

.reduction {
  display: block;
  margin: 22px 0 0 92px;
  color: #006b68;
  font-size: 24px;
  font-weight: 500;
  animation: metric-in 500ms ease 1.45s both;
}

.supporting-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 26px;
  padding-top: 15px;
  border-top: 1px solid #d6d6d6;
}

.supporting-metrics div { animation: metric-in 500ms ease both; }
.supporting-metrics div:nth-child(1) { animation-delay: 1.65s; }
.supporting-metrics div:nth-child(2) { animation-delay: 1.85s; }
.supporting-metrics div:nth-child(3) { animation-delay: 2.05s; }

.supporting-metrics b {
  display: block;
  color: #006b68;
  font-size: 28px;
  line-height: 1.15;
  font-weight: 600;
}

.supporting-metrics span {
  display: block;
  margin-top: 5px;
  color: #525252;
  font-size: 12px;
  line-height: 1.35;
}

.citations {
  position: absolute;
  right: 72px;
  bottom: 76px;
  left: 72px;
  padding-top: 8px;
  border-top: 1px solid #c6c6c6;
  color: #525252;
  font-size: 10.5px;
  line-height: 1.35;
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

@keyframes card-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes metric-in {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: translateY(0); }
}

.instant * { animation: none !important; }

@media (prefers-reduced-motion: reduce) {
  .bob-roi-evidence * { animation: none !important; }
}

@media print {
  .bob-roi-evidence * { animation: none !important; }
}
</style>
