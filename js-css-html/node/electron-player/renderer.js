// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(process.versions)

var path = require('path');
var fs = require('fs-extra');
var parser = require('subtitles-parser');

var localPath = '/Users/hua/Downloads/';
var enumExts = ['mp4', 'mkv', 'ogg'];

var items = [];
fs.readdir(localPath, function (err, files) {
  files.forEach(fname => {
    var extname = path.extname(fname);
    var ext = extname && extname.substr(1);
    if (ext && enumExts.indexOf(ext) > -1) {
      // srt file name, e.g. `srt-videoName.srt`
      var srtFile = path.normalize(localPath + 'srt-' + path.parse(fname).name + '.srt');
      // console.log(fname, srtFile);
      items.push({
        info: {
          title: fname,
          description: '',
          subtitle: fs.existsSync(srtFile) &&
            parser.fromSrt(fs.readFileSync(srtFile, 'utf8'), true)
        },
        source: {
          src: 'http://localhost:9999/' + fname,
          type: 'video/' + (ext === 'mkv' ? 'webm' : ext)
        }
      });
    }
  })
  mkVideo()
})

function mkVideo() {
  var player = videojs('mvideo', {
    playbackRates: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    controlBar: {
      muteToggle: true,
      progressControl: {
        keepTooltipsInside: true
      }
    }
  }, function() {
    console.log('Good to go!');
    this.hotkeys();
    // this.play(); // if you don't trust autoplay for some reason
  });

  var subtitle;
  var rateEle = $('.rate');
  var rateText = '动态加速度：';
  var initRateChange = false;
  var startRateChange = false;
  var endRateChange = false;
  var playbackRateBig = 3;  // 加速度
  var playbackRateNormal = 1;  // 正常速度
  player.on('timeupdate', function() {
    if (subtitle) {
      // 一开始一般没字幕，就设置加速
      if (!initRateChange) {
        player.playbackRate(playbackRateBig);
        rateEle.html(rateText + playbackRateBig);
        initRateChange = true;
      }
      // console.log(player.currentTime(), player.playbackRate(), subtitle);
      var curr = parseInt(player.currentTime() * 1000);
      var len = subtitle.length;
      for (var index = 0; index < len; index++) {
        var sub = subtitle[index];
        if (curr < sub.endTime && curr > sub.startTime) {
          // console.log('> start', index)
          endRateChange = false;
          if (!startRateChange) {
            player.playbackRate(playbackRateNormal);
            rateEle.html(rateText + playbackRateNormal);
            startRateChange = true;
          }
          break;
        } else if (curr > sub.endTime &&
          subtitle[index + 1] && curr < subtitle[index + 1].startTime) {
          // console.log('> end', index)
          startRateChange = false;
          if (!endRateChange) {
            player.playbackRate(playbackRateBig);
            rateEle.html(rateText + playbackRateBig);
            endRateChange = true;
          }
          break;
        } else if (curr > sub.endTime) {
          continue;
        } else {
          break;
        }
        // console.log('yep, not enter it!');
      }
    }
  });

  $('#playlist').html(items.map((item, index) => {
    // console.log(item.info.subtitle);
    return `<div class="item" index="${index}">
      <p>${item.info.subtitle ? `<b class="subtitle">S</b>` : ''}${item.info.title}</p>
      <p>${item.info.description}</p>
    </div>`
  })).delegate('.item', 'click', function () {
    var index = $(this).attr('index');
    subtitle = items[index].info.subtitle;
    player.src(items[index].source);
    player.dock(items[index].info);
    player.play();
    $(this).addClass('playing').siblings().removeClass('playing');
  });
}

