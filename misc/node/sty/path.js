
var path = require('path');

console.log(path.resolve(path.normalize('./' + path.normalize('/'))));
console.log(path.normalize('/foo/bar//baz/asdf/quux/a..'));
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));
console.log(path.join('foo', {}, 'bar'));
console.log(path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile'));
console.log(path.resolve('/foo/bar', './baz'));
console.log(path.resolve('/foo/bar', '/tmp/file/'));
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));
console.log(path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'));
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));
console.log(path.dirname('/foo/bar/baz/asdf/quux'));
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));
console.log(path.extname('index.html'));
console.log(path.extname('index.'));
console.log('foo\\bar\\baz'.split(path.sep));
console.log(path.normalize('../'));
console.log(path.normalize('/'));


// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});