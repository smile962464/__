/**
 *  批量 拷贝 - 重命名 文件
 */
var fs = require('fs-extra')
var path = require('path')

var srcDir = './ori';
var destDir = './dist';
var fileExt = '.jpg';
var nums = 10;  // the number of copy file amount

// filter file from dir
var ori = fs.readdirSync(srcDir).filter(function (fname) { return path.extname(fname) === fileExt });

fs.emptyDirSync(destDir);

// copy and rename file
ori.forEach(function (fname) {
  for (var index = 0; index < nums; index++) {
    var copyName = path.basename(fname, fileExt) + '_copy_' + index + fileExt;
    fs.copySync(path.join(srcDir, fname), path.join(destDir, copyName));
  }
});

