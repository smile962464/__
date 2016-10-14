
var NEWTAB = 'chrome://newtab/';
// window.addEventListener('message', function (e) {
//   console.log('get msg from cross-origin frame', e.data, e.origin)
// });

var jokeData = []
var jokeMain = $('#jokeMain');
var getIndex = () => parseInt(Math.random() * jokeData.length);
$.ajax({
  url: 'http://localhost:9998/?joke=1',
  dataType: 'json',
  success: (data) => {
    jokeData = data;
    jokeMain.html(jokeData[getIndex()]);
  }
})
$('#changeJoke').click(function () {
  jokeMain.html(jokeData[getIndex()]);
})


$(function () {
  $('[data-toggle="popover"]').popover({
    content: function () {
      return $('#qrcode').html();
    }
  })
})
