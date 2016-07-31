console.log(chrome.extension.getURL('/data.json'));
// $.ajax({
//   url: 'http://localhost/inner/__/misc/chrome-extension/blank_ntp/data.json',
//   success: (data) => {
//     alert(data)
//   }
// })

var ios = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
var url = 'http://www.qiushibaike.com/';

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var headers = details.requestHeaders;
  console.log(details)
  // if (details.url == url) {
  if (details.parentFrameId > -1) {
    for(var i = 0, l = headers.length; i < l; ++i) {
		  if( headers[i].name == 'User-Agent' ) {
        headers[i].value = ios;
		  }
  	}
  }
	return {requestHeaders: headers};
}, {urls: ["<all_urls>"]}, ['requestHeaders','blocking']);

setTimeout(() => {
  document.getElementById('ifr').src = url
}, 500)