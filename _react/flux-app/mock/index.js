
function mock(req, res) {
  res.json({
    req: req.params
  })
}

module.exports = {
  'GET /users/:id?': mock,
  'GET /users/:id?/photos': mock,
  'GET /users/:id?/photos/:file?': mock,
  'POST /users/:id?/photos/:file?': {stat: 'ok'},
  'PUT /users/:id?/photos/:file?': {stat: 'ok'},
  'DELETE /users/:id?/photos/:file?': {stat: 'ok'}
}
