
var NEWTAB = 'chrome://newtab/';
// window.addEventListener('message', function (e) {
//   console.log('get msg from cross-origin frame', e.data, e.origin)
// });

// returns a random member of list without repeating until all members have been returned.
function randomItem(arr) {
  var original = arr;
  var remainder;
  return function () {
    // console.log(remainder && remainder.length)
    if (!(remainder && remainder.length)) {
      remainder = original.slice();
    }
    return remainder.splice(Math.random() * remainder.length | 0, 1)[0];
  };
}

var jokeMain = $('#jokeMain');
var jr;
$.ajax({
  url: 'http://localhost:9998/?joke=1',
  dataType: 'json',
  success: (data) => {
    jr = randomItem(data);
    jokeMain.html(jr());
    // jokeMain.html(data[Math.floor(Math.random() * data.length)]);
  }
})
var jokeMain1 = $('#jokeMain1');
var jr1;
$.ajax({
  url: 'http://localhost:9998/?joke=2',
  dataType: 'json',
  success: (data) => {
    jr1 = randomItem(data);
    setDisplay();
  }
})
$('#changeJoke').click(function () {
  jokeMain.html(jr());
  setDisplay();
});
function setDisplay() {
  var item = jr1();
  jokeMain1.attr('src', item.url).width(item.width);
}
jokeMain1.click(function () {
  $(this).parent().toggleClass('small')
});

// qrcode text
var qri = $("#qrcode_input");
qri.val(localStorage.getItem('qrtxt') || '');
qri.change(function () {
  localStorage.setItem('qrtxt', $(this).val());
})
$('#gen').click(function () {
  $('#dqr').html('');
  new QRCode($('#dqr')[0], {
    text: qri.val(),
    width: 200,
    height: 200,
    colorDark: "#003450",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
})


$(function () {
  $('[data-toggle="popover"]').popover({
    content: function () {
      return $('#qrcode').html();
    }
  })
})
