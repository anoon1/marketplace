let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const https = require('https');
const fs = require('fs');

const bodyParser = require('body-parser');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const options = {
  key: fs.readFileSync('/etc/apache2/ssl/private.key'),
  cert: fs.readFileSync('/etc/apache2/ssl/STAR_brstdev_com.crt'),
};

const server = https.createServer(options, app);

server.listen(6077, () => {
  console.log('Server is running on port 6077 over HTTPS');
});


module.exports = app;
