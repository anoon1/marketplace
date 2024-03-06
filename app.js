let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const https = require('https');
const multer = require('multer');
const fs = require('fs');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
const socketIO = require('socket.io');

let app = express();
app.use(cors({
  origin: '*'
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images/uploads')));

app.use('/images/uploads', express.static(path.join(__dirname, 'public/images/uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
app.use(express.static(path.join(__dirname, '/frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend', 'index.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// error handler
app.use(function (err, req, res, next) {
  console.log('here')
  console.log('err ::::::::::::::', typeof err)
  console.log('err ::::::::::::::', err.message)

  if (err.message == 'Invalid file format. Only JPEG and PNG images are allowed.') {
    // Handle multer-specific errors
    let errors = {};
    errors.profileDoc = 'Invalid file format. Only JPEG, PDF, DOC and PNG images are allowed.'
    console.log('errors', errors)
    res.status(400).json({ error: errors });
  } else if (err.message == 'Invalid file format Only mp4, webm ,ogg ,mpeg and avi are allowed.') {
    // Handle multer-specific errors
    let errors = {};
    errors.mime = 'Invalid file format Only mp4, webm ,ogg ,mpeg and avi are allowed.'
    console.log('errors', errors)
    res.status(400).json({ error: errors });
  } else if (err.message == 'Invalid file format Only JPEG, PNG are allowed.') {
    // Handle multer-specific errors
    let errors = {};
    errors.profile = 'Invalid file format Only JPEG, PNG are allowed.'
    console.log('errors', errors)
    res.status(400).json({ error: errors });
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});


/*const options = {
  key: fs.readFileSync('/etc/apache2/ssl/private.key'),
  cert: fs.readFileSync('/etc/apache2/ssl/STAR_brstdev_com.crt'),
	};*/

//const server = https.createServer(options, app);
const server = https.createServer( app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("joinRoom", (data) => {
    socket.join(data);
  })
  //socket io for room group conversation

  socket.on('sendMessage', (data) => {
    console.log('data on server', data);
    socket.to(data.room).emit("recieveMessage", data)
  })
  // 
  //for one to one chat
  // socket.on('sendMessage', (data) => {
  //     console.log('data on server',data);
  //     socket.broadcast.emit("recieveMessage",data)
  // })

});

server.listen(6078, () => {
  console.log('Server is running on port 6077 over HTTPS');
});


module.exports = app;
