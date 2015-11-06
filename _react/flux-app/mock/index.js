
function mock(req, res) {
  res.json({
    req: req.params
  })
}

module.exports = {
  'GET /tests/:id': mock,
  'GET /tests/:id/attr': mock,
  'GET /tests/:id/attr/:sub': mock,
  'POST /tests/:id/attr/:sub': {stat: 'ok'},
  'PUT /tests/:id/attr/:sub': {stat: 'ok'},
  'DELETE /tests/:id/attr/:sub': {stat: 'ok'}
}
