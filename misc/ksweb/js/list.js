var ds = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'gif', 'txt'];
var vs = ['mp4', 'MKV', 'mkv'];
var res = '';
filenameArr.forEach(function (item, index) {
  if (ds.indexOf(fileExtArr[index]) >= 0) {
    res += '<div><a class="ds" href="' + item + '">' + item + '</a>\
    <i>' + fileTimeArr[index] + '<i>\
    <b data-name="' + item + '">删除</b></div>';
  } else if (vs.indexOf(fileExtArr[index]) >= 0) {
    res += '<div><a class="vs" href="javascript:;">' + item + '</a>\
    <i>' + fileTimeArr[index] + '<i>\
    <b data-name="' + item + '">删除</b></div>';
  } else {
    res += '<div><a class="ot" href="javascript:;">' + item + '</a>\
    <i>' + fileTimeArr[index] + '<i>\
    <b data-name="' + item + '">删除</b></div>';
  }
})
var list = $('#list').html(res);
list.find('a.vs').on('click', function() {
  player.src({ type: "video/mp4", src: $(this).text() });
  player.play();
});
list.find('b').on('click', function() {
  var fileName = $(this).attr('data-name').replace('uploads/', '');
  if (window.confirm('确认是否删除 ' + fileName )) {
    $.ajax({
      url: '/delete.php',
      type: 'DELETE',
      data: JSON.stringify({fileName: fileName}),
      success: function(result) {
        location.reload();
      }
    });
  }
});
