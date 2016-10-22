var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//mongo相关，没用上
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: settings.cookie_secret,
  cookie: {
    maxAge: 60000 * 20	//20 minutes
  },
  store: new MongoStore({
    db: settings.db
  }, function () {
    console.log('connect mongodb success...');
  })
}));

var flash = require('connect-flash');
app.use(flash());


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);



//新版本的express3以上就把ejs layout默认给取消
//var partials = require('express-partials');
//app.use(partials());

//类似于 express-partials ?
var engine = require('ejs-locals');
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

var ind = require('./routes/index');
var about = require('./routes/about');
var users = require('./routes/users');
app.use('/ind', ind);
app.use('/about', about);

//注意：app.use 和 app.get 别混淆
app.get('/', users.index);
app.get('/u/:user', users.user);
app.post('/post', users.post);
app.get('/reg', users.reg);
app.post('/reg', users.doReg);
app.get('/login', users.login);
app.post('/login', users.doLogin);
app.get('/logout', users.logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var server = app.listen(app.get('port'), function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})

module.exports = app;
