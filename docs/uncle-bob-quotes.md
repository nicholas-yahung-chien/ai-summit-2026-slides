# Uncle Bob 引文查證

## 專訪：2026-08-19

- 原始影片：https://www.youtube.com/watch?v=zcLPGC-tvgk
- Matt Pocock，LIVE: Uncle Bob on Software Fundamentals in the Age of AI。
- 日期直接由 YouTube「串流直播日期」核對。
- 引文（17:01–17:08，依原片英文字幕）：“You must change the code until this tool says that it's okay.”
- 中文翻譯：你必須持續修改程式碼，直到這個工具判定通過。
- 口語重複的第一個「you must」未納入節錄；節錄從第二個「you must」開始，僅將首字母及標點正規化。
- 語境：16:55 起，他說確定性工具將代理放入反覆修改的迴圈。17:28–17:33 承認這是在用生產力換取品質，且存在代價界線；並非主張約束越多越好。
- 畫面：原片約 17:24 的訪談畫面，2026-09-28 由瀏覽器擷取。英文及中文逐字浮現，可重播或直接顯示全文；減少動態效果與列印模式直接顯示。

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
