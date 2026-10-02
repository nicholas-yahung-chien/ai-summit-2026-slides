# COBOL 現代化雙 CLI Demo 研究與執行計畫

## 結論先行

這個 Demo 適合用來比較 **Bob Shell 與 Codex CLI 的端到端交付成果、token 用量與費用**，但目前不能單靠 CLI 輸出，把差異解釋成「多模型路由造成的效果」

原因有三點：

1. IBM Bob V2 公開資料確認 IDE 與 Shell 共用同一個 agent 與 harness；Bob Shell 也能以 `bob run --format json` 輸出 token、快取、成本、時間與工具呼叫統計
2. Bob Shell 的公開 JSON schema 沒有逐次模型名稱或 Router 決策欄位，因此一場執行是否真的跨模型，不能由 CLI 結果自行證明
3. IBM Bob self-hosted 的公開文件目前要求只設定一個 core inference model，Router 也只支援 `static` 策略；這與 SaaS 或 IBM 內部材料所描述的自動模型分派不能混為一談

因此，現場應先稱為：

> 同一代理任務下，Bob 管理模型路徑與 Codex 固定模型路徑的端到端比較

只有在取得 IBM 端的 Bifrost／Gateway audit log、逐次模型明細或等價路由證據後，才將 Bob 一側標為「多模型路由」

## 這不是純路由演算法實驗

Bob 與 Codex 使用不同 agent harness、系統提示、工具定義、快取方式與領域能力。如果 Bob 啟用 Premium Package for Z，還會加入資料字典、靜態分析、程式文件、轉換與驗證工作流。最終差異反映的是完整產品路徑，不能只歸因於 Router

若研究問題一定要限定為「多模型路由是否優於固定單模型」，應另做一組相同 harness 的控制實驗：同一代理、同一工具、同一提示，只切換 Bifrost routed endpoint 與固定模型 endpoint。Bob CLI vs Codex CLI 則保留為產品層比較

## 建議測試素材

採用 IBM 官方公開的 [`IBM/zopeneditor-sample`](https://github.com/IBM/zopeneditor-sample) 作為起點，範圍限制在：

- `COBOL/SAM1.cbl`、`COBOL/SAM2.cbl`
- `COPYBOOK/CUSTCOPY.cpy`、`COPYBOOK/TRANREC.cpy`
- 相關輸入資料與 `JCL/RUN.jcl`

選擇理由：

- 是 IBM 維護的公開 COBOL 範例
- 同時包含 COBOL、copybook、JCL、固定格式資料與跨程式呼叫
- 官方資料描述了輸入資料、處理流程及產出 customer report，適合建立可重複的語意驗收
- 規模足以測試跨檔理解，又能控制在短 Demo 的執行時間內

正式量測前，先在 z/OS 上執行原始 JCL 產生 golden output。若只能使用 GnuCOBOL，結果必須標示為相容環境驗證，不能宣稱已驗證所有 IBM Enterprise COBOL 語意

## 同一段 Prompt 的交付要求

兩邊都從內容完全相同、互不共用快取與輸出檔的乾淨工作目錄開始，使用同一個 UTF-8 prompt 檔：

```text
請在不修改 cobol/、copybook/、jcl/ 與 fixtures/ 原始檔的前提下，完成以下工作：

1. 閱讀 COBOL 主程式、被呼叫程式、copybook、JCL 與測試資料，理解完整處理流程
2. 建立 docs/cobol-program-spec.md，記錄程式目的、輸入輸出、資料結構、跨程式呼叫、控制流程、業務規則、錯誤與邊界條件
3. 在 java/ 建立 Java 21 Maven 專案，以 Java 標準函式庫實作等價行為；金額與定點小數必須明確處理精度與捨入，不得以浮點數近似
4. 建立並執行 JUnit 測試，確認 Java 輸出符合 fixtures 中的既定行為
5. 建立 docs/java-program-spec.md，記錄 Java 模組、類別、公開介面、COBOL-to-Java 對照、資料型別轉換、例外處理與測試覆蓋
6. 完成後執行 ./mvnw test，修正失敗直到全部通過，最後摘要列出產物與測試結果

不要啟用子代理，不要使用網路，不要向使用者提問；資訊不足時採保守假設並寫入規格文件
```

Java 依賴應預先固定並離線可用，以免網路下載量與等待時間污染比較

## 執行設定

### Bob Shell 2.0.4

```powershell
Get-Content -Raw .\prompt.txt |
  bob run `
    --format json `
    --workspace .\runs\bob-01 `
    --mode agent `
    --disable-subagents `
    --disable-mcp `
    --max-turns 100 > .\results\bob-01.json
```

保存以下欄位：

- `stats.total_tokens`
- `stats.input_tokens`
- `stats.output_tokens`
- `stats.cache_read_tokens`
- `stats.cache_write_tokens`
- `stats.session_costs`
- `stats.duration_ms`
- `stats.tool_calls`

`session_costs` 是 Bob 報告的 Bobcoin 成本。公開加購價格為 1,000 Bobcoins／USD 500，可另列 USD 0.50／Bobcoin 的加購包等值試算；企業合約或內含額度可能不同，不能把等值試算寫成實際帳單

### Codex CLI 0.153.0

建議固定 `gpt-6.1-sol` 與 `medium` reasoning，並關閉 multi-agent、使用全新 ephemeral session：

```powershell
Get-Content -Raw .\prompt.txt |
  codex exec `
    --json `
    --ephemeral `
    --ignore-user-config `
    --disable multi_agent `
    -m gpt-6.1-sol `
    -c 'model_reasoning_effort="medium"' `
    -C .\runs\codex-01 `
    -s workspace-write `
    -a never `
    - > .\results\codex-01.jsonl
```

從最後一個 `turn.completed` 事件保存：

- `usage.input_tokens`
- `usage.cached_input_tokens`
- `usage.cache_write_input_tokens`
- `usage.output_tokens`
- `usage.reasoning_output_tokens`

不要使用 `resume`，避免不同版本對 resumed turn 的累計 token 語意造成誤讀

若 Codex 以 ChatGPT 方案登入，這些 tokens 不等於一張逐次 API 帳單。費用應標為「依同模型公開 API 單價換算」。若需要可核對的實際美元支出，應改用 API key 計費並從組織 usage 資料交叉核對

## 驗收與評分

### 1. 可執行結果

- Maven build 成功
- 所有公開與隱藏 JUnit 測試通過
- 不得修改原始 COBOL 與 golden fixtures

### 2. 語意等價

隱藏測試至少包含：

- 固定欄位長度與空白補齊
- COBOL `PIC` 與 Java 型別對照
- 定點小數、正負值、零值與捨入
- 每種 transaction type
- 找不到客戶、重複資料及檔案終止條件
- 跨程式參數傳遞及輸出報表順序

IBM 對 COBOL-to-Java 的公開方法強調 source behavior 產生測試並驗證 functional equivalence；只看程式能否編譯不足以判斷轉換成功

### 3. 文件品質

以預先公布的 checklist 評分，不使用另一個 LLM 當唯一裁判：

- COBOL 規格是否涵蓋 purpose、I/O、copybook、call graph、control flow、business rules、edge cases
- Java 規格是否涵蓋 module/class/API、COBOL mapping、data conversion、error handling、tests
- 每一條規則是否能追溯到來源行號、fixture 或測試
- 兩份文件是否與實際程式同步

### 4. 成本與效率

主指標：

- 每個成功交付的 Bobcoins／API 等值 USD
- input、cache read、cache write、output、reasoning tokens 分項

次指標：

- 完成時間
- agent turns
- tool calls
- 首次測試通過率與修正次數

不同模型的 tokenizer 與計價結構不同，raw token 總數只能作為使用量描述；跨產品的主要成本比較應使用各自可核對的費用口徑

## 重複次數與現場呈現

- 正式結果至少各跑 3 次，建議 5 次
- 交替執行 Bob、Codex、Codex、Bob，降低時間與服務負載偏差
- 每次從新的 session、git worktree 或完整複本開始
- 報告 median、範圍、成功次數，不只展示最好的一次
- 現場只跑一組代表性工作階段；投影片上的比較數據使用事前完整重複實驗
- 準備已完成輸出與 JSON trace 作為連線或服務波動時的 fallback

## Demo 前必須完成的路由驗證

在簡報上使用「Bob 多模型路由」之前，至少取得下列其中一項：

1. Bifrost／Model Gateway audit log，能顯示同一 Bob task 的各次呼叫模型
2. IBM SaaS 管理端的逐次 route decision 匯出
3. Bob Shell trace 中由 IBM 正式定義的 per-call model 欄位

如果三者皆無，保留「Bob 管理模型路徑」說法，並將研究問題寫成產品層的交付成本比較

## 主要資料來源

- [IBM Bob Shell：非互動模式與 JSON stats](https://bob.ibm.com/docs/shell/getting-started/start-bobshell-non-interactive)
- [IBM Bob self-hosted Model Gateway：單一 core model 與 static router](https://bob.ibm.com/docs/ide/enterprise/on-premises/model-gateway/configuration)
- [IBM Bob Premium Package for Z：分析、文件、轉換與驗證工作流](https://bob.ibm.com/docs/ide/premium-packages/bob-for-z/bob-for-z-index)
- [IBM Bob：COBOL-to-Java 應以 source behavior 測試 functional equivalence](https://bob.ibm.com/blog/bob-for-z-announcement/)
- [IBM Z Open Editor sample repository](https://github.com/IBM/zopeneditor-sample)
- [OpenAI：以 `codex exec --json` 保存可評分的 JSONL trace](https://developers.openai.com/blog/eval-skills)
- [OpenAI model pricing](https://developers.openai.com/api/docs/models/compare)
