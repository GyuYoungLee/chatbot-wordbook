const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/quizes');
const connect = require('./schemas');

connect();
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/quizes', usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
