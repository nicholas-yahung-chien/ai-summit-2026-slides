<template>
  <section class="bifrost-evidence">
    <p class="eyebrow">05 · BIFROST EVIDENCE</p>
    <h1>量化效益，先看「最佳化了什麼」。</h1>
    <div class="evidence-content">
      <section class="official">
        <h2>官方實測：MCP Code Mode</h2>
        <p class="context">固定 Claude Sonnet 4.6 · 每輪 64–65 題 · 按需載入工具</p>
        <table aria-label="Bifrost Code Mode 官方成本比較">
          <thead><tr><th>工具數</th><th>估算費用 USD<br><span>關閉 → 開啟</span></th><th>節省</th><th>報告通過率<br><span>關閉 → 開啟</span></th></tr></thead>
          <tbody>
            <tr><th>96<small>6 servers</small></th><td>$104.04 → $46.06</td><td class="saving">55.7%</td><td>100 → 100%</td></tr>
            <tr><th>251<small>11 servers</small></th><td>$180.07 → $29.80</td><td class="saving">83.4%</td><td>98.5 → 100%</td></tr>
            <tr><th>508<small>16 servers</small></th><td>≈ $377 → $29</td><td class="saving">92.2%</td><td>100 → 100%</td></tr>
          </tbody>
        </table>
        <p class="limit">廠商內部測試；第二輪含失敗後重跑紀錄，<br>通過率不等同嚴格的首次成功率。</p>
      </section>
      <section class="external">
        <h2>其他公開實測</h2>
        <div class="external-result"><h3>小工具集：未觀察到節費</h3><p class="context">Ahmed · v1.4.14 · 1 server／19 tools</p><p class="number">$0.065 → $0.067 <span>／請求</span></p><p>Code Mode 費用約增加 <b>3%</b>。<br><small>個人產品評測，非大規模研究。</small></p></div>
        <div class="external-result"><h3>Gateway：可比較傳輸效能</h3><p class="context">ENTERPILOT · 2026.09.18 · 模擬後端</p><p class="number">4.30 <span>vs</span> 44.05 <span>ms · p50</span></p><p>Bifrost 2.2.1 ／ LiteLLM 1.101.0<br><small>GoModel 團隊維護；未測答案正確率。</small></p></div>
      </section>
    </div>
    <p class="boundary">以上不是多模型路由成效；目前未找到其節費與正確率的公開對照驗證。</p>
    <div class="citations" lang="en">
      <p>Maxim AI. (n.d.). <a href="https://github.com/maximhq/bifrost-benchmarking/blob/main/mcp-code-mode-benchmark/benchmark_report.md" target="_blank" rel="noopener"><em>MCP Code Mode benchmark report</em></a> [Technical report]. GitHub. Summary; Rounds 1–3.</p>
      <p>Ahmed, R. (2026, March). <a href="https://r-eehan.github.io/bifrost-product-evaluation/" target="_blank" rel="noopener"><em>Bifrost: LLM &amp; MCP Gateway evaluation</em></a> [Product evaluation].</p>
      <p>ENTERPILOT. (2026). <a href="https://github.com/ENTERPILOT/ai-gateway-reproducible-benchmark" target="_blank" rel="noopener"><em>AI gateway reproducible benchmark</em></a> [Benchmark code and results]. GitHub. Run: 20260918-212130. Retrieved September 28, 2026.</p>
    </div>
  </section>
</template>
<style scoped>
.bifrost-evidence h1{font-size:43px;margin:12px 0 16px}.evidence-content{display:grid;grid-template-columns:1.65fr 1fr;gap:32px}.evidence-content h2{font-size:26px;font-weight:500;margin:0 0 7px}.context{font-size:15px;color:#525252;line-height:1.4}.external{border-left:1px solid #c6c6c6;padding-left:28px}
table{width:100%;border-collapse:collapse;margin-top:13px;font-size:20px;line-height:1.3}th,td{text-align:left;border-bottom:1px solid #c6c6c6;padding:7px 8px;font-weight:400;white-space:nowrap}thead th{font-size:16px;color:#525252;padding-top:0;padding-bottom:7px}thead span{font-size:13px}tbody th{font-size:25px;font-weight:500}th small{display:block;font-size:12px;font-weight:400;color:#525252}.saving{color:#0043ce;font-weight:500;font-size:26px}.finding{font-size:23px;color:#0043ce;margin-top:12px!important;line-height:1.3}.limit{font-size:15px;color:#525252;margin-top:5px!important;line-height:1.4}
.external-result{margin-top:12px}.external-result + .external-result{border-top:1px solid #c6c6c6;padding-top:10px}.external-result h3{font-size:21px;font-weight:500;margin:0 0 4px}.external-result .number{font-size:29px;font-weight:500;margin:5px 0!important;font-variant-numeric:tabular-nums;line-height:1.25}.number span{font-size:16px;font-weight:400;color:#525252}.external-result p:not(.context):not(.number){font-size:18px;line-height:1.4}.external-result small{font-size:14px;color:#525252}.boundary{font-size:18px;color:#0043ce;margin-top:12px!important;line-height:1.4}
.citations{position:absolute;bottom:83px;left:72px;right:72px;border-top:1px solid #c6c6c6;padding-top:9px;font-size:12.5px;line-height:1.5;color:#393939}.citations p{font:inherit;padding-left:16px;text-indent:-16px;margin:0 0 3px}.citations a{color:#0043ce;text-decoration:none}.citations a:hover{text-decoration:underline}.citations a:focus-visible{outline:2px solid #0f62fe}
</style>
