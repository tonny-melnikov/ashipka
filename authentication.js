const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

try {
  var jsondb        = require('./configg.json');
} catch (e) {
  console.log(e);
}

passport.serializeUser((user, done) => {
  done( null, user );
});

passport.deserializeUser((user, done) => {
  done( null, user );
});

// passport.use(new LocalStrategy({ usernameField: 'email' },
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    const { users } = jsondb;
      const filtred = users.filter( ( x ) => x.username === username );

      if ( filtred.length === 1 ) {
          const user = filtred[ 0 ];

          if ( user.password !== password ) {
              return done( null, false );
          }
          return done( null, user );
      }
      return done( null, false );
}));

exports.isAuthenticated = (req, res, next) => {
// console.log('> isAuthenticated');
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('info', 'Вы должны войти на сайт прежде чем делать что-то...');
  return res.redirect('/login');
};
