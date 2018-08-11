const passport  = require('passport');

exports.home = {
  get: (req, res) => {
    const ops = {
      h1: 'Главная страница сайта',
      title: 'Сайт, для настоящих джедаев!',
      description:
      'Нам нужно много инструментов, нам нужно много возможностей. Завтра мы будем ещё лучше!',
      // script: '/javascripts/main.js'
    };

    res.render( 'index', ops );
  },
};

exports.login = {
  get: (req, res) => {
    if (req.user) return res.redirect('/dash');
    const ops = {
    "h1": "Войти на сайт",
    "title": "Вход на сайт",
    "description":
"Кому нех тут делать, тому нех тут делать. И не надо сюда тыкать, а то оторвёт пальцы!",
    "recapcha": true
  };

    return res.render( "login", ops );
  },
  post: (req, res, next) =>{
    if (req.user) return res.redirect('/dash');
    return passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        req.flash('primary', info);
        return res.redirect('/login');
      }

      return req.logIn(user, (err) => {
        if (err) return next(err);

        req.flash('success', 'Превед! Вы успешно вошли =)');
        // https://github.com/jaredhanson/passport/issues/401
        // https://github.com/jaredhanson/passport/issues/306
        return req.session.save(() => res.redirect('/dash'));
      });
    })(req, res, next);
  }
}

exports.logout = {
  get: (req, res, next) => {
    if (!req.user) return next();
    req.logout();
    delete req.session.user;
    req.flash('primary', 'Вы вышли. Пока!');
    return res.redirect('/');
  },
}
