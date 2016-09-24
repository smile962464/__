<?php
	$viewInfo = $_GET['viewInfo'];
	if ($viewInfo == '1') {
		phpinfo();
	} else {
  $path = "uploads/";
  $arr = array();
  $fileExt = array();
  foreach (glob($path."*") as $filename) {
    array_push($arr, $filename);
    array_push($fileExt, pathinfo($filename, PATHINFO_EXTENSION));
  }
  function toJsArray($arr) {
    return "[".'"' . implode('","', $arr).'"' ."]";
  }
  $js_data = "<script>
    var files = ". toJsArray($arr) ."; \n
    var fileExts = ". toJsArray($fileExt) .";
  </script>";
?>
<!DOCTYPE html>
<html>
<head>
  <title>demo</title>
  <meta charset="utf-8" />
  <meta name="apple-touch-fullscreen" content="yes" />
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
  <meta content="yes" name="apple-mobile-web-app-capable" />
  <meta content="black" name="apple-mobile-web-app-status-bar-style" />
  <style>
    #mvideo { width: 100%; margin-top: 10px; }
    #list { word-break: break-all; }
    #list a { display: inline-block; padding: 4px; }
    #list a.vs { background-color: bisque; }
    form { display: block; margin: 20px auto; background: #eee; border-radius: 10px; padding: 15px }
    .progress { position:relative; width:100%; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
    .bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
    .percent { position:absolute; display:inline-block; top:3px; left:48%; }
  </style>
  <link href="http://vjs.zencdn.net/5.11.6/video-js.css" rel="stylesheet">
  <?php
  echo $js_data;
  ?>
</head>
<body>
  <a href='index.php?viewInfo=1'>Click</a> to view PHP info.

	<form action="upload.php" method="post" enctype="multipart/form-data">
    Select file to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload file" name="submit">
	</form>
  <div class="progress">
    <div class="bar"></div>
    <div class="percent">0%</div>
  </div>
  <div id="status"></div>
  <script src="js/jquery-1.12.4.js"></script>
  <script src="js/jquery.form.js"></script>
  <script>
    (function() {
      var bar = $('.bar');
      var percent = $('.percent');
      var status = $('#status');
      $('form').ajaxForm({
        beforeSend: function() {
            status.empty();
            var percentVal = '0%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        success: function() {
          console.log('success..');
          var percentVal = '100%';
          bar.width(percentVal)
          percent.html(percentVal);
          setTimeout(function () {
            location.reload();
          }, 1000);
        },
        complete: function(xhr) {
          console.log('complete..');
          status.html(xhr.responseText);
        }
      });
    })();
  </script>

  <video id="mvideo"
    class="video-js vjs-default-skin vjs-big-play-centered"
    controls height="264">
  </video>

  <script src="http://vjs.zencdn.net/5.11.6/video.min.js"></script>
  <script src="http://cdn.sc.gl/videojs-hotkeys/latest/videojs.hotkeys.min.js"></script>
  <script>
    var player = videojs('mvideo', {
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        muteToggle: true,
        progressControl: {
          keepTooltipsInside: true
        }
      }
     }, function() {
      this.hotkeys();
      // this.play(); // if you don't trust autoplay for some reason
    });
  </script>

  <div id="list" style="padding: 10px; margin-top: 10px;"></div>
  <script>
    var ds = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'gif', 'txt'];
    var vs = ['mp4'];
    var res = '';
    files.forEach(function (item, index) {
      if (ds.indexOf(fileExts[index]) >= 0) {
        res += '<div><a class="ds" href="' + item + '">' + item + '</a><b data-name="' + item + '">删除</b></div>';
      } else if (vs.indexOf(fileExts[index]) >= 0) {
        res += '<div><a class="vs" href="javascript:;">' + item + '</a><b data-name="' + item + '">删除</b></div>';
      } else {
        res += '<div><a class="ot" href="javascript:;">' + item + '</a><b data-name="' + item + '">删除</b></div>';
      }
    })
    var list = $('#list').html(res);
    list.find('a.vs').on('click', function() {
      // $('#mvideo').attr('src', $(this).text());
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
  </script>
</body>
</html>
<?php
	}
?>
