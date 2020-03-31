const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./api/routes/index');
const usersRouter = require('./api/routes/users');
const profileRouter = require('./api/routes/profile');
const uploadRouter = require('./api/routes/uploader');
const multiRouter = require('./api/routes/multiUpload');


//middleware


app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());



app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/uploader', uploadRouter);
app.use('/api/multiUpload', multiRouter);

app.use(function (err, req, res, next) {
  if(err.code === "LIMIT_FILE_TYPES"){
    res.status(422).json({
      error:"Only Images are allowed"
    });
    return;
  }
  if(err.code === "LIMIT_FILE_SIZE"){
    res.status(422).json({
      error:'file is too large dont exceed 200kb'
    });
  }


});


app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err :{};
  const status = err.status || 500;


//respond to client
  res.status(status).json({
    error:{
      message:error.message
    }
  });

//respond to ourselves
  console.error(err);

});

app.use(express.static(__dirname + '/dist/'));
//handle SPA
app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'));


module.exports = app;
