var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/.well-known/assetlinks.json', (req, res) => {
  JSON_DATE = {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.example.exe201_mobile",
      "sha256_cert_fingerprints":
        ["23:1B:AC:86:7B:80:44:9C:35:98:76:89:FC:BA:1D:E4:17:B0:9A:E4:D3:E0:55:FF:76:06:53:88:E4:C7:47:3A"]
    }
  };


  // Đặt kiểu nội dung là JSON
  res.setHeader('Content-Type', 'application/json');
  // hoặc sử dụng phương thức res.type()
  // res.type('application/json');

  // Trả về dữ liệu JSON
  res.json(JSON_DATE);
});

app.use('/', indexRouter);

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
