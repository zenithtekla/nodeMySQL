'use strict';
var config = require('./app.config.json');
/* CONFIGURATE module */
module.exports = function(app, modules, module, module_path){
  /*
    See app.config.json for root & routes declaration. Tips:
    // leave null to invoke default setting
          OR declare a custom root route of the app
    // leave null to invoke default setting
          OR declare a custom routes.js file
  */
  var root    = config.root || '/'+module,
      routes  = config.routes || module + '.server.routes';
  
  app.use(root, require('../routes/'+ routes));

  var view_path = config.views || module_path +'/client/views/';
  app.set('views', view_path);
  app.set('view engine', config.view_engine);
};