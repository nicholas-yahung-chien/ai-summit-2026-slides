# AI 高峰會 2026 · 網頁簡報

2026 年 10 月 23 日 AI 高峰會的 Slidev 簡報專案。

**以代理式 AI 重塑軟體開發生命週期** — Nicholas Chien / 錢亞宏。
分場：Build AI｜打造企業 AI 創新基礎；14:30–15:05，35 分鐘。
21 頁內容初稿（19 頁主線與示範備援、2 頁來源），含公開講者備註、研究比較、動畫時間軸。
研究的適用範圍見 [來源與限制](docs/sources.md)，Bob 現場操作仍需排演，見 [示範腳本](docs/demo-runbook.md)。

## 開發與發布

Node.js 24 LTS。

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run preview
```

`main` 推送後，GitHub Actions 執行設定檢查、控制邏輯測試與正式建置，再部署到 GitHub Pages。
線上簡報：<https://nicholas-yahung-chien.github.io/ai-summit-2026-slides/>
Pull request 只執行驗證與建置。Pages 的來源為 GitHub Actions。
使用 hash routing，`/ai-summit-2026-slides/#/4` 可直接開啟第 4 頁並重新整理。
若改 repo 名称，請同步調整 package.json 的 build base。

## 播放

- 方向鍵、空白鍵：Slidev 原生導覽。
- 下方「跳至」輸入 1–21，再按 Enter 或「前往」。無效頁碼會顯示錯誤，不會跳頁。
- `J`：聚焦頁碼輸入；`H`：隱藏／顯示自訂控制列。
- 「開始／暫停／重設」操作 Slidev 共用計時器，預設 35 分鐘倒數；超時顯示紅色 `+MM:SS`。
- 「講者模式」開啟另一個視窗，含原生計時、講者備註與下一頁預覽。
- 公開備註包含时间分配、講述建議與來源限制；不含內部資訊。後續若加入內部備註，請以 `--without-notes` 建置公開版本。
- 字體透過 npm 套件打包，播放不需連線 Google Fonts。離線播放需先建置並使用本機靜態伺服器，不是直接雙擊 HTML。

## AI 工作流程

官方技能來源：<https://github.com/slidevjs/slidev/tree/main/skills/slidev>。

```sh
npx skills add slidevjs/slidev
npm run mcp
```

此電腦的 Codex 已設定 `ai-summit-slidev` stdio MCP，指向本專案的 CLI 與 slides.md。
換電腦時，用本機絕對路徑重新設定：

```sh
codex mcp add ai-summit-slidev -- node /absolute/project/node_modules/@slidev/cli/bin/slidev.mjs mcp /absolute/project/slides.md
```

開發伺服器另提供 `http://localhost:3030/__mcp`。MCP 僅為本機編輯使用，不包含在 GitHub Pages 靜態發布中。

## 編輯位置

- `slides.md`：內容、講者備註、時長與頁面設定。
- `style.css`：IBM 藍色系與大字體樣式。
- `layouts/summit.vue`：共用版面與頁尾。
- `components/SummitArt.vue`：原創層疊向量圖形。
- `global-top.vue`：頁碼跳轉與共用計時控制。
- `docs/design-plan.md`：設計決策與待確認內容。

相容性：目前鎖定 `floating-vue` 5.2.2，避免 5.4.0 與 Shiki TwoSlash 的元件結構不相容造成啟動錯誤。升級時需重新測試工具提示與講者模式。

依賴限制：2026-09-28 的 npm audit 回報 Slidev 53 上游依賴共 13 項通報（2 low、1 moderate、10 high），包含 Mermaid、匯出及編輯器依賴；建議的整體修復涉及退版至 Slidev 52。本專案維持已驗證的 53.0.0 MCP 功能，未執行強制降版。公開 Pages 只提供建置後靜態內容，不提供 MCP／開發伺服器；加入外來 Markdown、圖表或匯出流程前應再檢視對應通報。

首頁直接使用使用者指定的高峰會主視覺，圖片從本機活動範本 `IBM AI Summit 2026_Taiwan_PPT Template.pptx` 的 `ppt/media/image3.jpeg` 原樣擷取，與對話提供圖片視覺一致。以完整構圖呈現，無重繪或色彩調整。結尾保留原創向量圖；該向量圖不是官方 logo。
本專案不是 IBM 官方網站；品牌名稱的使用不表示官方背書。
