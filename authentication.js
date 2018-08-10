const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

try {
  var jsondb        = require('./configg.json');
} catch (e) {
  console.log(e);
}

passport.serializeUser((user, callback) => {
  callback( null, user );
});

passport.deserializeUser((user, callback) => {
  callback( null, user );
});

// passport.use(new LocalStrategy({ usernameField: 'email' },
passport.use(new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password',
  },
  (email, password, done) => {
    const { users } = jsondb;
      const filtred = users.filter( ( x ) => x.username === username );

      if ( filtred.length === 1 ) {
          const user = filtred[ 0 ];

          if ( user.password !== password ) {
              return callback( null, false );
          }
          return callback( null, user );
      }
      return callback( null, false );
}));

exports.isAuthenticated = (req, res, next) => {
// console.log('> isAuthenticated');
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('info', 'Вы должны войти на сайт прежде чем делать что-то...');
  return res.redirect('/login');
};
