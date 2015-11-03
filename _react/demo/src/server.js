/*eslint-disable no-console */
var express = require('express')
var rewrite = require('express-urlrewrite')
var directory = require('serve-index');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

var app = express()
app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/__build__/',
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
    <script src="/__build__/shared.js"></script>
    <script src="/__build__/${file}.js"></script>
  </body>
  </html>
  `
}

fs.readdirSync(__dirname).forEach(function (file) {
  var st = fs.statSync(path.join(__dirname, file))
  if (st.isDirectory()) {
    // app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
    app.get('/' + file, function(req, res) {
      res.send(makeTpl(file))
    })
  }
})

app.use(express.static(__dirname))
app.use(directory(__dirname));

app.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
