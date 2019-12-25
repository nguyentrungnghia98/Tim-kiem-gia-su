var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const bodyParser = require('body-parser');
//const mongoose = require('mongoose');

const passport = require('passport');

const indexRouter = require('./routes/index');
const userAdmin = require('./routes/user-admin');
const profile = require('./routes/profile');
const tagskill = require('./routes/tagskills');
const user = require('./routes/user');
const contract = require('./routes/contract');
const receipt = require('./routes/receipt');

require('./middleware/passport');

var app = express();


app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userAdmin);
app.use('/profile', passport.authenticate('jwt',{session:false}), profile);
app.use('/tag-skill', passport.authenticate('jwt',{session:false}), tagskill);
app.use('/list-users', passport.authenticate('jwt',{session:false}), user);
app.use('/contracts', passport.authenticate('jwt',{session:false}), contract);
app.use('/receipt', passport.authenticate('jwt',{session:false}), receipt);

// Tạo kết nối tới database
require('./utils/db.connection');

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
