# Jev 路由：兩種做法與證據

## 採用資料

1. Khanna, A. (2026, September 20). *Jev model routing: What 450 real calls revealed* [Benchmark report]. Vaaya.
   https://vaaya.ai/blog/jev-ai-model-routing-vaaya-benchmark
   機器可讀結果：https://vaaya.ai/blog/assets/jev-model-routing-current/summary.json
   商業平台自測，非獨立學術研究。費用 $0.257437 → $0.168121，減少 34.6943%，已含 Jev。50 題每組三次，不是 150 個獨立任務。通過率 113/150 → 120/150，包含格式檢查；p95 11.47 → 15.36 秒。工作負載是文字回覆，不是程式代理端到端任務。

2. robertn702. (2026, September 25). *Jev router: Consolidated Astra evaluation* [Benchmark report]. GitHub.
   https://github.com/robertn702/opencode-jev-router/blob/main/eval/results/router-consolidated-2026-09-25.md
   採 preselected holdout 而非合併開發集：6 題 × 6 次，GPT-6 Astra，固定 high 對 Jev 動態強度，均 36/36 通過。平均輸出含推理 1,800 → 1,507 tokens，減少 16.3%；耗時 118.4 → 111.0 秒。社群作者自報，完整原始 traces 未隨彙整公開；沒有美元節費結果。

## 未用作主圖的數據

- https://github.com/its-panzer/jev-model-router ：26.3% 為假設 token 用量下的成本推算，97/100 是模型選擇符合標籤，非下游任務成功率
- https://llmgateway.io/blog/smart-routing-benchmark ：33.2% 相對昂貴基準的節省未能證明通用優勢；公開摘要揭露固定中價模型較路由更便宜，品質與信賴區間仍需看完整條件
- https://github.com/suenot/codex-jev-router-benchmarks ：實測 tokens 乘 API 價格屬估算；親代理＋子代理完整流程有增費案例，不能只拿 worker 部分的節省當端到端節省

## 敘事

Jev 用來判斷，應用程式實際選模型或設定推理強度。下一頁呈現 Jev 自製路由與 Bifrost Gateway 的責任範圍，不當成同類產品勝負表，也不宣稱兩者已有官方整合

本次新增於原 p9 之前，因此原 p9–p14 順延為 p10–p15，展示題目與 Live demo 順延為 p23、p24
