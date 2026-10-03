// Reproducible, structured authoring through Slidev's official MCP server.
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
const root = fileURLToPath(new URL('../', import.meta.url))
const sources = {
  history: ['Turing（1950）', 'https://academic.oup.com/mind/article/LIX/236/433/986238'],
  transformer: ['Transformer（2017）', 'https://arxiv.org/abs/1706.03762'],
  anthropic: ['Anthropic 多代理研究系統（2025）', 'https://www.anthropic.com/engineering/multi-agent-research-system'],
  uncle: ['Uncle Bob 本人網站', 'https://www.cleancoder.com/'],
  swarm: ['SwarmForge 專案', 'https://github.com/unclebob/swarm-forge'],
  jev: ['TypeSafe：Jev 發布（2026.09.15）', 'https://typesafe.ai/blog/introducing-system-one-models-and-jev'],
  dropout: ['AgentDropout · ACL 2025 · Tables 1–2', 'https://aclanthology.org/2025.acl-long.1170.pdf'],
  prune: ['AgentPrune · arXiv v1 · Table 3', 'https://arxiv.org/html/2410.02506v1'],
  route: ['RouteLLM · UC Berkeley（2024）', 'https://sky.cs.berkeley.edu/project/routellm/'],
  bob: ['IBM Bob V2 官方架構說明', 'https://bob.ibm.com/blog/bob-v2-release-announcement/'],
  ibm: ['IBM 官方公告（2026.07.09）', 'https://newsroom.ibm.com/2026-07-09-ibm-advances-enterprise-ai-software-development-with-multi-agent-capabilities-and-specialized-modernization-workflows'],
  analytics: ['Bobalytics 官方文件', 'https://bob.ibm.com/docs/ide/features/bobalytics'],
  spec: ['GitHub Spec Kit', 'https://github.com/github/spec-kit'],
  dlc: ['IBM：AI-DLC', 'https://www.ibm.com/think/topics/ai-dlc'],
  loop: ['Anthropic：開發最佳實務', 'https://code.claude.com/docs/en/best-practices'],
  ayman: ['Ayman Nadeem：Plan Mode Is Dead（09.24）', 'https://www.aymannadeem.com/artificial/intelligence,/developer/tools/2026/09/24/plan-mode-is-dead.html'],
  henrik: ['Henrik Kniberg：代理並行的實務觀察', 'https://www.linkedin.com/posts/hkniberg_its-interesting-how-agentic-engineering-activity-7498285675310678016-NQvh'],
  garry: ['Garry Tan：Every company should have a Brain', 'https://ai.engineer/talks/eBUyTS7SzV4-every-company-should-have-brain'],
  interview: ['Matt Pocock × Uncle Bob（08.19）', 'https://www.youtube.com/watch?v=zcLPGC-tvgk'],
  rethink: ['Rethinking Harnesses 原貼文（09.12）', 'https://x.com/unclebobmartin/status/2098744156709441896'],
}
const cite = (...keys) => `<div class="source-line">${keys.map(k => `<a href="${sources[k][1]}" target="_blank" rel="noopener">${sources[k][0]} ↗</a>`).join(' · ')}</div>`
const lead = (section, title) => `<p class="eyebrow">${section}</p>\n<h1>${title}</h1>`
const cols = (items) => `<div class="talk-columns">${items.map(([label,title,body])=>`<section><span class="metric-label">${label}</span><h2>${title}</h2><p>${body}</p></section>`).join('')}</div>`
const slides = []
const add = (title, content, note, cls='talk-page') => slides.push({ frontmatter:{title,class:cls},content,note })
add('以代理式 AI 重塑軟體開發生命週期', `<div class="cover-kicker">AI SUMMIT <span>2026</span></div>
<div class="cover-copy"><p class="eyebrow">Build AI｜打造企業 AI 創新基礎</p><h1>以代理式 AI<br>重塑軟體開發<br><span class="blue-text">生命週期</span></h1><p class="cover-subtitle">Nicholas Chien / 錢亞宏</p><p class="cover-role">Solution Architect｜專家實驗室</p><p class="draft-label">2026.10.23 · 14:30–15:05</p></div><SummitKeyVisual class="cover-art" /><div class="cover-index">BUILD AI <span>／ FROM INTENT TO DELIVERY</span></div>`, '14:30–14:31（1 分鐘）。開場：當寫程式的速度大幅改變，團隊的需求、驗收與交付方式也必須跟著改變。這場演講從近期事件走到企業開發流程，最後用 IBM Bob 示範。', 'cover-page formal-cover')
add('35 分鐘，從模型進展走到交付', lead('THE JOURNEY · 35 MINUTES','從 AI 的進展，<br>走到團隊的下一次交付。')+`<div class="schedule-grid"><div><b>04′</b><span>AI 演進</span></div><div><b>05′</b><span>近期事件</span></div><div><b>06′</b><span>成本與證據</span></div><div><b>06′</b><span>IBM Bob</span></div><div><b>05′</b><span>SDLC 轉變</span></div><div><b>07′</b><span>現場示範</span></div><div><b>02′</b><span>帶回團隊</span></div></div><p class="takeaway">核心問題：如何把代理能力，變成可驗證的交付能力？</p>`, '14:31–14:32（1 分鐘）。前 4 分鐘包含封面與本頁。三個帶走的重點：降低協作浪費、保留交付證據、按風險分配人的注意力。')
add('AI 演進：從智慧問題到代理式交付', lead('01 · ACCELERATION','從「能思考嗎？」到「能交付嗎？」')+'<EvolutionChart />'+cite('history','transformer','anthropic'), '14:32–14:34（2 分鐘）。動畫折線是概念敘事，不能讀成 AI 能力的實測成長曲線。依序說明 1950 圖靈的問題、2017 Transformer、2025 Anthropic 多代理研究系統、2026 年 Bob 與 Jev。近年事件變密集是本演講的觀察，所選里程碑並非完整歷史或普遍迭代速率的統計證明。Bob 與 Jev 的日期來源見後續各頁。', 'talk-page chart-page')
add('近期事件：工作流也在快速改變', lead('02 · TWO SIGNALS','模型在進步，<br>工作流也需要重新設計。')+cols([['SIGNAL 01','重新評估編排','Uncle Bob：<br>從協作框架到<br>重新思考 harness。'],['SIGNAL 02','決策專門化','Jev：<br>將路由與分類等決策<br>交給專用模型。']])+cite('uncle','swarm','jev'), '14:34–14:35（1 分鐘）。這兩件事的共同啟示，是不要把昨天模型的限制永久寫進今天的工作流。這是講者歸納，並非兩者合作或 IBM 使用 Jev 的證據。')
add('Uncle Bob：重新思考 harness', lead('2026 · UNCLE BOB','需要重新評估的，<br>是約束的成本與效益。')+`<div class="event-pair"><section><span>08.19 · 訪談線索</span><h2>多代理與品質關卡</h2><p>SwarmForge 可確認包含<br>隔離工作區、交接與核准流程。</p></section><section><span>09.12 · 本人網站已列出</span><h2>Rethinking Harnesses</h2><p>重新思考編排框架，<br>以及模型進步後的工作方式。</p></section></div><p class="takeaway">保留必要的驗證，持續量測編排本身的負擔。</p>`+cite('uncle','swarm'), '14:35–14:37（2 分鐘）。8/19 Matt Pocock 訪談影片線索：https://www.youtube.com/watch?v=zcLPGC-tvgk。原始影片尚未取得逐字內容；9/12 影片由本人網站連出：https://x.com/unclebobmartin/status/2098744156709441896。尚未直接核對影片口述，不將「safe gate 不再必要」作為確定引言，也不給 token 降幅數字。本人專案名稱是 SwarmForge；safe gate 暫視為使用者對品質關卡的描述。登台前需核對原片、時間戳與語境。', 'talk-page')
add('Jev：把決策與生成分工', lead('2026.09.15 · JEV','不是每個決策，<br>都需要生成一大段文字。')+cols([['INPUT','工作狀態','任務、候選選項<br>與明確的輸出型別。'],['DECISION','型別化決策','分類、排序、路由<br>或風險判斷。'],['ACTION','合適的執行者','交給工具、代理<br>或生成模型處理。']])+`<p class="takeaway">Jev 是早期存取的決策模型；不能據此宣稱模型權重已開源。</p>`+cite('jev'), '14:37–14:39（2 分鐘）。官方描述為 System One 模型，輸出型別化機率值，與自由文字生成分工。這張圖是應用示意，不是 IBM Bob 的內部實作。供應商宣稱的延遲與成本改善屬特定工作流；本演講不把它當成通用程式開發基準。SDK 開放與模型權重開源是兩件事。')
add('技術債的成本結構改變了', lead('03 · THE ECONOMICS','重寫變便宜，<br>理解與驗證仍然有成本。')+`<div class="event-pair"><section><span>HUMAN-CENTRIC</span><h2>人天與協作時間</h2><p>理解既有程式、修改設計、<br>跨團隊溝通與維護。</p></section><section><span>AGENT-ASSISTED</span><h2>Token ＋ 驗證成本</h2><p>上下文、重試與工具呼叫，<br>加上人的審查與營運風險。</p></section></div><p class="takeaway">架構的價值轉向：縮小上下文、清楚介面、可驗證的邊界。</p>`, '14:39–14:41（2 分鐘）。這是本演講的分析框架，不是文獻證明技術債已完全由人天轉成 token。Patterns 與 architecture 不只為人天服務，也處理可靠性、安全、可變更性。總成本可拆成人工時間、模型與工具費用、等待時間、失敗風險。')
add('同一基準：代理多，不代表 token 少', lead('EVIDENCE 01 · SAME BENCHMARK','多代理的效益，需要一起看成本。')+`<p class="table-context">HumanEval · Llama3-8B-Instruct · 論文表 1、2</p><table class="research-table"><thead><tr><th>方法</th><th>輸入 tokens</th><th>輸出 tokens</th><th>Pass@1</th></tr></thead><tbody><tr><td>單代理 Vanilla</td><td>91K</td><td>25K</td><td>53.33%</td></tr><tr><td>多代理 · 多輪</td><td>2.6M</td><td>492K</td><td>49.17%</td></tr><tr class="emphasis"><td>AgentDropout</td><td>1.1M</td><td>359K</td><td>55.84%</td></tr></tbody></table><p class="takeaway">刪減無效協作有幫助；仍不能推論「多代理普遍比較省」。</p>`+cite('dropout'), '14:41–14:42（1 分鐘）。資料為論文報告的同一 HumanEval 實驗設定與整批 token 數，K=千、M=百萬，不是每題平均。呈現 Llama3-8B 的一個反例，而非所有模型的通則。這個結果也不能外推為 IBM Bob 的測量結果。多代理多輪對應 MAS round=T。來源精度本來就是 K/M，避免自行給出過度精確的倍數。')
add('減少協作浪費，才是節省 token 的關鍵', lead('EVIDENCE 02 · COMMUNICATION PRUNING','把訊息傳遞，留給有價值的協作。')+`<p class="table-context">HumanEval · 5 個 GPT-4 agents · AutoGen ± AgentPrune</p><div class="token-bars"><div><span>原始輸入</span><i style="width:100%"></i><b>492,273</b></div><div><span>剪枝後輸入</span><i class="teal-bar" style="width:64.01%"></i><b>315,105</b></div></div><div class="result-strip"><strong>−36.0%<small>輸入 tokens</small></strong><strong>−26.9%<small>輸入＋輸出 tokens</small></strong><strong>85.41 → 86.65<small>論文性能指標</small></strong></div>`+cite('prune'), '14:42–14:43（1 分鐘）。使用 arXiv v1 Table 3 HumanEval AutoGen 行，避免混用不同版本。輸出 130,196→139,714，反而增加。因此總量 622,469→454,819；(1-454819/622469)*100=26.933%。輸入節省約 35.99%。兩組都是多代理，不能稱作相對單代理的節省。圖柱只有輸入 token，結果列明確分開。')
add('模型路由：降低費用與減少 token 不同', lead('EVIDENCE 03 · MODEL ROUTING','讓適合的模型，<br>承接適合的問題。')+`<div class="route-metric"><strong>&gt;85%</strong><div><h2>MT-Bench 成本降低</h2><p>RouteLLM 專案報告：<br>保留 95% GPT-4 表現的設定。</p></div></div><p class="takeaway">這是費用指標；不是 token 節省率，也不是 Bob 的產品數據。</p>`+cite('route'), '14:43–14:45（2 分鐘）。RouteLLM 在強弱模型間選擇，Berkeley 專案頁報告 MT-Bench 超過85%成本降低、95%GPT-4表現。不同任務的結果不同；不是95%正確率。企業落地要固定任務集、品質門檻、重試策略，記錄輸入/輸出/快取 token、費用、耗時與成功率。模型更便宜就可能省錢，不需要先減少 token 數。')
add('IBM Bob V2：三層產品架構', lead('04 · IBM BOB','一套代理核心，<br>連接不同的開發介面。')+`<div class="architecture-stack"><div><b>CLIENTS</b><strong>IDE ／ Shell</strong><span>開發者的工作介面</span></div><div><b>HARNESS</b><strong>共用基礎設施</strong><span>身分驗證、記錄、遙測、功能旗標</span></div><div><b>AGENT</b><strong>推理與程式生成</strong><span>代理循環、工具使用與任務處理</span></div></div>`+cite('bob'), '14:45–14:47（2 分鐘）。這是 IBM Bob V2 官方文章的三層架構重繪，不是網路部署拓樸。先從使用者介面往下解釋：不同 client 共用 harness 與 agent。不要將「主代理＋子代理」的任務結構混稱為這三個產品層。')
add('IBM Bob：任務分工與模型選擇', lead('TASK EXECUTION · CONCEPTUAL VIEW','控制上下文，<br>也控制不必要的工作。')+cols([['01 · DELEGATE','子代理','獨立上下文處理子任務，<br>將摘要回傳主代理。'],['02 · EXECUTE','工具並行','可在一回合提出<br>多個原生工具呼叫。'],['03 · SELECT','模型選擇','依任務匹配模型，<br>平衡品質與成本。']])+`<p class="takeaway">與近期趨勢相呼應；未宣稱 Bob 採用 Jev 或特定研究演算法。</p>`+cite('bob','ibm'), '14:47–14:49（2 分鐘）。前兩項依 Bob V2 官方部落格；模型匹配依 7/9 IBM 公告。這是能力概念圖，官方並未在這些來源公開完整 routing policy，也未提供本場任務的 token 節省率。不要把 context 隔離說成零成本或保證更快。')
add('Bobalytics：看見採用與消耗', lead('ENTERPRISE VISIBILITY','讓使用量與交付成果，<br>進入同一場管理對話。')+cols([['ADOPTION','採用情況','哪些團隊正在使用？<br>使用是否持續？'],['USAGE','Bobcoin 消耗','觀察消耗與模式，<br>對照團隊與期間。'],['OUTCOMES','交付證據','搭配缺陷、驗收結果<br>與交付時間評估。']])+`<p class="takeaway">Bobalytics 為 Enterprise 功能；Bobcoin 不等於原始 token 數。</p>`+cite('analytics'), '14:49–14:51（2 分鐘）。官方文件的採用率為平均日活躍使用者/授權席位。Bob factor 是已提交程式中 Bob 產生行數的占比，不能直接當成生產力或品質。本頁交付證據是管理建議，並非聲稱 Bobalytics 原生提供全部缺陷或 lead time 指標。不要承諾未確認的逐 token 檢視或預算硬限制。')
add('AI 改變 SDLC 的重心', lead('05 · THE DEVELOPMENT LIFECYCLE','從交接文件，<br>走向持續驗證的工作循環。')+`<div class="lifecycle-compare"><div><span>傳統流程視角</span><p>需求 → 設計 → 實作 → 測試 → 維運</p></div><div><span>代理協作視角</span><p>意圖 ⇄ 規格 ⇄ 執行 ⇄ 證據 ⇄ 回饋</p></div></div><p class="takeaway">人持續擁有目標、風險判斷與驗收責任。</p>`+cite('spec','dlc','loop'), '14:51–14:52（1 分鐘）。圖為本演講的整理，不表示傳統 Agile 沒有回饋，也不表示 AI 讓所有工作同步完成。差異在代理可跨階段執行，規格與測試需更可機器執行；人類要在高風險決策點提供判斷。')
add('三種代表性的 AI 開發實務', lead('THREE PRACTICAL APPROACHES','依任務與風險，<br>選擇流程的重量。')+`<div class="method-rows"><div><b>短迭代代理循環</b><span>探索 → 計畫 → 實作 → 驗證</span><small>適合範圍明確的維護</small></div><div><b>Spec-driven</b><span>規格 → 計畫 → 任務 → 收斂</span><small>適合驗收條件清楚的功能</small></div><div><b>AI-DLC</b><span>Inception → Construction → Operations</span><small>適合跨角色的完整交付</small></div></div>`+cite('loop','spec','dlc'), '14:52–14:54（2 分鐘）。這三者是代表性文件化實務，不是市場占有率排名或唯一標準。Anthropic 短迭代工作流程是工程實踐，不是完整正式生命週期標準；Spec Kit 聚焦規格到實作；AI-DLC 是更廣的交付方法。AWS workflow 工具版本另有初始化與構想階段，這裡採 IBM 介紹的核心三階段概念，避免混稱完整工具步驟。')
add('今天示範：以驗收規格驅動一個小功能', lead('DEMO DESIGN · SPEC-DRIVEN LOOP','把「做一個功能」，<br>變成「證明一個行為」。')+`<div class="delivery-flow"><div><span class="step-number">01</span><h2>規格</h2><p>座位上限<br>與重複報名</p></div><span class="flow-arrow">→</span><div><span class="step-number">02</span><h2>計畫</h2><p>資料結構<br>與驗收案例</p></div><span class="flow-arrow">→</span><div><span class="step-number">03</span><h2>實作</h2><p>小範圍修改<br>執行測試</p></div><span class="flow-arrow">→</span><div><span class="step-number">04</span><h2>驗收</h2><p>行為證據<br>與剩餘限制</p></div></div><p class="takeaway">展示的是可追溯的交付流程，不是程式碼生成速度競賽。</p>`, '14:54–14:56（2 分鐘）。本次示範採 spec-driven 的核心原則，並非聲稱已把 Spec Kit 安裝到 Bob。使用 repo 的 demo/ 目錄，功能為研討會報名座位規則，無外部服務與個資。完整腳本在 docs/demo-runbook.md。')
add('Live demo：用 IBM Bob 完成一個交付循環', lead('06 · LIVE DEMO · 7 MINUTES','讓 Bob 實作。<br>讓證據說明完成。')+`<div class="demo-cue"><strong>研討會報名規則</strong><p>容量 3 人；重複報名不占座位；<br>額滿拒絕新報名；取消後釋出座位。</p></div><div class="demo-timing"><span>01′ 理解規格</span><span>01′ 確認計畫</span><span>03′ 實作與測試</span><span>02′ 驗收與回顧</span></div><p class="takeaway">切換至 IBM Bob，開啟本專案的 demo 資料夾。</p>`, '14:56–15:03（7 分鐘，此頁與接下來兩頁共用時段）。demo/README.md 為規格；registration.mjs 為待完成起點；registration.test.mjs 為驗收案例。執行 node --test demo/registration.test.mjs。先讓 Bob 探索，不要直接把完成版交給模型；計畫確認後再實作。尚未在 IBM Bob 中實際排演，不能把 repo 測試通過當作 Bob 已完成的證據。', 'talk-page')
add('示範驗收：四種行為，四份證據', lead('DEMO · ACCEPTANCE','看見綠燈之前，<br>先確認測到了什麼。')+`<div class="acceptance-grid"><div><b>正常報名</b><p>成功加入；占用一席</p></div><div><b>重複報名</b><p>保持原狀；不重複占位</p></div><div><b>額滿拒絕</b><p>回傳 full；名單不變</p></div><div><b>取消再報名</b><p>席次回復；可接受新人</p></div></div><p class="takeaway">補看輸入邊界與狀態變更；測試通過後，仍要對照需求。</p>`, '示範第5–6分鐘的驗收提示頁。可留在 Bob 看測試，也可跳至此頁整理。題目刻意限定本機純函式，不處理跨程序併發、付款、認證或正式資料庫；這些需另訂需求。')
add('示範備援：保留交付軌跡', lead('DEMO · FALLBACK','如果現場連線中斷，<br>沿著同一份證據走完。')+`<div class="method-rows"><div><b>規格</b><span>demo/README.md</span><small>行為與範圍</small></div><div><b>驗收</b><span>registration.test.mjs</span><small>可執行案例</small></div><div><b>參考實作</b><span>demo/reference/</span><small>預先準備，非現場生成</small></div></div><p class="takeaway">記錄觀察到的耗時與消耗；未量測的欄位留白。</p>`, '示範備援頁，正常情況可直接跳至第20頁。參考實作是為簡報預先準備且以 Node 驗證的版本，不冒充 Bob 實際輸出。若無網路，用 node --test demo/reference/registration.test.mjs 檢查備援結果並解釋設計取捨。')
add('把代理能力，轉成團隊的交付能力', `<p class="eyebrow">BUILD AI · TAKE IT BACK TO YOUR TEAM</p><div class="closing-copy"><h1>清楚的意圖。<br>適量的協作。<br><span style="color:#a6c8ff">可驗證的交付。</span></h1><p>Nicholas Chien / 錢亞宏</p><span class="closing-date">2026.10.23 · AI SUMMIT</span></div><SummitArt class="closing-art" />`, '15:03–15:05（2 分鐘）。結語：選一項真實任務，用相同驗收條件比較既有方式與 Bob。一起量測成功率、人的審查時間、消耗與耗時，再決定增加或減少代理。保留最後一分鐘接一個問題。', 'closing-page')
add('參考資料：事件與產品', lead('APPENDIX A · SOURCES','事件與產品資料')+`<div class="reference-list">${['history','transformer','anthropic','uncle','swarm','jev','bob','ibm','analytics'].map(k=>`<a href="${sources[k][1]}" target="_blank" rel="noopener">${sources[k][0]} ↗</a>`).join('')}</div><p class="reference-note">資料檢視日：2026.09.28。Uncle Bob 原片措辭仍待核對；Jev 不標為開源權重。</p>`, '附錄，不计入35分鐘。每一項為可點選的一手來源。公開頁面包含講者備註，所以這裡不放內部資料。', 'talk-page reference-page')
add('參考資料：實驗與開發方法', lead('APPENDIX B · SOURCES','實驗與開發方法')+`<div class="reference-list">${['dropout','prune','route','loop','spec','dlc'].map(k=>`<a href="${sources[k][1]}" target="_blank" rel="noopener">${sources[k][0]} ↗</a>`).join('')}</div><p class="reference-note">論文結果保留各自模型、任務與分母；不可當作 IBM Bob 的實測成效。<br>完整限制、計算與示範腳本收錄於 GitHub 專案 docs/。</p>`, '附錄，不计入35分鐘。所有研究數字採明確來源的特定實驗；不做跨論文模型、資料集或 token 計價的直接排名。')

slides[13] = {
  frontmatter:{title:'SDLC 的新重心：理解、並行與記憶',class:'talk-page'},
  content:lead('05 · PRACTITIONER PERSPECTIVES','流程變快之後，<br>人的理解要能跟上。')+cols([
    ['AYMAN NADEEM','短循環','理解、執行、檢視、調整；<br>計畫不必變成厚重文件。'],
    ['HENRIK KNIBERG','獨立並行','隔離工作區讓代理並行；<br>人仍需回饋與驗收。'],
    ['GARRY TAN','組織記憶','將修正後的經驗<br>沉澱為可維護的技能。'],
  ])+'<p class="takeaway">實務觀點的共同啟示：縮短回饋，保留決策與學習。</p>'+cite('ayman','henrik','garry'),
  note:'14:51–14:52（1 分鐘）。三項皆為實務觀點，不是受控實驗。Ayman 批評的是僵硬的 plan/build 分隔，並沒有否定思考與理解。Henrik 描述以 git worktrees 隔離並行任務的個人經驗，不能推論多工必定有效。Garry 參考使用者提供的 AI Engineer 演講頁，8:43 區分模型判斷與程式狀態、15:13 將修正變成可維護程序；不採用個人宣稱的生產力倍數。這三者可融入 SDLC，而非取代全部生命週期。',
}
slides[21].content += '<div class="supplement-links">'+['ayman','henrik','garry'].map(k=>`<a href="${sources[k][1]}" target="_blank" rel="noopener">${sources[k][0]} ↗</a>`).join('')+'</div>'
slides[4].content = slides[4].content.replace('08.19 · 訪談線索','08.19 · Matt Pocock 訪談').replace('09.12 · 本人網站已列出','09.12 · 本人發布短片').replace(cite('uncle','swarm'),cite('interview','rethink'))
slides[4].note += '\n補充查證：已在 YouTube 原片頁直接確認串流日期為2026年8月19日；原片章節 10:20 為 Deterministic tools vs steering、18:02 為 Multi-agent systems。X 原貼文日期與作者也已直接確認。YouTube 轉錄稿面板持續載入，尚未核對完整措辭。'
// Omit the agenda slide from the published deck; preserve source indices above.
slides.splice(1, 1)
slides[1].content = '<EvolutionChart />'
slides[1].note = '14:31–14:34。12 個代表節點，以單一上升曲線呈現近年進展密集的敘事印象。橫軸僅列時間；時間非等距，曲線高度不是量測能力或成長率，不能由精選節點推算普遍突破週期。依序為圖靈測試、專家系統、Deep Blue、Watson、AlphaGo、Transformer、GPT-3、ChatGPT、watsonx、vibe coding、Bob V2、Jev。2011 年 Jeopardy! 冠軍是 Watson；watsonx 是 2023 年的平台。此處 AlphaGo 指 2016 年擊敗李世乭，2015 年已擊敗樊麾。LLM 沒有單一誕生日；Jev 發表不等於權重開源。圖表不提供來源連結或彈出視窗。'
slides[1].note = '14:31–14:34。全領域的 15 個代表里程碑：圖靈測試、Dartmouth、DENDRAL 專家系統、1986 反向傳播代表論文、Deep Blue、Watson、AlexNet、GAN、AlphaGo、Transformer、GPT-3、AlphaFold 2、ChatGPT、o1、DeepSeek-R1。歷史根據包括電腦歷史博物館、諾貝爾獎科學背景與原始論文；沒有唯一公認的完整排行榜。Deep Blue 與 Watson 保留為歷史成果，watsonx、Bob V2、Jev 不列為全領域公認突破；vibe coding 屬開發方式與用語。o1 與 R1 是近期推理路線的代表，而非已具有與圖靈測試相同的歷史共識。2020.11 是 AlphaFold 2 的 CASP14 成果，2025.01 是 R1 發布日期，不是其 Nature 論文日期。時間軸非等距，曲線高度為敘事安排，不能推算實際成長率。頁面不顯示註解與來源連結。'
slides[1].note = '14:31–14:34。16 個歷史里程碑與近期發布。依使用者要求移除 Dartmouth、反向傳播、GAN、DeepSeek-R1。新增 2026 年 2 月 5 日 Claude Opus 4.6、3 月 5 日 GPT-5.4、5 月 19 日 Gemini 3.5 Flash、7 月 24 日 Claude Opus 5、9 月 22 日 GPT-6 Sol 與 Luna，均已核對官方發布。近期事件是產品與能力更新，不宣稱每次發布均為公認的歷史突破。橫軸非等距，曲線高度為敘事安排，不是實測能力分數；圖上不顯示註解與來源。'
slides[1].note = '14:31–14:34。16 個歷史里程碑與應用趨勢。近年改為：2023 RAG、2024 Agentic AI、2025.02 vibe coding、2026.02 Agentic CI、2026.02 多代理並行開發、2026.03 長時任務代理。RAG 原論文在 2020 年，此處 2023 取 LLM 應用研究綜述的代表時間，不是發明年或精確爆發點。2024 Agentic AI 以年底已出現的實務模式為依據，不表示代理概念始於該年。Vibe coding 用語在 2025.02 提出。2026 節點分別依 GitHub Continuous AI、Anthropic 並行代理編譯器實驗與長時任務 harness 設計案例，表示工程實踐的深化，不代表這些方法於 2026 首創，也不能用單一廠商案例證明全產業已普及。兩個 2026.02 節點同月。時間非等距、曲線高度為敘事安排；畫面不顯示來源及註解。'
slides[1].note += '\n最新修訂：移除 AlexNet 與 Transformer，新增 2026.04 代理託管服務（Anthropic 4/8 工程案例）、2026.05 搜尋代理化（Google I/O 5/19 公告，部分功能為後續推出計畫）、2026.06 代理走入辦公（6/25 Codex 使用研究，單一供應商樣本，非全市場普及證明）、2026.08 代理成為使用者（Hugging Face 8/14 平台報告，觀測期間主要至 7 月）。目前共 18 節點。這四個日期為公告或研究公開時間，而非概念首次出現或確切爆發日；曲線不表示實測成長率。'
slides[2] = {
  frontmatter: { title:'Uncle Bob：讓工具判定通過', class:'talk-page uncle-interview-page' },
  content:'<UncleBobInterview />',
  note:'14:34–14:35。專訪於2026年8月19日由Matt Pocock直播。引用原片17:01–17:08的英文字幕，節錄從口語重複的第二個you must開始。You must change the code until this tool says that it\'s okay. 中文為講者翻譯。原片16:55起說明確定性工具讓代理反覆修改，17:28–17:33也說這是犧牲部分生產力以換取較高品質的取捨，不能解讀成約束越多越好。畫面為原片約17:24。來源：https://www.youtube.com/watch?v=zcLPGC-tvgk&t=1021s。',
}
slides[2].note += '\n視覺更新：依使用者提供的專訪封面原圖呈現，取代影片畫面截圖。'
slides[2].note = '14:34–14:35。專訪日期2026年8月19日。引文依先前已直接讀取的YouTube原片轉錄稿14:56–15:14：The key with agents is to trim that initial prompt down to its absolute minimum … and then do deterministic tools after the fact. 省略號略去中間對提示優先性的說明及對談應答，保留原話、不另造句。中文為講者翻譯。語境是長篇規則可能在上下文中被忽略，確定性工具不以同樣方式消失；因此初始提示要精簡，接著用工具檢查。與第4頁對照：工具約束有價值，但模型進步後，編排負擔仍需重新評估。小標為講者歸納，非原話。視覺使用使用者提供的封面原圖，日期置於圖下，以IBM藍及底線強調。來源：https://www.youtube.com/watch?v=zcLPGC-tvgk&t=896s。'
slides[3] = {
  frontmatter: { title:'Uncle Bob：重新思考 harness', class:'talk-page' },
  content:'<UncleBobReflection english="Apparently the harness is doing the damage. That\'s not what I expected." chinese="看來，造成負面影響的正是這套 harness。這不是我原先預期的。" />',
  note:'14:35–14:37。貼文日期2026年9月12日，使用者提供原貼文截圖。引文直接依原貼文影片英文自動字幕04:06.063–04:14.628核對，從第二個Maybe開始節錄；補上一般標點，不改詞語。中文為講者翻譯。00:59–01:05他說自己實驗中單一代理優於自建harness；01:58–02:02認為harness造成負面影響。02:28–02:50放寬限制但仍要求CRAP分數、mutation testing與unit tests。這是個人實驗的反思，不是所有harness或品質關卡均無必要的結論，也不是可普遍套用的基準數據。原貼文：https://x.com/unclebobmartin/status/2098744156709441896。',
}
slides[3].note = '14:35–14:37。貼文日期2026年9月12日，使用者提供原貼文截圖。選定引文01:58.384–02:04.965：Apparently the harness is doing the damage. That\'s not what I expected. 以原貼文字幕及OpenAI gpt-4o-transcribe獨立音訊轉錄交叉核對一致，只補一般標點。中文為講者翻譯。頁上小標「當約束成為負擔」為講者歸納，非Uncle Bob原話。語境：他發現同一模型的單一代理優於自己建立的harness，並注意到代理能力已改善。因此本演講歸納為模型進步後應重新量測編排效益。02:28–02:50仍保留CRAP分數、mutation testing與unit tests，不是所有harness或品質關卡均無必要的結論，也不是通用基準數據。原貼文：https://x.com/unclebobmartin/status/2098744156709441896。'
slides[19].content = slides[19].content.replace('Uncle Bob 原片措辭仍待核對；','Uncle Bob 引文已核對原片字幕；')
// Put controlled evidence between Uncle Bob's experience and the product discussion.
// Reuse the original Jev page in place of the now-duplicated AgentDropout page.
const jevSlide = slides[4]
slides[4] = {
  frontmatter: { title:'程式生成：單代理與多代理的品質與成本', class:'talk-page' },
  content:'<ResearchComparison kind="agents" />',
  note:'14:37–14:39（2分鐘）。AgentDropout，ACL 2025，Tables 1–2，Llama3-8B-Instruct、HumanEval。同一基準：Vanilla Pass@1 53.33%，prompt 91K + completion 25K = 116K；MAS round=T 49.17%，2.6M + 492K = 3,092K；AgentDropout 55.84%，1.1M + 359K = 1,459K。都是論文整批評測用量，非單題，K=千；加總依原表約數。這是相同模型的資源成本比較，不是等預算實驗，也不是美元費用；輸入與輸出可能不同價，快取亦影響帳單。單代理此處為Vanilla，並非最佳化的完整開發代理。結果支持「額外編排可能增加消耗卻降低品質」這種現象，與Uncle Bob個人感受相呼應，但不能證明他的個案因果，也不表示所有多代理都較差。精簡後品質高於Vanilla，代價仍較大，必須保留此列避免片面選數據。來源：https://aclanthology.org/2025.acl-long.1170.pdf。',
}
slides[5] = {
  frontmatter: { title:'多模型路由：品質與費用的兩種最佳化目標', class:'talk-page' },
  content:'<ResearchComparison kind="routing" />',
  note:'14:39–14:41（2分鐘）。LLMRouterBench，ACL Findings 2026，Figure 6、Section 3.4。品質優先：Avengers-Pro最高平均正確率比最佳單模型GPT-5相對提升4.0%，即1.04倍，不是增加4個百分點，也不代表每100題多答對4題。費用優先：在平均品質不低於GPT-5的設定中選擇最低費用，CostSave為31.7%，費用為基準0.683倍。這是不同設定的兩項指標，不能宣稱同時品質提升4%且省31.7%。圖條均由零起算；左右衡量不同指標，不能比較兩欄條長。多任務總體結果，不能宣稱是程式生成專屬結果或每題都省。其他路由器未必優於最佳單模型；模型互補與路由準確性才重要。費用下降不等於token減少。此研究支持模型選擇的概念，非Jev或IBM Bob使用該演算法或獲得相同成果的證明。來源：https://aclanthology.org/2026.findings-acl.1881.pdf。',
}
slides[6] = { ...jevSlide, note:jevSlide.note.replace('14:37–14:39（2 分鐘）','14:41–14:42（1 分鐘）') }
slides[20].content += '<div class="supplement-links"><a href="https://aclanthology.org/2026.findings-acl.1881.pdf" target="_blank" rel="noopener">LLMRouterBench · ACL Findings 2026 · Figure 6 ↗</a></div>'
for (const slide of slides) slide.note = slide.note.replace('第20頁', '第19頁')
// Review supplements: insert after original pages 5 and 6, preserving both originals.
slides.splice(6, 0, {
  frontmatter: { title:'補充研究：RouteLLM 的品質與模型呼叫取捨', class:'talk-page' },
  content:'<WesternResearch kind="routing" />',
  note:'補充候選頁，暫不增加原35分鐘演講配置，供使用者決定替代或補充。RouteLLM正式ICLR 2025論文，UC Berkeley、Anyscale、Canva。Table 1，Matrix Factorization，Arena+Judge訓練，CPT(50%)：GPT-4呼叫比例13.40%，達到MT-Bench 8.8分，GPT-4基準9.3分（約95%）。CPT(50%)是強弱模型之間performance gap recovery的50%，不是GPT-4表現的50%。其餘86.6%呼叫Mixtral 8x7B。不是品質提升，也不是節省86.6%的美元或tokens；圖上兩個指標来自同一設定。主要模型為gpt-4-1106-preview與Mixtral 8x7B，非2026最新模型，非程式生成專屬測試，不能當作Jev或IBM Bob的實測成效。原文PDF用with，正式proceedings目錄用from，此頁引用採正式目錄題名。來源：https://proceedings.iclr.cc/paper_files/paper/2025/file/5503a7c69d48a2f86fc00b3dc09de686-Paper-Conference.pdf。',
})
slides.splice(5, 0, {
  frontmatter: { title:'補充研究：Google 與 MIT 的單代理與多代理比較', class:'talk-page' },
  content:'<WesternResearch kind="agents" />',
  note:'補充候選頁，暫不增加原35分鐘演講配置。Kim等人，Towards a Science of Scaling Agent Systems，arXiv:2512.08296v3，2026-04-08，Google Research、Google DeepMind與MIT，預印本，不宣稱已同儕審查。引用第13–14頁正文報告的SWE-bench Verified跨模型平均值：單代理52.2%、Hybrid51.1%、Centralized50.6%、Decentralized49.4%、Independent44.4%。研究整體260配置六基準；程式修復只使用20題子集與8模型，單格信賴區間寬，不能宣稱每個模型上均顯著勝出。圖表為論文正文報告的點估計，不與Table 5跨任務tokens或成本相配，也不創造同設定費用差異。Finance-Agent可拆分任务多代理則有改善，不能據此得出多代理普遍較差或harness無用。來源：https://arxiv.org/pdf/2512.08296v3。',
})
for (const slide of slides) slide.note = slide.note.replaceAll('第19頁', '第21頁')
slides[7].note += '\n費用示意新增：每百萬次請求，兩模型均假設每次95輸入+264輸出tokens（採附錄D訓練集平均長度，不是MT-Bench實測長度）。GPT-4每百萬輸入$10、輸出$30；Mixtral輸入輸出均$0.24。固定GPT-4 = 95×10+264×30 = $8,870。路由 = 0.134×8870 + 0.866×359×0.24 + 3.32 = $1,266.51456，約$1,267，節省85.7214%，顯示85.7%。$3.32為Table 7 Matrix Factorization路由器每百萬次請求開銷，已含其embedding估算。此為把Table 1路由比例與附錄D價格假設結合的講者推算，不是論文直接量得的整批MT-Bench帳單；不包含訓練、重試、快取差異或其他營運成本，不是2026即時報價，也不是token節省。保留分數9.3/8.8以揭露品質取捨。Table 6的3.66倍與隨機路由比率一致，未拿來作為全部GPT-4的費用基準。研究資助揭露含IBM等多家機構，不稱為與IBM無關的獨立驗證。'
// Promote the western studies; retain the two original studies as hidden appendices.
const hiddenStudies = slides.filter(slide => slide.content.includes('<ResearchComparison '))
for (const slide of hiddenStudies) {
  slides.splice(slides.indexOf(slide), 1)
  Object.assign(slide.frontmatter, { hide:true, hideInToc:true })
  slide.frontmatter.title = '隱藏補充｜' + slide.frontmatter.title
  slide.note = '隱藏補充資料；不列入正式播放。\n' + slide.note
}
slides.splice(6, 0, {
  frontmatter: { title:'RouterArena：不同難度下的品質與費用取捨', class:'talk-page' },
  content:'<RouterArenaResearch />',
  note:'14:40-14:41. RouterArena Table 6: GPT-5 vs Azure Router, easy 95.1/$5.68 vs 93.3/$0.30; medium 68.6/$14.80 vs 59.5/$0.63; hard 27.5/$35.73 vs 17.9/$1.05. Accuracy in percent; USD per 1000 queries. Difficulty: number of correct models among 42; easy >=20, medium 5-19, hard <=4. General query benchmark, not a multi-turn coding agent evaluation. Different model pools; GPT-5 is a service baseline with potential internal routing. No causal claim that harder tasks benefit more from multiple models. Not a Jev or IBM Bob product evaluation. Source: https://arxiv.org/pdf/2510.00202, Table 6 and section 6.3.',
})
slides.splice(7, 0, {
  frontmatter: { title:'IBM Bob On-prem：部署架構', class:'talk-page bob-onprem-page' },
  content:'<BobOnPremArchitecture />',
  note:'使用者提供之 GA 草稿重繪，現以網頁原生 SVG 呈現，替換先前 AI 點陣圖。官方品牌素材及 IBM Db2 Carbon 圖示來源見 assets/architecture-logos/README.md。依使用者要求，頁面移除 GA DRAFT 與 IBM CONFIDENTIAL 等標示。簡報視圖省略部分輔助連線；精確語意以本機 ArchiMate 模型為準，非獨立驗證的 GA 規格。',
})
slides.push(...hiddenStudies)
for (const slide of slides) {
  slide.note = slide.note.replaceAll('第21頁', '第20頁')
  if (slide.content.includes('<WesternResearch')) {
    slide.frontmatter.title = slide.frontmatter.title.replace('補充研究：', '研究：')
    slide.note = slide.note.replace(/補充候選頁，[^。]*。/, slide.content.includes('kind="agents"') ? '14:37–14:38:30，正式主線研究。' : '14:38:30–14:40，正式主線研究。')
  }
}
const client = new Client({name:'summit-author',version:'1.0.0'})
// MCP numbers only visible slides. Temporarily reveal appendices for stable updates,
// then apply hide flags after all numbered operations have finished.
const deckPath = fileURLToPath(new URL('../slides.md', import.meta.url))
await writeFile(deckPath, (await readFile(deckPath, 'utf8')).replace(/^hide: true$/gm, 'hide: false'))
const transport = new StdioClientTransport({ command:process.execPath,args:[fileURLToPath(new URL('../node_modules/@slidev/cli/bin/slidev.mjs',import.meta.url)),'mcp',fileURLToPath(new URL('../slides.md',import.meta.url))],cwd:root,stderr:'pipe'})
async function call(name,args) { const r=await client.callTool({name,arguments:args}); if(r.isError) throw new Error(JSON.stringify(r)); return r }
try {
  await client.connect(transport,{timeout:120000})
  const existing=await call('slidev-list-slides',{})
  const parsed=JSON.parse(existing.content.find(x=>x.type==='text').text)
  const count=Array.isArray(parsed)?parsed.length:parsed.slides.length
  for(let i=0;i<slides.length;i++) {
    const slide=slides[i]
    if(i===0) Object.assign(slide.frontmatter,{title:'以代理式 AI 重塑軟體開發生命週期',author:'Nicholas Chien / 錢亞宏',info:'Build AI｜打造企業 AI 創新基礎。2026.10.23 14:30–15:05。內容初稿，來源與限制見備註。',duration:'35min'})
    await call(i<count?'slidev-update-slide':'slidev-insert-slide',{...(i<count?{no:i+1}:{after:i}),...slide,frontmatter:{...slide.frontmatter,hide:false,hideInToc:!!slide.frontmatter.hideInToc}})
    console.log(`Authored ${i+1}/${slides.length}: ${slide.frontmatter.title}`)
  }
  for(let n=count;n>slides.length;n--) await call('slidev-remove-slide',{no:n})
} finally { await client.close() }
let authoredDeck = await readFile(deckPath, 'utf8')
authoredDeck = authoredDeck.replace(/(^title: 隱藏補充[^\n]*\n)([\s\S]*?)(?=^---$)/gm, block => block.replace(/^hide: false$/m, 'hide: true'))
await writeFile(deckPath, authoredDeck)
