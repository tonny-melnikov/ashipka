const express           = require('express');
const router            = express.Router();
const MainController    = require('../controllers/MainController');
const authentication    = require('../authentication');

router.get('/', MainController.home.get);

module.exports = router;
