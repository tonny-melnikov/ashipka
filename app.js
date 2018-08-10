const express      = require('express');
const path         = require('path');
const helmet       = require('helmet');
const favicon      = require('serve-favicon');
const session      = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const flash        = require('connect-flash');
const passport     = require('passport');

const config = require('./config');

var app = express();

app.use(helmet());

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'pug' );

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json());

app.use(session({
  name: 'ashipka',
  resave: true,
  saveUninitialized: false,
  secret: config.secret,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: 'auto',
  },
}));
app.use(cookieParser());

// passport needs to come after session initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.get('*', ( req, res, next ) => {
  if( req.isAuthenticated() ) {
      res.locals.imauth = true;
  } else {
      res.locals.imauth = false;
  }
  next();
});

app.get('*', ( req, res, next ) => {
  const messages = [];
  // primary success danger
  if (req.flash) {
    let FL = req.flash();
    if (Object.keys(FL).length) {
      for (let prop in FL) { // eslint-disable-line no-restricted-syntax
        if (Object.prototype.hasOwnProperty.call(FL, prop) && FL[prop].length) {
          for (let count = 0; count < FL[prop].length; count += 1) {
            messages.push({ type: prop, msg: FL[prop][count] });
          }
        }
      }
    }
  }

  if (messages) res.locals.fmessages = messages;
  next();
});

/* Routes */
const indexRouter = require('./routes/index');
const dashRouter = require('./routes/dash');

app.use('/', indexRouter);
app.use('/dash', dashRouter);

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
    let err = new Error('Not Found');
    err.status = 404;
    next( err );
});

app.set('trust proxy', 1);

// error handler
app.use( ( err, req, res, next ) => {

    const ops = {
        h1: 'Какая-то ошибка!',
        title: 'Страница не доступна (ошибка)',
        description: 'По каким-то причинам данная страница не доступна. Если вы считаете что это нужно исправить - уточните почему'
    };

    res.status( err.status || 500 );

    if( req.app.get('env') === 'development' ) {
      ops.message = err.message;
      ops.stack = err.stack;
      ops.status = err.status || 500;
      res.render('error-adm', ops );
    }else{
      res.render('error', ops );
    }
} );

module.exports = app;
