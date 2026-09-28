<template>
  <section class="gateway-comparison">
    <p class="eyebrow">04 · MODEL ROUTING</p>
    <h1>路由的三個層次，兩種不同的角色。</h1>
    <table aria-label="Bifrost 企業版與 Jev 路由功能比較">
      <thead><tr><th>路由層次</th><th>Bifrost 企業版<span>AI Gateway · 含開源核心能力</span></th><th>Jev<span>決策模型 · 官方 SDK 開源</span></th></tr></thead>
      <tbody>
        <tr><th><small>01 / POLICY</small>政策路由</th><td><strong>原生規則與治理</strong><p>CEL 規則依團隊、預算、區域等條件，<br>選擇模型、供應商與備援路徑。</p></td><td><strong>提供判斷，程式執行政策</strong><p>可依準則分類；權限、預算限制<br>與實際分流需由外部系統實作。</p></td></tr>
        <tr><th><small>02 / COMPLEXITY</small>語意複雜度路由</th><td><strong>語意分類 → 三級模型分流</strong><p>Embedding 比對範例，分為簡／中／難；<br>可加 LLM 後備分類器。<em>Complexity Router · Beta</em></p></td><td><strong>專用模型 → 自訂結構化決策</strong><p>判斷意圖、複雜度與選項；<br>回傳機率／信心，由程式選擇處理器。</p></td></tr>
        <tr><th><small>03 / OPERATIONS</small>負載平衡</th><td><strong>企業版自適應負載平衡</strong><p>依延遲、錯誤與容量等訊號，<br>調整供應商與 API Key 的流量。</p></td><td><strong>需搭配 Gateway／應用程式</strong><p>決策 API 本身不提供模型供應商<br>流量管理、Key 輪替與自動容錯。</p></td></tr>
      </tbody>
    </table>
    <p class="scope">比較上游現行功能，非 IBM Bob 啟用清單。Jev 公開 SDK，不等於模型權重開源。</p>
    <div class="citations" lang="en">
      <p>Maxim AI. (n.d.). <a href="https://docs.getbifrost.ai/providers/routing-rules" target="_blank" rel="noopener"><em>Routing rules</em></a>; <a href="https://docs.getbifrost.ai/features/governance/complexity-router" target="_blank" rel="noopener"><em>Complexity router</em></a>; <a href="https://docs.getbifrost.ai/enterprise/adaptive-load-balancing" target="_blank" rel="noopener"><em>Adaptive load balancing</em></a>. Bifrost documentation.</p>
      <p>TypeSafe AI. (n.d.). <a href="https://docs.typesafe.ai/patterns/intent-routing" target="_blank" rel="noopener"><em>Intent routing</em></a>; <a href="https://docs.typesafe.ai/confidence" target="_blank" rel="noopener"><em>Confidence</em></a>; <a href="https://docs.typesafe.ai/models" target="_blank" rel="noopener"><em>Models</em></a>; <a href="https://github.com/typesafe-ai" target="_blank" rel="noopener"><em>Official repositories</em></a>. Retrieved September 28, 2026.</p>
    </div>
  </section>
</template>
<style scoped>
.gateway-comparison h1{font-size:43px;margin:12px 0 20px}
table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:21px;line-height:1.45}
th,td{text-align:left;vertical-align:top;padding:7px 18px;border-bottom:1px solid #c6c6c6}
thead th{padding-top:0;border-bottom:2px solid #0f62fe;font-size:25px;font-weight:500;color:#0043ce}
thead th:first-child{width:23%;font-size:19px;color:#525252}
thead span{display:block;font-size:16px;font-weight:400;color:#525252;margin-top:3px}
tbody th{font-size:23px;font-weight:500;padding-left:0}
th small{display:block;font-size:13px;font-weight:400;letter-spacing:.1em;color:#0043ce;margin-bottom:6px}
td strong{font-size:22px;font-weight:500}td p{font-size:18px;line-height:1.4;color:#393939;margin:4px 0 0!important}td em{display:block;font-style:normal;font-size:13px;color:#525252;margin-top:3px}
.conclusion{font-size:24px;color:#0043ce;margin-top:17px!important}.scope{font-size:15px;color:#525252;margin-top:5px!important}
.citations{position:absolute;bottom:83px;left:72px;right:72px;border-top:1px solid #c6c6c6;padding-top:9px;font-size:13px;line-height:1.5;color:#393939}.citations p{font:inherit;padding-left:16px;text-indent:-16px;margin:0 0 3px}.citations a{color:#0043ce;text-decoration:none}.citations a:hover{text-decoration:underline}.citations a:focus-visible{outline:2px solid #0f62fe}
</style>
