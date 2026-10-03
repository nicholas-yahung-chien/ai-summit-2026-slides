<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
</script>

<template>
  <section :key="replay" class="gateway-comparison" :class="{ instant: !active || $renderContext === 'print' }">
    <p class="eyebrow">04 · MODEL ROUTING</p>
    <h1>從模型路由到企業等級治理</h1>
    <table aria-label="Jev 決策模型與 Bifrost Gateway 的責任範圍">
      <thead><tr><th>路由的種類</th><th>Bifrost 企業版<span>AI Gateway · 執行路由與治理</span></th><th>以 Jev 自製路由<span>決策模型 ＋ 應用程式</span></th></tr></thead>
      <tbody>
        <tr><th><small>01 / POLICY</small>政策路由</th><td><strong><span class="supported">支援</span>企業政策路由</strong><p>依團隊、預算、區域等條件，<br>設定模型、供應商與備援順序</p></td><td><p>Jev 本身<span class="unsupported">不提供政策執行</span><br>需在模型判斷之外設定與落實規則</p></td></tr>
        <tr><th><small>02 / COMPLEXITY</small>語意複雜度路由</th><td><strong><span class="supported">支援</span>難度分類與分流</strong><p>比對語意範例，分為簡單／中等／複雜；<br>無法分類時，可再請 LLM 判斷<em>Complexity Router · Beta · 需設定分類與路由</em></p></td><td><strong><span class="supported">支援決策判斷</span>，分流需自行串接</strong><p>判斷意圖、難度與選項，附上機率；<br><span class="unsupported">未內建請求轉送</span>，由應用程式執行</p></td></tr>
        <tr><th><small>03 / OPERATIONS</small>負載平衡</th><td><strong><span class="supported">支援</span>自適應負載平衡</strong><p>觀察速度、錯誤與可用容量，<br>自動調整供應商與 API Key 的流量</p></td><td><p>Jev 本身<span class="unsupported">不提供負載平衡</span><br>選擇模型與分配服務流量是不同工作</p></td></tr>
      </tbody>
    </table>
    <p class="scope">依 Bifrost 與 Jev 各自官方公開文件整理，內容反映文件所載功能範圍</p>
    <div class="citations" lang="en">
      <p>Maxim AI. (n.d.). <a href="https://docs.getbifrost.ai/providers/routing-rules" target="_blank" rel="noopener"><em>Routing rules</em></a>; <a href="https://docs.getbifrost.ai/features/governance/complexity-router" target="_blank" rel="noopener"><em>Complexity router</em></a>; <a href="https://docs.getbifrost.ai/enterprise/adaptive-load-balancing" target="_blank" rel="noopener"><em>Adaptive load balancing</em></a>. Bifrost documentation.</p>
      <p>TypeSafe AI. (n.d.). <a href="https://docs.typesafe.ai/patterns/intent-routing" target="_blank" rel="noopener"><em>Intent routing</em></a>; <a href="https://docs.typesafe.ai/confidence" target="_blank" rel="noopener"><em>Confidence</em></a>; <a href="https://docs.typesafe.ai/models" target="_blank" rel="noopener"><em>Models</em></a>; <a href="https://github.com/typesafe-ai" target="_blank" rel="noopener"><em>Official repositories</em></a>. Retrieved September 28, 2026.</p>
    </div>
  </section>
</template>
<style scoped>
.gateway-comparison h1{font-size:37px;margin:12px 0 20px}
table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:21px;line-height:1.45}
th,td{text-align:left;vertical-align:top;padding:7px 18px;border-bottom:1px solid #c6c6c6}
thead th{padding-top:0;border-bottom:2px solid #0f62fe;font-size:25px;font-weight:500;color:#0043ce}
thead th:first-child{width:23%;font-size:19px;color:#525252}
thead span{display:block;font-size:16px;font-weight:400;color:#525252;margin-top:3px}
tbody th{font-size:23px;font-weight:500;padding-left:0}
th small{display:block;font-size:13px;font-weight:400;letter-spacing:.1em;color:#0043ce;margin-bottom:6px}
td strong{font-size:22px;font-weight:500}td p{font-size:18px;line-height:1.4;color:#393939;margin:4px 0 0!important}td em{display:block;font-style:normal;font-size:13px;color:#525252;margin-top:3px}
.supported{color:#0e6027;font-weight:600}.unsupported{color:#a2191f;font-weight:600}
.supported,.unsupported{display:inline-block;animation:keyword-reveal 600ms cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--keyword-delay,180ms)}
tbody tr:nth-child(2){--keyword-delay:580ms}
tbody tr:nth-child(3){--keyword-delay:980ms}
@keyframes keyword-reveal{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.instant .supported,.instant .unsupported{animation:none}
@media(prefers-reduced-motion:reduce){.supported,.unsupported{animation:none}}
@media print{.supported,.unsupported{animation:none}}
.conclusion{font-size:24px;color:#0043ce;margin-top:17px!important}.scope{font-size:15px;color:#525252;margin-top:5px!important}
.citations{position:absolute;bottom:83px;left:72px;right:72px;border-top:1px solid #c6c6c6;padding-top:9px;font-size:13px;line-height:1.5;color:#393939}.citations p{font:inherit;padding-left:16px;text-indent:-16px;margin:0 0 3px}.citations a{color:#0043ce;text-decoration:none}.citations a:hover{text-decoration:underline}.citations a:focus-visible{outline:2px solid #0f62fe}
</style>
