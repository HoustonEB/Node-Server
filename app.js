var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 访问静态资源
app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// WEBSOCKET SERVER
// const WebSocket = require('ws');
//
// const wss = new WebSocket.Server({port: 4000});
// const clientContactNum = [];
//
// wss.on('connection', ws => {
//     ws.on('message', message => {
//         let callbackMsg = JSON.parse(message);
//
//         wss.clients.forEach(client => {
//             clientContactNum.push(client);
//             // client !== ws 排除自己
//             if (client.readyState === WebSocket.OPEN) {
//                 if (client !== ws) {
//                     Object.assign(callbackMsg, {
//                         message:  'joined ' + callbackMsg.userName,
//                         status: 'New'
//                     });
//                 } else {
//                     Object.assign(callbackMsg, {
//                         message: callbackMsg.message,
//                         status: 'Old'
//                     });
//                 }
//                 console.log(callbackMsg, '--')
//                 client.send(JSON.stringify(callbackMsg));
//             }
//         });
//     });
// });

module.exports = app;
