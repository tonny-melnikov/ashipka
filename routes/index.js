const express           = require('express');
const router            = express.Router();
const MainController    = require('../controllers/MainController');
const authentication    = require('../authentication');
const utils             = require('../utils');

router.get('/', MainController.home.get);
router.get('/login', MainController.login.get);
router.post('/login', utils.captcha, MainController.login.post);
router.get('/logout', MainController.logout.get);

module.exports = router;
