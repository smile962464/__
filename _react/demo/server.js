/*eslint-disable no-console */
var fs = require('fs')
var path = require('path')
var express = require('express')
var rewrite = require('express-urlrewrite')
var directory = require('serve-index');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpack = require('webpack')
var WebpackConfig = require('./webpack.config')
WebpackConfig.entry = require('./scripts/getEntry');

var app = express()
app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/dist/',
  stats: {
    colors: true
  }
}))

var fs = require('fs')
var path = require('path')

function makeTpl(file) {
  return `<!doctype html>
  <html>
  <head>
    <title></title>
  </head>
  <body>
    <div id="example"/>
    <script src="/dist/shared.js"></script>
    <script src="/dist/${file}.js"></script>
  </body>
  </html>
  `
}

var _dir = path.join(__dirname, './src');

fs.readdirSync(_dir).forEach(function (file) {
  var st = fs.statSync(path.join(_dir, file))
  if (st.isDirectory()) {
    // app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
    app.get('/' + file, function(req, res) {
      res.send(makeTpl(file))
    })
  }
})

app.use(express.static(_dir))
app.use(directory(_dir));

app.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
