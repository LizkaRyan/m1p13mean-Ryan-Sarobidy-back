var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');

const authMiddleware = require('./middlewares/authMiddleware');

var usersRouter = require('./routes/users-router');
var authRouter = require('./routes/auth-router');
var roomRouter = require('./routes/room-router');
var requestReservationRouter = require('./routes/requests-reservation-router');
var eventRouter = require('./routes/event-router');
var requestEventRouter = require('./routes/requests-event-router');
var reservationRouter = require('./routes/reservation-router');
var shopRouter = require('./routes/shop-router');
var productRouter = require('./routes/product-router');
var db = require('./config/db');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));
app.use('/auth', authRouter);
app.use(authMiddleware);

app.use('/users', usersRouter);

app.use('/rooms', roomRouter);
app.use('/requests-reservation', requestReservationRouter);
app.use('/events', eventRouter);
app.use('/requests-event', requestEventRouter);
app.use('/reservations', reservationRouter);
app.use('/shops', shopRouter);
app.use('/products', productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;
