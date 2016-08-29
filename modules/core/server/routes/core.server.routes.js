'use strict';
var controller  = require('../controllers/core.server.controllers');

module.exports = function(app){
  app.get('/home', controller.home)
    .get('/', controller.home);
};