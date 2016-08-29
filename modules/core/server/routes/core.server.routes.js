'use strict';
var express     = require('express'),
  router      = express.Router(),
  controller  = require('../controllers/core.server.controllers');

/* GET home page. */
router.get('/home', controller.home)
  .get('/', controller.home);

module.exports = router;