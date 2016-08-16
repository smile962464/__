
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
      url: "ifr.html",
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