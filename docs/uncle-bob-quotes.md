# Uncle Bob 引文查證

## 專訪：2026-08-19

- 原始影片：https://www.youtube.com/watch?v=zcLPGC-tvgk
- Matt Pocock，LIVE: Uncle Bob on Software Fundamentals in the Age of AI。
- 日期直接由 YouTube「串流直播日期」核對。
- 引文（14:56–15:14，依先前直接讀取的YouTube原片轉錄稿）：“The key with agents is to trim that initial prompt down to its absolute minimum … and then do deterministic tools after the fact.”
- 中文翻譯：運用代理的關鍵，是把初始提示精簡到最低限度……然後再用確定性工具做後續檢查。
- 省略號略去中間對提示優先性的說明及對談應答；兩個片段保留原話，僅正常化首字母和標點。不是一個未經刪節的連續句子。
- 語境：14:02–14:50談上下文中間的規則容易被忽略，而確定性工具不會以相同方式消失。設計原則是精簡提示、以工具約束輸出；不是工具與編排越多越好。
- 視覺：使用者提供的專訪封面原圖；日期放在圖下，以IBM藍與底線強調。英文及中文逐字浮現，可重播或直接顯示全文；減少動態效果與列印模式直接顯示。

## 使用者提供的視覺素材

- `assets/uncle-bob-cover.jpg`：使用者提供的專訪封面原圖，已替換第3頁影片截圖，完整保留比例。
- `assets/uncle-bob-post.jpg`：使用者提供的 X 貼文截圖，第4頁採左右版型，圖下另列日期。
- 第4頁呈現已核對的影片反思原句及中文翻譯，兩者逐字浮現。

## 貼文：2026-09-12

- https://x.com/unclebobmartin/status/2098744156709441896
- 原貼文標題：Morning Bathrobe Rant: Rethinking Harnesses.
- 原頁顯示 2026 年 9 月 12 日，下午 8:02（瀏覽器顯示時區）。
- 原貼文影片已能直接播放，時長約4分19秒。頁面字幕軌未載入文字，改以 `yt-dlp` 從同一原貼文公開媒體取得英文自動字幕，未使用cookies、帳號或第三方轉載。
- 目前引文：01:58.384–02:04.965，“Apparently the harness is doing the damage. That's not what I expected.”
- 中文：看來，造成負面影響的正是這套 harness。這不是我原先預期的。
- 連續兩句原話，只補上一般標點；Apparently以「看來」保留觀察與推斷的語氣。
- 經使用者授權，以本機環境中的API金鑰呼叫OpenAI `gpt-4o-transcribe`，對涵蓋此段的原影片音訊作不提供候選引文的獨立轉錄。選定句子與X字幕完全一致。金鑰未寫入檔案或日誌。
- 「當約束成為負擔」是講者歸納的小標，非直接引文；選句用以呈現模型改善後，舊有編排需要重新評估的重點。
- 語境：他在自己的比較中發現單一代理勝過自建harness，因此重新檢視編排設計；影片02:28–02:50仍要求CRAP分數、mutation testing和unit tests，不能擴張為所有品質關卡均無必要。
- 原始字幕留在git忽略的`artifacts/uncle-bob-rethinking.en.vtt`供核對，不把整段影片或完整字幕公開到Pages。
