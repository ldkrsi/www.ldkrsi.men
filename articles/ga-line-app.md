```yaml
tags:
  - js
  - Google Analytics
```

# 抓出 Line APP 的流量塞到 Google Analytics 中

因為在 APP 內開啟連結，會等同於從書籤或我的最愛中開啟連結，http header 中沒有帶 referrer 的資訊，在GA的統計中會被歸在 `(direct) / (none)` 中。

不過可以用 user agent 中的資訊來判別是不是在 Line APP 中開啟。

只要你能抓出其他家 APP user agent 的 features 也能用相同原理去補資料。

值得另外提的是 facebook 家族 (Facebook, Messenger, Instagram) 開網頁時會通過 `l.facebook.com` 進行轉址，會自帶 referrer 資訊，不用特別處理

## gtag.js 版本

```js
if (document.referrer !== undefined && document.referrer.length === 0 && /\WLine\/\d/.test(navigator.userAgent)) {
    gtag('config', 'UA-XXXXXXX-X', {
        page_referrer: 'https://line.me'
    });
} else {
    gtag('config', 'UA-XXXXXXX-X');
}
```

### analytics.js 版本

```js
if (document.referrer !== undefined && document.referrer.length === 0 && /\WLine\/\d/.test(navigator.userAgent)) {
    ga('set', 'referrer', 'https://line.me');
}
```