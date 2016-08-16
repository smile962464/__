
var NEWTAB = 'chrome://newtab/';
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var headers = details.requestHeaders;
  if (details.parentFrameId > -1) {
    for(var i = 0, l = headers.length; i < l; ++i) {
		  if( headers[i].name == 'User-Agent') {
        headers[i].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
		  }
  	}
  }
	return {requestHeaders: headers};
}, { urls: ["<all_urls>"] }, ['requestHeaders', 'blocking']);

// $.ajax({
//   url: 'http://localhost/inner/__/misc/chrome-extension/data.json',
//   success: (data) => {
//     // alert(data)
//   }
// })

// window.addEventListener('message', function (e) {
//   console.log('get msg from cross-origin frame', e.data, e.origin)
// });



