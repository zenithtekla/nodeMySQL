'use strict';
var controller  = require('../controllers/core.server.controllers');

module.exports = function(app){
  app.get('/home', controller.home)
    .get('/', controller.home)
    .get('/greet', controller.greet)
    .get('/chat', controller.chat)
    .get('/article', controller.article);

/*
  // Define error page
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/!*').get(core.renderNotFound);

  // Define application route
  app.route('/!*').get(core.renderIndex);*/
};