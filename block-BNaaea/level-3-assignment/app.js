var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var session = require('express-session')
var MongoStore = require('connect-mongo')
var flash = require('connect-flash')

require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var adminRouter = require('./routes/admin');
var clientRouter = require('./routes/client')

// connecting DAtabase
mongoose.connect('mongodb://localhost/level-3', {useNewUrlParser : true, useUnifiedTopology : true}, (err) => {
  console.log(err ? err : "Connected to Database")
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connection Session
app.use(session({
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : false,
  store  : MongoStore.create({mongoUrl : 'mongodb://localhost/level-3'})
}))

app.use(flash())

app.use('/home', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/admin', adminRouter);
app.use('/client', clientRouter)



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

module.exports = app;