
// $.ajax({
//   url: 'http://localhost/inner/__/misc/chrome-extension/blank_ntp/data.json',
//   success: (data) => {
//     alert(data)
//   }
// })

// function intervalUrl(urls, cb) {
//   var _index = 0;
//   setInterval(function () {
//     if (_index >= urls.length - 1) {
//       _index = -1;
//     }
//     cb(urls[++_index])
//   }, 10000)
// }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var ios = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
var urls = ['http://www.qiushibaike.com/', 'http://m.lengxiaohua.com/'];
var currentUrl = urls[getRandomInt(0, urls.length - 1)];
var i = document.getElementById('i');
setTimeout(() => {
  i.src = currentUrl;
  $('#main').append('<iframe class="ifr" name="__spe" src="http://mobile.ant.design/kitchen-sink/"></iframe>')
}, 500)

window.addEventListener('message', function (e) {
  if (e.origin.indexOf(currentUrl.substr(0, currentUrl.length - 2)) == 0 &&
    JSON.parse(e.data).data === 'domReady') {
    i.contentWindow.postMessage(JSON.stringify({data: 'rm_ad'}),'*');
  }
})

var modifyUa = false;
var NEWTAB = 'chrome://newtab/';
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log(tabId, changeInfo, tab.url)
  if (tab.url == NEWTAB) {
    modifyUa = true;
  } else {
    modifyUa = false;
  }
})

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var headers = details.requestHeaders;
  // console.log(location.href, details, modifyUa);
  if (details.parentFrameId > -1 && modifyUa) {
    for(var i = 0, l = headers.length; i < l; ++i) {
		  if( headers[i].name == 'User-Agent') {
        headers[i].value = ios;
		  }
  	}
  }
	return {requestHeaders: headers};
}, { urls: ["<all_urls>"] }, ['requestHeaders', 'blocking']);


