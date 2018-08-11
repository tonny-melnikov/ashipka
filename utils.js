const https = require('https');
const config = require('./config');

exports.captcha = (req, res, next) => {
  const recaptchaResp = req.body['g-recaptcha-response'];
  if ( recaptchaResp ) {
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${config.reCAPTCHA}&response=${recaptchaResp}&remoteip=${req.ip}`;

  https
    .get( verifyUrl, (resp) => {
      let data ='';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const google = JSON.parse( data );

        if (!google.success) {
          console.log('Recaptcha разгадана не верно!');
          res.redirect('back');
        } else {
          console.log( google );
          next();
        }
      });
    })
    .on('error', (err) => {
      console.log('Recaptcha ошибка соединения с google!');
      res.redirect('back');
    });
  } else {
    console.log('Recaptcha не введена!');
    res.redirect('back');
  }
};
