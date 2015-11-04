
var jsonServer = require('json-server')

// Express server
var server = jsonServer.create()

// Default middlewares (logger, public, cors)
server.use(jsonServer.defaults)

// Add other Express middlewares if needed (authentication, redirections, ...)
// ...

 // Express router
server.use(jsonServer.router('db.json'))

server.listen(3000)
console.log('server start on localhost:3000')