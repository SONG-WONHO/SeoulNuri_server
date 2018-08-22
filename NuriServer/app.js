const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');


const indexRouter = require('./routes/index');

const app = express();

app.use((req, res, next) => {
  res.r = (result) => {

      //result가 있을 때
      if (result) {
          res.json({
              status: 200,
              code: 200,
              message: "success",
              data: result
          });
      }

      //result가 없을 때
      else {
          res.json({
              status: 200,
              code: 200,
              message: "success"
          });
      }
  };
  next();
});

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware - logger
app.use(logger('dev'));
//middleware - body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//middleware - cookie-parser
app.use(cookieParser());
//middleware - static
app.use(express.static(path.join(__dirname, 'public')));

//유저검증모듈추가
app.use((req, res, next)=>{

    //적절한 유저 검증 절차 만들어주세요 :)

    //적절한 유저 검증 절치가 이뤄졌다면
    if (true) {
        req.user_idx = 1;
        next();
    }

    //적절하지 못한 유저 검증 절차라면
    else {
        next("10401");
    }
});

app.use('/', indexRouter);
// error handler
require('./errorHandeler')(app);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//middleware - error-handler
app.use((err, req, res, next) => {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  //render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
