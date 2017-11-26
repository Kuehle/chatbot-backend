var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket = require('socket.io');

var api = require('./routes/api');
var ai = require('./services/ai');

var app = express();
var io = socket();
app.io = io;

app.io.on('connection', (socket) => {
  console.log('user connected', socket.client.id);

  setTimeout(() => {sendBotMsg('Hallo, ich bin der Bot, wie kann ich helfen?')}, 1000)

  socket.on('disconnect', function(){
      console.log('user disconnected');
  });

  socket.on('message', (message) => {
      app.io.emit('message', {type:'new-message', text: message, client: socket.client.id.substr(-8)});
      ai.message(message).then((res) => sendBotMsg(res.entities.intent[0].value), (err) => console.log(err))    
  });
})

function sendBotMsg(msgText) {
  app.io.emit('message', {text: 'new-message', text: msgText, client: 'bot'})
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', api);

app.get('*', function(request, response) {
  response.sendfile(path.join(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
