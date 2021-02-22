var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
var logger = require('morgan');
var cors = require("cors");
var mongoSanitize = require("express-mongo-sanitize");

var indexRouter = require('./routes/index');
var webv1Router = require('./routes/webv1');

var app = express();
// view engine setup
app.use(cors());
app.use(mongoSanitize());
app.use(expressLayouts);
app.use(express.json({ limit: '20kb' }));
app.set('layout', './layouts/layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));

app.use('/', indexRouter);
app.use('/webv1', webv1Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
