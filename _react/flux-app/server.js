#!/usr/bin/env node

var path = require('path')
var express = require('express')
var requireDirectory = require('require-dir')

var build = require('antd-build/lib/build')
// console.log(process.env.NODE_ENV === 'DEV');
var buildOpts = {
  watch: 200,
  debug: false
}
build(buildOpts)

startServer()

function startServer() {
  var server = express()
  server.use('/', express.static('./'))

  console.log('======= using mocker ========')

  var mockerObject = requireDirectory(path.join(process.cwd(), 'mock'))
  for (key in mockerObject) {
    var mocker = mockerObject[key]
    if (typeof mocker === 'function') {
      mocker(server)
    } else if (typeof mocker === 'object') {
      for (var route in mocker) {
        var method = 'all'
        var pathname = route
        if (route.split(' ').length === 2) {
          method = route.split(' ')[0].toLowerCase()
          pathname = route.split(' ')[1]
        }

        var handler = mocker[route]
        if (typeof handler === 'function') {
          server.route(pathname)[method](handler)
        } else {
          server.route(pathname)[method]((function(data){
            return function(_, res) {
              res.json(data)
            }
          })(handler))
        }
      }
    }
  }

  server.listen(8000)
  console.log('======= server at http://127.0.0.1:8000 ========')
}
