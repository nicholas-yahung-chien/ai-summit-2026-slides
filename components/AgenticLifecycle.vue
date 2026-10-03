<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
const rows = [
  { name: 'AI-DLC', label: 'AI 驅動的完整生命週期', flow: '業務意圖 → 需求釐清 → 建構驗證 → 部署營運', change: 'AI 提案與執行，人掌握關鍵決策', example: 'AWS AI-DLC', url: 'https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/' },
  { name: 'SDD', label: '規格驅動開發', flow: '規格 → 設計 → 任務拆解 → 實作驗收', change: '以持續維護的規格引導實作與驗收', example: 'GitHub Spec Kit · Kiro', url: 'https://github.github.com/spec-kit/reference/agentic-sdd.html' },
  { name: 'AI 結對程式設計', label: '工程師與代理共同推進', flow: '探索 → 規劃 → 修改 → 驗證 → 回饋', change: '工程師指導與審查，代理完成多步工作', example: 'Claude Code · IBM Bob', url: 'https://bob.ibm.com/docs/ide/tutorials/ai-pair-programming-with-ibm-bob' },
  { name: '測試與驗收驅動', label: 'Agentic TDD／驗證迴圈', flow: '成功條件 → 測試 → 實作 → 驗證修正', change: '代理依可執行的檢查結果反覆改進', example: 'Claude Code 驗證流程', url: 'https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work' },
  { name: 'Issue-to-PR', label: '任務委派式開發', flow: '任務 → 背景執行 → PR → 審查合併', change: '人交付明確任務，代理交回可審查變更', example: 'GitHub Copilot cloud agent', url: 'https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent' },
  { name: 'Continuous AI', label: '持續代理式工程', flow: '事件／排程 → 分析修正 → CI 驗證 → 回饋', change: '代理持續參與維護，補強現有 CI/CD', example: 'GitHub Agentic Workflows', url: 'https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/' },
].map(row => ({ ...row, examples: row.name === 'SDD'
  ? [{ name: 'GitHub Spec Kit', url: row.url }, { name: 'Kiro', url: 'https://kiro.dev/docs/specs/' }]
  : row.name === 'AI 結對程式設計'
    ? [{ name: 'Claude Code', url: 'https://code.claude.com/docs/en/best-practices#explore-first-then-plan-then-code' }, { name: 'IBM Bob', url: row.url }]
    : [{ name: row.example, url: row.url }]
}))
const order = ['AI 結對程式設計', 'AI-DLC', 'SDD', '測試與驗收驅動', 'Issue-to-PR', 'Continuous AI']
const evidence = {
  'AI 結對程式設計': { human: '持續討論與逐步審查', docs: '計畫、技術文件', steps: ['探索 → 規劃 → 修改', '驗證 → 回饋'] },
  'AI-DLC': { human: '團隊協作與關鍵決策', docs: '需求、計畫、設計文件', steps: ['業務意圖 → 需求釐清', '建構驗證 → 部署營運'] },
  'SDD': { human: '審核規格與階段成果', docs: '規格、設計、任務清單', steps: ['規格 → 設計 → 任務拆解', '實作 → 對照規格驗收'] },
  '測試與驗收驅動': { human: '定義驗收、處理例外', docs: '測試碼、驗證結果', steps: ['成功條件 → 測試 → 實作', '驗證 → 修正'] },
  'Issue-to-PR': { human: '委派任務與審查 PR', docs: 'Issue、PR、提交與執行紀錄', steps: ['任務 → 背景執行 → PR', '審查 → 合併'] },
  'Continuous AI': { human: '設定規則與監督例外', docs: 'Markdown 工作流程定義、執行報告', steps: ['事件／排程 → 分析修正', 'CI 驗證 → 回饋'] },
}
const sortedRows = order.map(name => ({ ...rows.find(row => row.name === name), ...evidence[name] }))
</script>
<template>
  <section :key="replay" class="agentic-lifecycle" :class="{ instant: !active || $renderContext === 'print' }">
    <p class="eyebrow">06 · AGENTIC SDLC</p>
    <h1>AI 代理時代的軟體開發生命週期</h1>
    <p class="intro">按典型情境的人員持續參與程度排序，可搭配使用；實際程度取決於任務與審核設定</p>
    <div class="comparison">
    <aside class="involvement" aria-label="由上到下，人持續參與由多到少；示意排序，非量測排名">
      <span>多</span><div class="arrow-track"><i class="arrow-head" /></div><span>少</span><b>人持續參與</b>
    </aside>
    <table aria-label="六類 AI 代理開發流程比較">
      <colgroup><col style="width:22%"><col style="width:29%"><col style="width:29%"><col style="width:20%"></colgroup>
      <thead><tr><th>方法／人的參與</th><th>典型流程</th><th>文件與留存產物</th><th>代表實作</th></tr></thead>
      <tbody><tr v-for="row in sortedRows" :key="row.name">
        <th><strong>{{ row.name }}</strong><small>{{ row.human }}</small></th>
        <td class="flow"><span v-for="line in row.steps" :key="line">{{ line }}</span></td>
        <td class="documents">{{ row.docs }}</td>
        <td><div class="examples"><a v-for="example in row.examples" :key="example.name" :href="example.url" target="_blank" rel="noopener">{{ example.name }} ↗</a></div></td>
      </tr></tbody>
    </table>
    </div>
    <p class="sources">依各列官方文件歸納 · 查閱日期 2026-09-29</p>
  </section>
</template>
<style scoped>
.agentic-lifecycle h1{font-size:43px;margin:12px 0 8px;line-height:1.2}.intro{font-size:19px;color:#525252;margin:0 0 15px!important}
table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:18px;line-height:1.4}th,td{text-align:left;padding:6px 12px;vertical-align:middle;border-bottom:1px solid #d6d6d6}thead th{font-size:18px;font-weight:500;color:#0043ce;border-bottom:2px solid #0f62fe;padding-top:0;padding-bottom:9px}th:first-child{padding-left:0}tbody th{font-weight:400}strong{font-size:21px;font-weight:500}small{display:block;font-size:14px;color:#525252;margin-top:3px}.flow{font-size:17px;white-space:nowrap}.examples{display:flex;gap:14px;flex-wrap:wrap;margin-top:5px}.examples a{display:inline-block;font-size:13px;color:#0043ce;text-decoration:none}a:hover{text-decoration:underline}a:focus-visible{outline:2px solid #0f62fe}
.takeaway{font-size:24px;color:#0043ce;margin:16px 0 0!important}.sources{position:absolute;left:72px;right:72px;bottom:80px;font-size:12px;color:#525252;border-top:1px solid #c6c6c6;padding-top:10px}.sources a{color:#0043ce}
</style>
<style scoped>
.intro{font-size:17px}.comparison{position:relative;padding-left:60px}table{font-size:17px}th,td{padding:8px 9px}thead th{font-size:17px}strong{font-size:19px}small{font-size:13px}.flow{font-size:17px;white-space:normal}.flow span{display:block}.documents{font-size:14px;line-height:1.45;color:#393939}.examples{display:flex;flex-direction:column;gap:3px;margin:0}.examples a{font-size:13px;line-height:1.4}
.involvement{position:absolute;top:45px;bottom:8px;left:0;width:42px;display:flex;align-items:center;flex-direction:column;color:#0043ce;font-size:17px}.involvement b{position:absolute;left:-20px;top:105px;writing-mode:vertical-rl;font-size:14px;font-weight:500;letter-spacing:3px}.arrow-track{position:relative;flex:1;width:3px;margin:10px 0;background:#c8d8f6}.arrow-track:after{content:'';position:absolute;bottom:0;left:-5px;width:13px;height:13px;border-right:3px solid #0f62fe;border-bottom:3px solid #0f62fe;transform:rotate(45deg)}.arrow-head{position:absolute;left:-5px;top:0;width:13px;height:13px;border-right:3px solid #0f62fe;border-bottom:3px solid #0f62fe;animation:descending 2.4s cubic-bezier(.25,1,.5,1) 2 both}
@keyframes descending{0%{transform:translateY(0) rotate(45deg);opacity:0}12%{opacity:1}85%{opacity:1}100%{transform:translateY(285px) rotate(45deg);opacity:0}}
.instant .arrow-head{animation:none;display:none}@media(prefers-reduced-motion:reduce){.arrow-head{animation:none;display:none}}@media print{.arrow-head{display:none}}
</style>
