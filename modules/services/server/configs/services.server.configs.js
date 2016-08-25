'use strict';

/* CONFIGURATE module */
module.exports = function(app, module, module_path){
  app.use('/'+module, require('../routes/'+ module + '.server.routes'));
  app.set('views', module_path +'/client/views/');
  app.set('view engine', 'pug');
};