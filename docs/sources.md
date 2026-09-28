# 來源、主張與適用限制

檢視日：2026-09-28。簡報中的「本演講分析」不是文獻事實；研究數據不代表 IBM Bob 實測。

## 首頁主視覺

依使用者指示直接使用對話提供的主視覺。從本機活動範本 `IBM AI Summit 2026_Taiwan_PPT Template.pptx` 擷取與附件視覺一致的 `ppt/media/image3.jpeg`（1417×1141），原樣存為 `assets/summit-key-visual.jpeg`，不重繪、不變色、不裁切；僅以 CSS 等比例縮放。此圖僅用於本次高峰會簡報，不額外宣告開放授權。

## 歷史與事件

- [Turing, Computing Machinery and Intelligence (1950)](https://academic.oup.com/mind/article/LIX/236/433/986238)：圖靈測試的原始論文。
- [Attention Is All You Need (2017)](https://arxiv.org/abs/1706.03762)：Transformer 論文。動畫以選定事件敘事，非等距時間軸、智慧分數或統計成長率。
- [Anthropic 多代理研究系統 (2025)](https://www.anthropic.com/engineering/multi-agent-research-system)：代理協作里程碑範例，不把研究任務成效外推成程式開發成效。
- [Matt Pocock × Uncle Bob，使用者提供的訪談](https://www.youtube.com/watch?v=zcLPGC-tvgk)：瀏覽器原片頁已直接確認 2026-08-19 串流日期。章節 10:20 為確定性工具與引導，18:02 為多代理系統。轉錄稿面板持續載入，未取得可直接核對的完整逐字內容，不引用逐字句。
- [Uncle Bob 本人網站](https://www.cleancoder.com/)列出 2026-09-12 [Rethinking Harnesses 原貼文](https://x.com/unclebobmartin/status/2098744156709441896)。瀏覽器直接確認貼文作者、標題與日期；未核對影片口述。不可據此宣稱所有品質關卡不再必要。
- [SwarmForge 原始專案](https://github.com/unclebob/swarm-forge)：確認為多代理協調工具，具有隔離工作區與交接等功能。專案名稱並非 safe gate；本文將後者視為品質關卡的泛稱，未安裝或散布其程式。
- [TypeSafe，Jev 官方發布 (2026-09-15)](https://typesafe.ai/blog/introducing-system-one-models-and-jev)：決策專用模型與 early access。沒有在這份來源證實模型權重開源，供應商工作流評測不當作一般程式開發基準。
- 使用者提供的 [Jev 中文介紹](https://www.aiposthub.com/jev-model-typesafe-ai-beginner-guide/)僅用來定位主題；產品主張依上列一手來源。

## 同任務的實驗

[AgentDropout，ACL 2025](https://aclanthology.org/2025.acl-long.1170.pdf)，Tables 1–2，Llama3-8B-Instruct / HumanEval：

| 方法 | Prompt tokens | Completion tokens | Pass@1 |
|---|---:|---:|---:|
| Vanilla 單代理 | 91K | 25K | 53.33 |
| MAS round=T | 2.6M | 492K | 49.17 |
| AgentDropout | 1.1M | 359K | 55.84 |

這是同一論文設定的整批消耗，不是每題平均。使用論文原本 K/M 精度。不同模型的結論不同；本頁展示多代理並不保證成本更低或性能更高。

[AgentPrune，arXiv v1，Table 3](https://arxiv.org/html/2410.02506v1)，HumanEval / 5 個 GPT-4 agents：

| 方法 | Prompt | Completion | 合計（自行加總） | 論文性能 |
|---|---:|---:|---:|---:|
| AutoGen | 492273 | 130196 | 622469 | 85.41 |
| + AgentPrune | 315105 | 139714 | 454819 | 86.65 |

輸入下降 35.99%；總量下降 26.93%；輸出反而上升。圖呈現輸入，結果列分開標示總量。此比較為多代理對多代理，不是對單代理。

[RouteLLM，Berkeley 官方專案](https://sky.cs.berkeley.edu/project/routellm/)：MT-Bench 在保留 95% GPT-4 表現的設定，成本降低超過 85%。這是金額與性能比較，不是 token 減少率或 95% 正確率。未外推為 IBM Bob 的節省幅度。

## IBM Bob

- [Bob V2 官方架構](https://bob.ibm.com/blog/bob-v2-release-announcement/)：Clients、Harness、Agent 三層；子代理獨立上下文與摘要回傳；原生工具並行。圖為架構重繪，不是官方網路拓樸。
- [IBM 2026-07-09 公告](https://newsroom.ibm.com/2026-07-09-ibm-advances-enterprise-ai-software-development-with-multi-agent-capabilities-and-specialized-modernization-workflows)：模型任務匹配、多代理及成本可見性。未揭露完整 routing policy；未聲稱採用 Jev、RouteLLM 或 AgentPrune。
- [Bobalytics 文件](https://bob.ibm.com/docs/ide/features/bobalytics)：Enterprise 功能，報告採用與 Bobcoin 消耗。Bob factor 為已提交程式中 Bob 行數占比，不等於品質或生產力；Bobcoin 不當成原始 token。

## SDLC 與使用者補充觀點

- [Anthropic 開發最佳實務](https://code.claude.com/docs/en/best-practices)：探索、計畫、實作、驗證的短迭代。是實務指引，不是完整生命週期標準。
- [GitHub Spec Kit](https://github.com/github/spec-kit)：規格、計畫、任務、實作與收斂。示範採其核心思想，沒有宣稱在 Bob 安裝此工具。
- [IBM AI-DLC 介紹](https://www.ibm.com/think/topics/ai-dlc)：核心 Inception、Construction、Operations。不是市場主流排名；AWS 工作流程工具新版另有額外階段，不與核心概念混稱。
- [Ayman Nadeem，Plan Mode Is Dead (2026-09-24)](https://www.aymannadeem.com/artificial/intelligence,/developer/tools/2026/09/24/plan-mode-is-dead.html)：個人產品反思，主張理解與執行交錯，不是規劃或規格毫無价值。
- [Henrik Kniberg 原貼文](https://www.linkedin.com/posts/hkniberg_its-interesting-how-agentic-engineering-activity-7498285675310678016-NQvh)：隔離工作區讓代理並行的實務經驗，不是並行必然提升生產力的控制實驗。
- [Garry Tan 演講與整理](https://ai.engineer/talks/eBUyTS7SzV4-every-company-should-have-brain)，[原影片](https://www.youtube.com/watch?v=eBUyTS7SzV4)：8:43 判斷交給模型、狀態交給程式；15:13 把修正累積成程序。引用其實務觀點，不採用未提供測量方法的生產力倍數。

## 尚未取得正文的使用者連結

以下 Facebook 分享網址以網頁工具存取失敗，未引用其內容，也未推測貼文作者或論點：

- https://www.facebook.com/share/1HyAnPWtDa/?mibextid=wwXIfr
- https://www.facebook.com/share/19Nx261Yb9/?mibextid=wwXIfr
- https://www.facebook.com/share/1KDwJZc5uA/?mibextid=wwXIfr

## 演講前仍需完成

核對 Uncle Bob 原片措辭與時間戳；在 IBM Bob 本人環境排演 demo，填入真實版本、耗時與可取得的消耗指標。不能把預備參考實作當成 Bob 的實際成果。
# AI 演進圖目前版本（2026-09-28）

## 最新：延伸至 2026 年 8 月，共 18 節點

移除 AlexNet、Transformer，保留 2026.03 長時任務代理，新增以下四項。月份指可核對的案例／報告公開時間，不是技術誕生或已證實的全產業爆發點。

| 圖上月份 | 標籤 | 證據與限制 |
|---|---|---|
| 2026.04 | 代理託管服務 | 4/8 Anthropic 的託管長時代理架構案例：https://www.anthropic.com/engineering/managed-agents |
| 2026.05 | 搜尋代理化 | 5/19 Google I/O Search 公告：https://blog.google/products-and-platforms/products/search/search-io-2026/ 。各功能推出時程不同，不表示全部當天全面可用。 |
| 2026.06 | 代理走入辦公 | 6/25 原始使用研究：https://arxiv.org/abs/2606.26959 。Codex 使用與非開發職務的案例；單一供應商樣本，不外推成全市場採用率。 |
| 2026.08 | 代理成為使用者 | 8/14 Hugging Face 平台觀測報告第 6 節：https://huggingface.co/blog/state-of-open-models-summer-2026 。代理搜尋、上傳與操作 Hub 的流量紀錄主要截至 7 月，8 月是報告月份。 |

## 前版紀錄

## 最新：從產品版本改為應用趨勢

保留 16 個節點；移除 o1 與五個 2026 模型版本，換為下列六個代表性應用方向。日期是論文／實務案例的時間錨點，不代表可量測的全產業「爆發日」。

| 圖上時間 | 趨勢 | 依據與時間限制 |
|---|---|---|
| 2023 | RAG | 2023 年 12 月 LLM RAG 研究綜述 https://arxiv.org/abs/2312.10997 。RAG 原論文在 2020 年 https://arxiv.org/abs/2005.11401 ，2023 並非發明年。 |
| 2024 | Agentic AI | 2024-12-19 實務模式整理 https://www.anthropic.com/engineering/building-effective-agents ，代理概念遠早於此。 |
| 2025.02 | Vibe coding | 用語提出月份 https://www.ibm.com/think/topics/vibe-coding |
| 2026.02 | Agentic CI | 2026-02-05 持續執行代理工作流的工程案例 https://github.blog/ai-and-ml/generative-ai/continuous-ai-in-practice-what-developers-can-automate-today-with-agentic-ci/ |
| 2026.02 | 多代理並行開發 | 2026-02-05 並行代理建置編譯器實驗 https://www.anthropic.com/engineering/building-c-compiler 。多代理技術並非該年首創。 |
| 2026.03 | 長時任務代理 | 2026-03-24 長時間應用開發與 harness 工程 https://www.anthropic.com/engineering/harness-design-long-running-apps 。2025 年已存在相關先行實務。 |

這些案例可支持應用方向正在演進，不能單獨證明全市場採用率或突破速度；簡報講者備註保留此區分，圖上按使用者要求不列來源。

## 歷次設計紀錄

## 最新：16 節點與 2026 年發布

依要求移除 Dartmouth、反向傳播、GAN、DeepSeek-R1，加入下列已發布產品。這些是正式產品／能力更新，不標榜全部具有公認歷史突破地位；圖形的高度不代表評測分數。

| 發布日 | 節點 | 官方核對 |
|---|---|---|
| 2026-02-05 | Claude Opus 4.6 | https://www.anthropic.com/news/claude-opus-4-6 |
| 2026-03-05 | GPT-5.4 | https://openai.com/index/introducing-gpt-5-4/ |
| 2026-05-19 | Gemini 3.5 Flash | https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/ |
| 2026-07-24 | Claude Opus 5 | https://www.anthropic.com/news/claude-opus-5 |
| 2026-09-22 | GPT-6 Sol / Luna | https://openai.com/index/gpt-6-astra/ （9 月 22 日更新段落） |

## 前版紀錄

最新修訂改為 15 個跨領域節點，移除頁面註解。保留 Deep Blue、Watson 的歷史地位；移除 watsonx、Bob V2、Jev 的產品發布與 vibe coding 用語。加入 Dartmouth、反向傳播、AlexNet、GAN、AlphaFold 2、o1、DeepSeek-R1。這是有文獻依據的代表性選取，並非唯一公認排行榜；近期推理模型的歷史地位仍在形成。

核對依據：
- 電腦歷史博物館的 AI 時間軸（含 DENDRAL、Deep Blue、Watson）：https://www.computerhistory.org/timeline/ai-robotics/
- 諾貝爾物理獎科學背景（1986 反向傳播等）：https://www.nobelprize.org/uploads/2024/11/advanced-physicsprize2024-3.pdf
- AlexNet 原論文與 ImageNet 2012 結果：https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html 、https://www.image-net.org/challenges/LSVRC/2012/
- GAN 原論文：https://arxiv.org/abs/1406.2661
- 諾貝爾化學獎對 AlphaFold 2 的認定（成果於 2020 年發表）：https://www.nobelprize.org/prizes/chemistry/2024/press-release/
- o1 原始研究說明：https://openai.com/index/learning-to-reason-with-llms/
- DeepSeek-R1 發布與同行評審論文：https://deepseek.com/en/news/deepseek-r1/ 、https://www.nature.com/articles/s41586-025-09422-z

以下為前次修訂紀錄。

依使用者修訂，第 2 頁顯示 12 個節點的單一二維曲線：1950 圖靈測試、1965 專家系統、1997 Deep Blue、2011 Watson、2016 AlphaGo、2017 Transformer、2020 GPT-3、2022 ChatGPT、2023 watsonx、2025.02 vibe coding、2026.07 Bob V2、2026.09 Jev。橫軸只有時間，節點旁為簡短標籤；取消圖上的來源連結及說明彈窗。曲線與非等距時間為概念敘事，不表示實測能力或突破週期。

以下保留前次 24 節點版本的研究紀錄，並非目前的顯示內容。

## 前版研究紀錄

第 2 頁收錄 24 個代表節點：1950 圖靈測試、1956 Dartmouth、1958 感知器、1965 DENDRAL 專家系統、1966 ELIZA、1986 反向傳播代表論文、1997 Deep Blue、2011 Watson、2012 AlexNet、2014 GAN、2015/2016 AlphaGo、2017 Transformer、2018 GPT、2020 GPT-3、2021 Copilot、2022 ChatGPT、2023 watsonx、2024 o1-preview/MCP、2025 vibe coding/多代理研究系統、2026 Bob V2/Jev。

每個節點的原始論文、機構或產品發布來源與限定說明，集中於 [data/ai-milestones.ts](../data/ai-milestones.ts)，也可在圖上點選節點查看。DENDRAL 使用 Feigenbaum 的 ACM 訪談；vibe coding 原始 X 貼文無法由研究工具讀取，以 IBM 說明交叉核對月份，不引用未讀取的原文。

圖中事件為精選，不涵蓋完整 AI 歷史，也不能由事件密度證明迭代加速。三段折線按事件等距排列，高度無量測意義。Watson（2011 Jeopardy!）與 watsonx（2023 平台）分列；AlphaGo 首次擊敗職業棋士的範圍限定為完整棋盤、無讓子。LLM 並無單一誕生日，反向傳播 1986 也非最早發明時間。
