const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const headlines = require('./api/headlines')
const userinput = require('./api/userinput')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello From Google News API'
  })
})

// app.use('/api/v1/headlines', headlines)

app.use('/api/v1/userinput', userinput)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  res.status(404);
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : {}
  });
});

module.exports = app;
