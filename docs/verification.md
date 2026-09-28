# 驗證紀錄 · 2026-09-28

- 官方 Slidev Skill 已安裝至本機 Codex skills 目錄。
- Codex `ai-summit-slidev` stdio MCP 已設定；用 MCP SDK 執行 initialize、tools/list、slidev-get-info，確認版本 53.0.0 與 8 頁簡報。
- `npm run check`、`npm test`、`npm run build` 通過。
- Edge 逐頁檢查全部 8 頁；修正預設主題的 h1 後段落半透明及行距覆蓋。
- 瀏覽器實測頁碼 4 跳轉成功；頁碼 9 被拒絕並顯示錯誤。
- 瀏覽器實測 30:00 倒數開始、暫停後數字維持不變、重設回到 30:00。
- 開啟講者模式，確認當前頁、下一頁區、講者備註與原生計時器。
- 第一輪 GitHub Actions 建置與 GitHub Pages 部署成功。
- 發現 FloatingVue 5.4.0 與 Shiki TwoSlash 的上游不相容，以鎖定 5.2.2 修復；正式建置另行檢查。

單元測試包括頁碼輸入邊界、無效字串、非整數、倒數起始／歸零／超時及一小時邊界。
本次不含正式演講內容校稿、實體投影機／簡報筆測試或 PDF 匯出驗證。
