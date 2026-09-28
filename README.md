# AI 高峰會 2026 · 網頁簡報

2026 年 10 月 23 日 AI 高峰會的 Slidev 簡報專案。

**目前為 8 頁設計與互動樣稿。正式題目、講者、演講時長、案例和講稿待確認。**
頁面中的敘事是示範內容，不包含未經驗證的產品數據或正式活動承諾。

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
Pull request 只執行驗證與建置。Pages 的來源為 GitHub Actions。
使用 hash routing，`/ai-summit-2026-slides/#/4` 可直接開啟第 4 頁並重新整理。
若改 repo 名称，請同步調整 package.json 的 build base。

## 播放

- 方向鍵、空白鍵：Slidev 原生導覽。
- 下方「跳至」輸入 1–8，再按 Enter 或「前往」。無效頁碼會顯示錯誤，不會跳頁。
- `J`：聚焦頁碼輸入；`H`：隱藏／顯示自訂控制列。
- 「開始／暫停／重設」操作 Slidev 共用計時器。樣稿暫設 30 分鐘倒數；超時顯示紅色 `+MM:SS`。
- 「講者模式」開啟另一個視窗，含原生計時、講者備註與下一頁預覽。
- 公開版本保留的備註全是可公開的樣稿說明。正式版的公開備註請另行審查，必要時以 `--without-notes` 建置。
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

使用者提供的高峰會主視覺作為色調與層疊節奏參考。此專案未納入原始主視覺圖片；向量圖不是官方 logo。
本專案不是 IBM 官方網站；品牌名稱的使用不表示官方背書。
