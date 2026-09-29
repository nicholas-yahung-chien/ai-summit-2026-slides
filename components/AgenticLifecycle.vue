<script setup>
const rows = [
  { name: 'AI-DLC', label: 'AI 驅動的完整生命週期', flow: '業務意圖 → 需求釐清 → 建構驗證 → 部署營運', change: 'AI 提案與執行，人掌握關鍵決策', example: 'AWS AI-DLC', url: 'https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/' },
  { name: 'SDD', label: '規格驅動開發', flow: '規格 → 設計 → 任務拆解 → 實作驗收', change: '以持續維護的規格引導實作與驗收', example: 'GitHub Spec Kit · Kiro', url: 'https://github.github.com/spec-kit/reference/agentic-sdd.html' },
  { name: '人機協作短迴圈', label: '工程師與代理共同推進', flow: '探索 → 規劃 → 修改 → 驗證 → 回饋', change: '工程師指導與審查，代理完成多步工作', example: 'Claude Code · IBM Bob', url: 'https://bob.ibm.com/docs/ide/tutorials/ai-pair-programming-with-ibm-bob' },
  { name: '測試與驗收驅動', label: 'Agentic TDD／驗證迴圈', flow: '成功條件 → 測試 → 實作 → 驗證修正', change: '代理依可執行的檢查結果反覆改進', example: 'Claude Code 驗證流程', url: 'https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work' },
  { name: 'Issue-to-PR', label: '任務委派式開發', flow: '任務 → 背景執行 → PR → 審查合併', change: '人交付明確任務，代理交回可審查變更', example: 'GitHub Copilot cloud agent', url: 'https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent' },
  { name: 'Continuous AI', label: '持續代理式工程', flow: '事件／排程 → 分析修正 → CI 驗證 → 回饋', change: '代理持續參與維護，補強現有 CI/CD', example: 'GitHub Agentic Workflows', url: 'https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/' },
].map(row => ({ ...row, examples: row.name === 'SDD'
  ? [{ name: 'GitHub Spec Kit', url: row.url }, { name: 'Kiro', url: 'https://kiro.dev/docs/specs/' }]
  : row.name === '人機協作短迴圈'
    ? [{ name: 'Claude Code', url: 'https://code.claude.com/docs/en/best-practices#explore-first-then-plan-then-code' }, { name: 'IBM Bob', url: row.url }]
    : [{ name: row.example, url: row.url }]
}))
</script>
<template>
  <section class="agentic-lifecycle">
    <p class="eyebrow">06 · AGENTIC SDLC</p>
    <h1>AI 代理時代的軟體開發生命週期</h1>
    <p class="intro">六類方法涵蓋不同層次，可依團隊需求搭配使用</p>
    <table aria-label="六類 AI 代理開發流程比較">
      <colgroup><col style="width:23%"><col style="width:39%"><col style="width:38%"></colgroup>
      <thead><tr><th>開發方法</th><th>典型流程</th><th>工作方式的改變／代表實作</th></tr></thead>
      <tbody><tr v-for="row in rows" :key="row.name">
        <th><strong>{{ row.name }}</strong><small>{{ row.label }}</small></th>
        <td class="flow">{{ row.flow }}</td>
        <td>{{ row.change }}<div class="examples"><a v-for="example in row.examples" :key="example.name" :href="example.url" target="_blank" rel="noopener">{{ example.name }} ↗</a></div></td>
      </tr></tbody>
    </table>
    <p class="sources">依 AWS、GitHub、Anthropic、IBM 與 <a href="https://kiro.dev/docs/specs/" target="_blank" rel="noopener">Kiro 官方文件</a>歸納 · 各列代表實作連至來源 · 查閱日期 2026-09-29</p>
  </section>
</template>
<style scoped>
.agentic-lifecycle h1{font-size:43px;margin:12px 0 8px;line-height:1.2}.intro{font-size:19px;color:#525252;margin:0 0 15px!important}
table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:18px;line-height:1.4}th,td{text-align:left;padding:6px 12px;vertical-align:middle;border-bottom:1px solid #d6d6d6}thead th{font-size:18px;font-weight:500;color:#0043ce;border-bottom:2px solid #0f62fe;padding-top:0;padding-bottom:9px}th:first-child{padding-left:0}tbody th{font-weight:400}strong{font-size:21px;font-weight:500}small{display:block;font-size:14px;color:#525252;margin-top:3px}.flow{font-size:17px;white-space:nowrap}.examples{display:flex;gap:14px;flex-wrap:wrap;margin-top:5px}.examples a{display:inline-block;font-size:13px;color:#0043ce;text-decoration:none}a:hover{text-decoration:underline}a:focus-visible{outline:2px solid #0f62fe}
.takeaway{font-size:24px;color:#0043ce;margin:16px 0 0!important}.sources{position:absolute;left:72px;right:72px;bottom:80px;font-size:12px;color:#525252;border-top:1px solid #c6c6c6;padding-top:10px}.sources a{color:#0043ce}
</style>
