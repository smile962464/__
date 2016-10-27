// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(process.versions)

var path = require('path');
var fs = require('fs-extra');
var localPath = '/Users/hua/Downloads/_/';
var enumExts = ['mp4', 'mkv', 'ogg'];

var items = [];
fs.readdir(localPath, function (err, files) {
  files.forEach(fileDir => {
    var extname = path.extname(fileDir);
    var ext = extname && extname.substr(1);
    if (ext && enumExts.indexOf(ext) > -1) {
      const url =
      items.push({
        info: {
          title: fileDir,
          description: 'des...'
        },
        source: {
          src: 'http://localhost:9999/' + path.basename(fileDir),
          type: 'video/' + ext
        }
      });
    }
  })
  mkVideo()
})

function mkVideo() {
  console.log(items, window)
  var player = videojs('mvideo', {
    playbackRates: [0.5, 1, 1.5, 2, 2.5, 3, 3.5],
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
  $('#playlist').html(items.map((item, index) => {
    return `<div class="item" index="${index}">
      <p>${item.info.title}</p>
      <p>${item.info.description}</p>
    </div>`
  })).delegate('.item', 'click', function () {
    var index = $(this).attr('index');
    player.src(items[index].source);
    player.dock(items[index].info);
    player.play();
    $(this).addClass('playing').siblings().removeClass('playing');
  });
}

