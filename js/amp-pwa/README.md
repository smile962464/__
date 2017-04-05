
# pwa amp

- https://developers.google.com/web/progressive-web-apps/
- https://www.ampproject.org/
- [chrome://serviceworker-internals/](chrome://serviceworker-internals/) / [chrome://inspect/#service-workers](chrome://inspect/#service-workers)

### serviceWorker

https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorker / 
https://developer.mozilla.org/en-US/docs/Web/API/Cache

- 需要运行于 HTTPS 或 本地 localhost 环境，是继 Web Worker 后又一个新的线程。来实现离线页面功能。
- Service Worker 是独立于页面的一个运行环境，它在页面关闭后仍可以运行。Web Worker 在页面关闭后不再运行。
- Service Worder 在安装（install）和激活(activate)后，关闭网络再次打开页面，资源的获取途径是“from ServiceWorker”
