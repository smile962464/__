
// $.ajax({
//   url: 'http://localhost/inner/__/misc/chrome-extension/blank_ntp/data.json',
//   success: (data) => {
//     alert(data)
//   }
// })

var ios = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
var url = 'http://www.qiushibaike.com/';
var url1 = 'http://mobile.ant.design/kitchen-sink/';
var modifyUa = false;

setTimeout(() => {
  document.getElementById('i').src = url
  document.getElementById('i1').src = url1
}, 500)

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log(tabId, changeInfo, tab)
  if (tab.url == 'chrome://newtab/') {
    modifyUa = true
  } else {
    modifyUa = false;
  }
})

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var headers = details.requestHeaders;
  // console.log(location.href, details);
  if (details.parentFrameId > -1 && modifyUa) {
    for(var i = 0, l = headers.length; i < l; ++i) {
		  if( headers[i].name == 'User-Agent') {
        headers[i].value = ios;
		  }
  	}
  }
	return {requestHeaders: headers};
}, {urls: ["<all_urls>"]}, ['requestHeaders','blocking']);
