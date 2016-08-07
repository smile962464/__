
// 背景 js，不能与 dom 交互 ？
// 初始化只运行在 chrome://extensions/ 页面
// alert(5)
// webNavigation 只能用于背景 js 里 ？

var myObj = {
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getHost: function (url) {
    var a = document.createElement('a')
    a.href = url;
    return a.hostname
  },
  isInNewTab: false,
  urls: ['http://www.qiushibaike.com/', 'http://www.walxh.com']
}

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
  // if (myObj.isInNewTab) {
    myObj.i.contentWindow.postMessage(JSON.stringify({data: 'rm_ad'}),'*');
  // }
}, {
  // url: [{ hostContains: 'ztm.waw.pl' }]
  url: myObj.urls.map(function (i) { return { hostContains: myObj.getHost(i) } })
});


