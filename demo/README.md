# IBM Bob 現場示範規格

此目錄是教學用起點，尚未完成的函式會讓驗收測試失敗。不是正式報名服務。

用純 JavaScript 實作 `register(attendees, id, capacity)` 與 `cancel(attendees, id)`。

- attendees 為不重複、非空白的字串 ID 陣列，capacity 為正整數。
- 成功報名回傳 `{status:'registered', attendees:新的名單}`。
- ID 已存在時回傳 `duplicate`，即使已額滿也優先回報重複。
- 新 ID 遇容量已滿回傳 `full`，保持原名單。
- 取消存在的 ID 回傳 `cancelled`，取消不存在的 ID 回傳 `not-found`。
- 取消成功後可接受新報名；所有操作不得修改輸入陣列。
- 空白 ID、無效容量、含空白或重複 ID 的初始名單應丟出錯誤。
- 除了拒絕空白字串，不做大小寫或前後空白正規化；ID 以原字串精確比較。

在 repo 根目錄執行 `node --test demo/registration.test.mjs`。
在 Bob 中僅開啟本目錄，要求先讀規格與測試再提出計畫。不要讀 reference/，除非切換示範備援。

範圍：單一程序、記憶體、合成 ID；不含帳號、付款、持久化或多使用者併發。
備援版本在 reference/，由簡報製作流程預先建立，並非 Bob 現場輸出。
