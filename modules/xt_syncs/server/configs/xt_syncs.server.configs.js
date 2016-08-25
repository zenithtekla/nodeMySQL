'use strict';
var config = require('./app.config.json');
/* CONFIGURATE module */
module.exports = function(app, modules, module, module_path){
  app.use('/'+module, require('../routes/'+ module + '.server.routes'));
  var view_path = config.views || module_path +'/client/views/';
  app.set('views', view_path);
  app.set('view engine', config.view_engine);
};