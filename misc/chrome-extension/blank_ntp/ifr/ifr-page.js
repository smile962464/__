
// 设置 ua 为 iPhone ua
chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var headers = details.requestHeaders;
  if (details.parentFrameId > -1) {
    for (var i = 0, l = headers.length; i < l; ++i) {
      if (headers[i].name == 'User-Agent') {
        headers[i].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
      }
    }
  }
  return { requestHeaders: headers };
}, { urls: ["<all_urls>"] }, ['requestHeaders', 'blocking']);


// page js
var switched = false;
var btnInit = {
  opacity: 1,
  width: 80,
  height: 80,
};
var btnS = {
  opacity: 0.5,
  width: '/=2',
  height: '/=2',
};

var resInit = {
  width: 100,
  height: 100,
};
var dur = 500;

$('#showIfr').on('click', function () {
  switched = !switched;
  var res = $("#res");
  var ifrWrap = res.find('#ifr-wrap');
  if (switched) {
    $(this).html('hide');
    $.ajax({
      url: "ifr/ifr.html",
      cache: true
    }).done(function(html) {
      res.append(html);
      ifrWrap = res.find('#ifr-wrap');
      ifrWrap.velocity({opacity: 1}, { duration: dur })
      res.velocity({
        width: ifrWrap.width(),
        height: ifrWrap.height()
      })
    });
  } else {
    $(this).html('show');
    res.velocity(resInit, { duration: dur })
    ifrWrap.velocity({opacity: 0}, { duration: dur })
  }
  $(this).velocity(switched ? btnS : btnInit);
})
