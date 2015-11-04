var http = require('http');
var url = require('url');
var debug = require('debug')('http');

debug('booting %s', 'Debug example');

http.createServer(function (req, res) {
  debug(req.method + ' ' + req.url);

  var path = url.parse(req.url).pathname;
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(path);
}).listen(7001, "127.0.0.1", function () {
  console.log('Server running at http://127.0.0.1:7001/');
});

