---
theme: default
title: 以代理式 AI 重塑軟體開發生命週期
titleTemplate: '%s'
info: Build AI｜打造企業 AI 創新基礎。2026.10.23 14:30–15:05。內容初稿，來源與限制見備註。
author: Nicholas Chien / 錢亞宏
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1280
fonts:
  sans: IBM Plex Sans, Noto Sans TC
  provider: none
htmlAttrs:
  lang: zh-Hant
routerMode: hash
presenter: true
duration: 35min
timer: countdown
record: false
download: false
selectable: true
contextMenu: true
wakeLock: true
mcp: true
drawings:
  enabled: true
  persist: false
defaults:
  layout: summit
  transition: fade
layout: summit
class: cover-page formal-cover
---

<div class="cover-kicker">AI SUMMIT <span>2026</span></div>
<div class="cover-copy"><p class="eyebrow">Build AI｜打造企業 AI 創新基礎</p><h1>以代理式 AI<br>重塑軟體開發<br><span class="blue-text">生命週期</span></h1><p class="cover-subtitle">Nicholas Chien / 錢亞宏</p><p class="draft-label">2026.10.23 · 14:30–15:05</p></div><SummitKeyVisual class="cover-art" /><div class="cover-index">BUILD AI <span>／ FROM INTENT TO DELIVERY</span></div>

<!--
14:30–14:31（1 分鐘）。開場：當寫程式的速度大幅改變，團隊的需求、驗收與交付方式也必須跟著改變。這場演講從近期事件走到企業開發流程，最後用 IBM Bob 示範。
-->

---
title: AI 演進：從智慧問題到代理式交付
class: talk-page chart-page
---

<p class="eyebrow">01 · ACCELERATION</p>
<h1>從「能思考嗎？」到「能交付嗎？」</h1><EvolutionChart /><div class="source-line"><a href="https://academic.oup.com/mind/article/LIX/236/433/986238" target="_blank" rel="noopener">Turing（1950） ↗</a> · <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener">Transformer（2017） ↗</a> · <a href="https://www.anthropic.com/engineering/multi-agent-research-system" target="_blank" rel="noopener">Anthropic 多代理研究系統（2025） ↗</a></div>

<!--
14:32–14:34（2 分鐘）。動畫折線是概念敘事，不能讀成 AI 能力的實測成長曲線。依序說明 1950 圖靈的問題、2017 Transformer、2025 Anthropic 多代理研究系統、2026 年 Bob 與 Jev。近年事件變密集是本演講的觀察，所選里程碑並非完整歷史或普遍迭代速率的統計證明。Bob 與 Jev 的日期來源見後續各頁。
-->

---
title: 近期事件：工作流也在快速改變
class: talk-page
---

<p class="eyebrow">02 · TWO SIGNALS</p>
<h1>模型在進步，<br>工作流也需要重新設計。</h1><div class="talk-columns"><section><span class="metric-label">SIGNAL 01</span><h2>重新評估編排</h2><p>Uncle Bob：<br>從協作框架到<br>重新思考 harness。</p></section><section><span class="metric-label">SIGNAL 02</span><h2>決策專門化</h2><p>Jev：<br>將路由與分類等決策<br>交給專用模型。</p></section></div><div class="source-line"><a href="https://www.cleancoder.com/" target="_blank" rel="noopener">Uncle Bob 本人網站 ↗</a> · <a href="https://github.com/unclebob/swarm-forge" target="_blank" rel="noopener">SwarmForge 專案 ↗</a> · <a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener">TypeSafe：Jev 發布（2026.09.15） ↗</a></div>

<!--
14:34–14:35（1 分鐘）。這兩件事的共同啟示，是不要把昨天模型的限制永久寫進今天的工作流。這是講者歸納，並非兩者合作或 IBM 使用 Jev 的證據。
-->

---
title: Uncle Bob：重新思考 harness
class: talk-page
---

<p class="eyebrow">2026 · UNCLE BOB</p>
<h1>需要重新評估的，<br>是約束的成本與效益。</h1><div class="event-pair"><section><span>08.19 · Matt Pocock 訪談</span><h2>多代理與品質關卡</h2><p>SwarmForge 可確認包含<br>隔離工作區、交接與核准流程。</p></section><section><span>09.12 · 本人發布短片</span><h2>Rethinking Harnesses</h2><p>重新思考編排框架，<br>以及模型進步後的工作方式。</p></section></div><p class="takeaway">保留必要的驗證，持續量測編排本身的負擔。</p><div class="source-line"><a href="https://www.youtube.com/watch?v=zcLPGC-tvgk" target="_blank" rel="noopener">Matt Pocock × Uncle Bob（08.19） ↗</a> · <a href="https://x.com/unclebobmartin/status/2098744156709441896" target="_blank" rel="noopener">Rethinking Harnesses 原貼文（09.12） ↗</a></div>

<!--
14:35–14:37（2 分鐘）。8/19 Matt Pocock 訪談影片線索：https://www.youtube.com/watch?v=zcLPGC-tvgk。原始影片尚未取得逐字內容；9/12 影片由本人網站連出：https://x.com/unclebobmartin/status/2098744156709441896。尚未直接核對影片口述，不將「safe gate 不再必要」作為確定引言，也不給 token 降幅數字。本人專案名稱是 SwarmForge；safe gate 暫視為使用者對品質關卡的描述。登台前需核對原片、時間戳與語境。
補充查證：已在 YouTube 原片頁直接確認串流日期為2026年8月19日；原片章節 10:20 為 Deterministic tools vs steering、18:02 為 Multi-agent systems。X 原貼文日期與作者也已直接確認。YouTube 轉錄稿面板持續載入，尚未核對完整措辭。
-->

---
title: Jev：把決策與生成分工
class: talk-page
---

<p class="eyebrow">2026.09.15 · JEV</p>
<h1>不是每個決策，<br>都需要生成一大段文字。</h1><div class="talk-columns"><section><span class="metric-label">INPUT</span><h2>工作狀態</h2><p>任務、候選選項<br>與明確的輸出型別。</p></section><section><span class="metric-label">DECISION</span><h2>型別化決策</h2><p>分類、排序、路由<br>或風險判斷。</p></section><section><span class="metric-label">ACTION</span><h2>合適的執行者</h2><p>交給工具、代理<br>或生成模型處理。</p></section></div><p class="takeaway">Jev 是早期存取的決策模型；不能據此宣稱模型權重已開源。</p><div class="source-line"><a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener">TypeSafe：Jev 發布（2026.09.15） ↗</a></div>

<!--
14:37–14:39（2 分鐘）。官方描述為 System One 模型，輸出型別化機率值，與自由文字生成分工。這張圖是應用示意，不是 IBM Bob 的內部實作。供應商宣稱的延遲與成本改善屬特定工作流；本演講不把它當成通用程式開發基準。SDK 開放與模型權重開源是兩件事。
-->

---
title: 技術債的成本結構改變了
class: talk-page
---

<p class="eyebrow">03 · THE ECONOMICS</p>
<h1>重寫變便宜，<br>理解與驗證仍然有成本。</h1><div class="event-pair"><section><span>HUMAN-CENTRIC</span><h2>人天與協作時間</h2><p>理解既有程式、修改設計、<br>跨團隊溝通與維護。</p></section><section><span>AGENT-ASSISTED</span><h2>Token ＋ 驗證成本</h2><p>上下文、重試與工具呼叫，<br>加上人的審查與營運風險。</p></section></div><p class="takeaway">架構的價值轉向：縮小上下文、清楚介面、可驗證的邊界。</p>

<!--
14:39–14:41（2 分鐘）。這是本演講的分析框架，不是文獻證明技術債已完全由人天轉成 token。Patterns 與 architecture 不只為人天服務，也處理可靠性、安全、可變更性。總成本可拆成人工時間、模型與工具費用、等待時間、失敗風險。
-->

---
title: 同一基準：代理多，不代表 token 少
class: talk-page
---

<p class="eyebrow">EVIDENCE 01 · SAME BENCHMARK</p>
<h1>多代理的效益，需要一起看成本。</h1><p class="table-context">HumanEval · Llama3-8B-Instruct · 論文表 1、2</p><table class="research-table"><thead><tr><th>方法</th><th>輸入 tokens</th><th>輸出 tokens</th><th>Pass@1</th></tr></thead><tbody><tr><td>單代理 Vanilla</td><td>91K</td><td>25K</td><td>53.33%</td></tr><tr><td>多代理 · 多輪</td><td>2.6M</td><td>492K</td><td>49.17%</td></tr><tr class="emphasis"><td>AgentDropout</td><td>1.1M</td><td>359K</td><td>55.84%</td></tr></tbody></table><p class="takeaway">刪減無效協作有幫助；仍不能推論「多代理普遍比較省」。</p><div class="source-line"><a href="https://aclanthology.org/2025.acl-long.1170.pdf" target="_blank" rel="noopener">AgentDropout · ACL 2025 · Tables 1–2 ↗</a></div>

<!--
14:41–14:42（1 分鐘）。資料為論文報告的同一 HumanEval 實驗設定與整批 token 數，K=千、M=百萬，不是每題平均。呈現 Llama3-8B 的一個反例，而非所有模型的通則。這個結果也不能外推為 IBM Bob 的測量結果。多代理多輪對應 MAS round=T。來源精度本來就是 K/M，避免自行給出過度精確的倍數。
-->

---
title: 減少協作浪費，才是節省 token 的關鍵
class: talk-page
---

<p class="eyebrow">EVIDENCE 02 · COMMUNICATION PRUNING</p>
<h1>把訊息傳遞，留給有價值的協作。</h1><p class="table-context">HumanEval · 5 個 GPT-4 agents · AutoGen ± AgentPrune</p><div class="token-bars"><div><span>原始輸入</span><i style="width:100%"></i><b>492,273</b></div><div><span>剪枝後輸入</span><i class="teal-bar" style="width:64.01%"></i><b>315,105</b></div></div><div class="result-strip"><strong>−36.0%<small>輸入 tokens</small></strong><strong>−26.9%<small>輸入＋輸出 tokens</small></strong><strong>85.41 → 86.65<small>論文性能指標</small></strong></div><div class="source-line"><a href="https://arxiv.org/html/2410.02506v1" target="_blank" rel="noopener">AgentPrune · arXiv v1 · Table 3 ↗</a></div>

<!--
14:42–14:43（1 分鐘）。使用 arXiv v1 Table 3 HumanEval AutoGen 行，避免混用不同版本。輸出 130,196→139,714，反而增加。因此總量 622,469→454,819；(1-454819/622469)*100=26.933%。輸入節省約 35.99%。兩組都是多代理，不能稱作相對單代理的節省。圖柱只有輸入 token，結果列明確分開。
-->

---
title: 模型路由：降低費用與減少 token 不同
class: talk-page
---

<p class="eyebrow">EVIDENCE 03 · MODEL ROUTING</p>
<h1>讓適合的模型，<br>承接適合的問題。</h1><div class="route-metric"><strong>&gt;85%</strong><div><h2>MT-Bench 成本降低</h2><p>RouteLLM 專案報告：<br>保留 95% GPT-4 表現的設定。</p></div></div><p class="takeaway">這是費用指標；不是 token 節省率，也不是 Bob 的產品數據。</p><div class="source-line"><a href="https://sky.cs.berkeley.edu/project/routellm/" target="_blank" rel="noopener">RouteLLM · UC Berkeley（2024） ↗</a></div>

<!--
14:43–14:45（2 分鐘）。RouteLLM 在強弱模型間選擇，Berkeley 專案頁報告 MT-Bench 超過85%成本降低、95%GPT-4表現。不同任務的結果不同；不是95%正確率。企業落地要固定任務集、品質門檻、重試策略，記錄輸入/輸出/快取 token、費用、耗時與成功率。模型更便宜就可能省錢，不需要先減少 token 數。
-->

---
title: IBM Bob V2：三層產品架構
class: talk-page
---

<p class="eyebrow">04 · IBM BOB</p>
<h1>一套代理核心，<br>連接不同的開發介面。</h1><div class="architecture-stack"><div><b>CLIENTS</b><strong>IDE ／ Shell</strong><span>開發者的工作介面</span></div><div><b>HARNESS</b><strong>共用基礎設施</strong><span>身分驗證、記錄、遙測、功能旗標</span></div><div><b>AGENT</b><strong>推理與程式生成</strong><span>代理循環、工具使用與任務處理</span></div></div><div class="source-line"><a href="https://bob.ibm.com/blog/bob-v2-release-announcement/" target="_blank" rel="noopener">IBM Bob V2 官方架構說明 ↗</a></div>

<!--
14:45–14:47（2 分鐘）。這是 IBM Bob V2 官方文章的三層架構重繪，不是網路部署拓樸。先從使用者介面往下解釋：不同 client 共用 harness 與 agent。不要將「主代理＋子代理」的任務結構混稱為這三個產品層。
-->

---
title: IBM Bob：任務分工與模型選擇
class: talk-page
---

<p class="eyebrow">TASK EXECUTION · CONCEPTUAL VIEW</p>
<h1>控制上下文，<br>也控制不必要的工作。</h1><div class="talk-columns"><section><span class="metric-label">01 · DELEGATE</span><h2>子代理</h2><p>獨立上下文處理子任務，<br>將摘要回傳主代理。</p></section><section><span class="metric-label">02 · EXECUTE</span><h2>工具並行</h2><p>可在一回合提出<br>多個原生工具呼叫。</p></section><section><span class="metric-label">03 · SELECT</span><h2>模型選擇</h2><p>依任務匹配模型，<br>平衡品質與成本。</p></section></div><p class="takeaway">與近期趨勢相呼應；未宣稱 Bob 採用 Jev 或特定研究演算法。</p><div class="source-line"><a href="https://bob.ibm.com/blog/bob-v2-release-announcement/" target="_blank" rel="noopener">IBM Bob V2 官方架構說明 ↗</a> · <a href="https://newsroom.ibm.com/2026-07-09-ibm-advances-enterprise-ai-software-development-with-multi-agent-capabilities-and-specialized-modernization-workflows" target="_blank" rel="noopener">IBM 官方公告（2026.07.09） ↗</a></div>

<!--
14:47–14:49（2 分鐘）。前兩項依 Bob V2 官方部落格；模型匹配依 7/9 IBM 公告。這是能力概念圖，官方並未在這些來源公開完整 routing policy，也未提供本場任務的 token 節省率。不要把 context 隔離說成零成本或保證更快。
-->

---
title: Bobalytics：看見採用與消耗
class: talk-page
---

<p class="eyebrow">ENTERPRISE VISIBILITY</p>
<h1>讓使用量與交付成果，<br>進入同一場管理對話。</h1><div class="talk-columns"><section><span class="metric-label">ADOPTION</span><h2>採用情況</h2><p>哪些團隊正在使用？<br>使用是否持續？</p></section><section><span class="metric-label">USAGE</span><h2>Bobcoin 消耗</h2><p>觀察消耗與模式，<br>對照團隊與期間。</p></section><section><span class="metric-label">OUTCOMES</span><h2>交付證據</h2><p>搭配缺陷、驗收結果<br>與交付時間評估。</p></section></div><p class="takeaway">Bobalytics 為 Enterprise 功能；Bobcoin 不等於原始 token 數。</p><div class="source-line"><a href="https://bob.ibm.com/docs/ide/features/bobalytics" target="_blank" rel="noopener">Bobalytics 官方文件 ↗</a></div>

<!--
14:49–14:51（2 分鐘）。官方文件的採用率為平均日活躍使用者/授權席位。Bob factor 是已提交程式中 Bob 產生行數的占比，不能直接當成生產力或品質。本頁交付證據是管理建議，並非聲稱 Bobalytics 原生提供全部缺陷或 lead time 指標。不要承諾未確認的逐 token 檢視或預算硬限制。
-->

---
title: SDLC 的新重心：理解、並行與記憶
class: talk-page
---

<p class="eyebrow">05 · PRACTITIONER PERSPECTIVES</p>
<h1>流程變快之後，<br>人的理解要能跟上。</h1><div class="talk-columns"><section><span class="metric-label">AYMAN NADEEM</span><h2>短循環</h2><p>理解、執行、檢視、調整；<br>計畫不必變成厚重文件。</p></section><section><span class="metric-label">HENRIK KNIBERG</span><h2>獨立並行</h2><p>隔離工作區讓代理並行；<br>人仍需回饋與驗收。</p></section><section><span class="metric-label">GARRY TAN</span><h2>組織記憶</h2><p>將修正後的經驗<br>沉澱為可維護的技能。</p></section></div><p class="takeaway">實務觀點的共同啟示：縮短回饋，保留決策與學習。</p><div class="source-line"><a href="https://www.aymannadeem.com/artificial/intelligence,/developer/tools/2026/09/24/plan-mode-is-dead.html" target="_blank" rel="noopener">Ayman Nadeem：Plan Mode Is Dead（09.24） ↗</a> · <a href="https://www.linkedin.com/posts/hkniberg_its-interesting-how-agentic-engineering-activity-7498285675310678016-NQvh" target="_blank" rel="noopener">Henrik Kniberg：代理並行的實務觀察 ↗</a> · <a href="https://ai.engineer/talks/eBUyTS7SzV4-every-company-should-have-brain" target="_blank" rel="noopener">Garry Tan：Every company should have a Brain ↗</a></div>

<!--
14:51–14:52（1 分鐘）。三項皆為實務觀點，不是受控實驗。Ayman 批評的是僵硬的 plan/build 分隔，並沒有否定思考與理解。Henrik 描述以 git worktrees 隔離並行任務的個人經驗，不能推論多工必定有效。Garry 參考使用者提供的 AI Engineer 演講頁，8:43 區分模型判斷與程式狀態、15:13 將修正變成可維護程序；不採用個人宣稱的生產力倍數。這三者可融入 SDLC，而非取代全部生命週期。
-->

---
title: 三種代表性的 AI 開發實務
class: talk-page
---

<p class="eyebrow">THREE PRACTICAL APPROACHES</p>
<h1>依任務與風險，<br>選擇流程的重量。</h1><div class="method-rows"><div><b>短迭代代理循環</b><span>探索 → 計畫 → 實作 → 驗證</span><small>適合範圍明確的維護</small></div><div><b>Spec-driven</b><span>規格 → 計畫 → 任務 → 收斂</span><small>適合驗收條件清楚的功能</small></div><div><b>AI-DLC</b><span>Inception → Construction → Operations</span><small>適合跨角色的完整交付</small></div></div><div class="source-line"><a href="https://code.claude.com/docs/en/best-practices" target="_blank" rel="noopener">Anthropic：開發最佳實務 ↗</a> · <a href="https://github.com/github/spec-kit" target="_blank" rel="noopener">GitHub Spec Kit ↗</a> · <a href="https://www.ibm.com/think/topics/ai-dlc" target="_blank" rel="noopener">IBM：AI-DLC ↗</a></div>

<!--
14:52–14:54（2 分鐘）。這三者是代表性文件化實務，不是市場占有率排名或唯一標準。Anthropic 短迭代工作流程是工程實踐，不是完整正式生命週期標準；Spec Kit 聚焦規格到實作；AI-DLC 是更廣的交付方法。AWS workflow 工具版本另有初始化與構想階段，這裡採 IBM 介紹的核心三階段概念，避免混稱完整工具步驟。
-->

---
title: 今天示範：以驗收規格驅動一個小功能
class: talk-page
---

<p class="eyebrow">DEMO DESIGN · SPEC-DRIVEN LOOP</p>
<h1>把「做一個功能」，<br>變成「證明一個行為」。</h1><div class="delivery-flow"><div><span class="step-number">01</span><h2>規格</h2><p>座位上限<br>與重複報名</p></div><span class="flow-arrow">→</span><div><span class="step-number">02</span><h2>計畫</h2><p>資料結構<br>與驗收案例</p></div><span class="flow-arrow">→</span><div><span class="step-number">03</span><h2>實作</h2><p>小範圍修改<br>執行測試</p></div><span class="flow-arrow">→</span><div><span class="step-number">04</span><h2>驗收</h2><p>行為證據<br>與剩餘限制</p></div></div><p class="takeaway">展示的是可追溯的交付流程，不是程式碼生成速度競賽。</p>

<!--
14:54–14:56（2 分鐘）。本次示範採 spec-driven 的核心原則，並非聲稱已把 Spec Kit 安裝到 Bob。使用 repo 的 demo/ 目錄，功能為研討會報名座位規則，無外部服務與個資。完整腳本在 docs/demo-runbook.md。
-->

---
title: Live demo：用 IBM Bob 完成一個交付循環
class: talk-page
---

<p class="eyebrow">06 · LIVE DEMO · 7 MINUTES</p>
<h1>讓 Bob 實作。<br>讓證據說明完成。</h1><div class="demo-cue"><strong>研討會報名規則</strong><p>容量 3 人；重複報名不占座位；<br>額滿拒絕新報名；取消後釋出座位。</p></div><div class="demo-timing"><span>01′ 理解規格</span><span>01′ 確認計畫</span><span>03′ 實作與測試</span><span>02′ 驗收與回顧</span></div><p class="takeaway">切換至 IBM Bob，開啟本專案的 demo 資料夾。</p>

<!--
14:56–15:03（7 分鐘，此頁與接下來兩頁共用時段）。demo/README.md 為規格；registration.mjs 為待完成起點；registration.test.mjs 為驗收案例。執行 node --test demo/registration.test.mjs。先讓 Bob 探索，不要直接把完成版交給模型；計畫確認後再實作。尚未在 IBM Bob 中實際排演，不能把 repo 測試通過當作 Bob 已完成的證據。
-->

---
title: 示範驗收：四種行為，四份證據
class: talk-page
---

<p class="eyebrow">DEMO · ACCEPTANCE</p>
<h1>看見綠燈之前，<br>先確認測到了什麼。</h1><div class="acceptance-grid"><div><b>正常報名</b><p>成功加入；占用一席</p></div><div><b>重複報名</b><p>保持原狀；不重複占位</p></div><div><b>額滿拒絕</b><p>回傳 full；名單不變</p></div><div><b>取消再報名</b><p>席次回復；可接受新人</p></div></div><p class="takeaway">補看輸入邊界與狀態變更；測試通過後，仍要對照需求。</p>

<!--
示範第5–6分鐘的驗收提示頁。可留在 Bob 看測試，也可跳至此頁整理。題目刻意限定本機純函式，不處理跨程序併發、付款、認證或正式資料庫；這些需另訂需求。
-->

---
title: 示範備援：保留交付軌跡
class: talk-page
---

<p class="eyebrow">DEMO · FALLBACK</p>
<h1>如果現場連線中斷，<br>沿著同一份證據走完。</h1><div class="method-rows"><div><b>規格</b><span>demo/README.md</span><small>行為與範圍</small></div><div><b>驗收</b><span>registration.test.mjs</span><small>可執行案例</small></div><div><b>參考實作</b><span>demo/reference/</span><small>預先準備，非現場生成</small></div></div><p class="takeaway">記錄觀察到的耗時與消耗；未量測的欄位留白。</p>

<!--
示範備援頁，正常情況可直接跳至第19頁。參考實作是為簡報預先準備且以 Node 驗證的版本，不冒充 Bob 實際輸出。若無網路，用 node --test demo/reference/registration.test.mjs 檢查備援結果並解釋設計取捨。
-->

---
title: 把代理能力，轉成團隊的交付能力
class: closing-page
---

<p class="eyebrow">BUILD AI · TAKE IT BACK TO YOUR TEAM</p><div class="closing-copy"><h1>清楚的意圖。<br>適量的協作。<br><span style="color:#a6c8ff">可驗證的交付。</span></h1><p>Nicholas Chien / 錢亞宏</p><span class="closing-date">2026.10.23 · AI SUMMIT</span></div><SummitArt class="closing-art" />

<!--
15:03–15:05（2 分鐘）。結語：選一項真實任務，用相同驗收條件比較既有方式與 Bob。一起量測成功率、人的審查時間、消耗與耗時，再決定增加或減少代理。保留最後一分鐘接一個問題。
-->

---
title: 參考資料：事件與產品
class: talk-page reference-page
---

<p class="eyebrow">APPENDIX A · SOURCES</p>
<h1>事件與產品資料</h1><div class="reference-list"><a href="https://academic.oup.com/mind/article/LIX/236/433/986238" target="_blank" rel="noopener">Turing（1950） ↗</a><a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener">Transformer（2017） ↗</a><a href="https://www.anthropic.com/engineering/multi-agent-research-system" target="_blank" rel="noopener">Anthropic 多代理研究系統（2025） ↗</a><a href="https://www.cleancoder.com/" target="_blank" rel="noopener">Uncle Bob 本人網站 ↗</a><a href="https://github.com/unclebob/swarm-forge" target="_blank" rel="noopener">SwarmForge 專案 ↗</a><a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener">TypeSafe：Jev 發布（2026.09.15） ↗</a><a href="https://bob.ibm.com/blog/bob-v2-release-announcement/" target="_blank" rel="noopener">IBM Bob V2 官方架構說明 ↗</a><a href="https://newsroom.ibm.com/2026-07-09-ibm-advances-enterprise-ai-software-development-with-multi-agent-capabilities-and-specialized-modernization-workflows" target="_blank" rel="noopener">IBM 官方公告（2026.07.09） ↗</a><a href="https://bob.ibm.com/docs/ide/features/bobalytics" target="_blank" rel="noopener">Bobalytics 官方文件 ↗</a></div><p class="reference-note">資料檢視日：2026.09.28。Uncle Bob 原片措辭仍待核對；Jev 不標為開源權重。</p>

<!--
附錄，不计入35分鐘。每一項為可點選的一手來源。公開頁面包含講者備註，所以這裡不放內部資料。
-->

---
title: 參考資料：實驗與開發方法
class: talk-page
---

<p class="eyebrow">APPENDIX B · SOURCES</p>
<h1>實驗與開發方法</h1><div class="reference-list"><a href="https://aclanthology.org/2025.acl-long.1170.pdf" target="_blank" rel="noopener">AgentDropout · ACL 2025 · Tables 1–2 ↗</a><a href="https://arxiv.org/html/2410.02506v1" target="_blank" rel="noopener">AgentPrune · arXiv v1 · Table 3 ↗</a><a href="https://sky.cs.berkeley.edu/project/routellm/" target="_blank" rel="noopener">RouteLLM · UC Berkeley（2024） ↗</a><a href="https://code.claude.com/docs/en/best-practices" target="_blank" rel="noopener">Anthropic：開發最佳實務 ↗</a><a href="https://github.com/github/spec-kit" target="_blank" rel="noopener">GitHub Spec Kit ↗</a><a href="https://www.ibm.com/think/topics/ai-dlc" target="_blank" rel="noopener">IBM：AI-DLC ↗</a></div><p class="reference-note">論文結果保留各自模型、任務與分母；不可當作 IBM Bob 的實測成效。<br>完整限制、計算與示範腳本收錄於 GitHub 專案 docs/。</p><div class="supplement-links"><a href="https://www.aymannadeem.com/artificial/intelligence,/developer/tools/2026/09/24/plan-mode-is-dead.html" target="_blank" rel="noopener">Ayman Nadeem：Plan Mode Is Dead（09.24） ↗</a><a href="https://www.linkedin.com/posts/hkniberg_its-interesting-how-agentic-engineering-activity-7498285675310678016-NQvh" target="_blank" rel="noopener">Henrik Kniberg：代理並行的實務觀察 ↗</a><a href="https://ai.engineer/talks/eBUyTS7SzV4-every-company-should-have-brain" target="_blank" rel="noopener">Garry Tan：Every company should have a Brain ↗</a></div>

<!--
附錄，不计入35分鐘。所有研究數字採明確來源的特定實驗；不做跨論文模型、資料集或 token 計價的直接排名。
-->
