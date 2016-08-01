console.log(chrome.extension.getURL('/data.json'));
// $.ajax({
//   url: 'http://localhost/inner/__/misc/chrome-extension/blank_ntp/data.json',
//   success: (data) => {
//     alert(data)
//   }
// })

// 学习 error 提示写法：
// Error: Invocation of form tabs.executeScript(string, function) doesn't match definition
// tabs.executeScript(optional integer tabId, object details, optional function callback)

// console.log(chrome.runtime.getManifest())
// chrome.runtime.getBackgroundPage(function (params) {
//   console.log(params)
// })
// chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
//   alert(tab.url)
// });

// chrome.history.onVisited.addListener(function (params) {
//   alert(params)
// })

// chrome.tabs.getCurrent(function (params) {
//   console.log(params)
// })
// chrome.tabs.getAllInWindow(function (params) {
//   console.log(params)
// })
// 截图
// chrome.tabs.captureVisibleTab(function (params) {
//   // console.log(params)
// })

// chrome.tabs.onCreated.addListener(function (tab) {
//   // alert(tab.url)
// })
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   console.log(tabId, changeInfo, tab)
//   // alert(tab.url)
// })

// chrome.tabs.create({"url": "http://google.com"});
// chrome.tabs.executeScript({ code: 'alert(2)', allFrames: true }, function (params) {
//   console.log(params)
// })

// content.js
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(request)
//     // chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
//   }
// );

// in background
// chrome.extension.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     console.log('cccc',request)
//     switch ( request.action) {
//       case 'newTab': {
//         console.log('cccc')
//          //note: passing an empty object opens a new blank tab, 
//          //but an object must be passed
//         //  chrome.tabs.create({/*options*/}); 
//          // run callback / send response
//        } break;
//     }
//     return true; //required if you want your callback to run, IIRC
//   });

// // in content script:
// chrome.extension.sendMessage({action: "newTab"}, function(response) {
//   console.log(response)
// });


var ios = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
var url = 'http://www.qiushibaike.com/';
var modifyUa = false;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(tabId, changeInfo, tab)
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
    // alert(11)
    for(var i = 0, l = headers.length; i < l; ++i) {
		  if( headers[i].name == 'User-Agent') {
        headers[i].value = ios;
		  }
  	}
  }
	return {requestHeaders: headers};
}, {urls: ["<all_urls>"]}, ['requestHeaders','blocking']);

setTimeout(() => {
  document.getElementById('ifr').src = url
}, 500)