var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '一号' });
});

//demo
router.get('/demo', function (req, res) {
  res.render('demo', {title: '业务demo'})
})



module.exports = router;
