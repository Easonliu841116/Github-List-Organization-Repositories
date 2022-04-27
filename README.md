### 補充說明

- 此 Webpack 我有配置 BrowserRouter 設定，雖 SPA 在 surge 上要做額外的 200.html 設定，但因此 demo 只有一頁，為方便起見就不做額外設定了。

- 原要放在 global context provider 裡的 loading status，因只有一個頁面，故無拆出來另外放。
- 為求方便，找了一個 UI Library 直接套，本身在公司非常少用 UI Library。
- style 在寫 React 的時候會用 emotion，平常用 Sass 多。
- Repos 拆出去的原因是這種列表很容易共用，平常命名會以功能命名(ex: List)，因本次只有一頁就以此名命名易辨識。
- 假資料平常我會拉一份下來建一個 express 的 mockAPI 或做 proxy，為求方便這邊就沒有額外設定了。
