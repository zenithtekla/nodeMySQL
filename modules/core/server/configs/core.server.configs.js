'use strict';
var config  = require('./core.config.json'),
    path    = require('path');

/* CONFIGURATE COREmodule */
module.exports = function(app, modules, module, module_path){
  var root      = '/' + module,
      routes    = path.join(module_path, 'server', 'routes', module + '.server.routes'),
      view_path = path.join(module_path,'client', 'views'),
      // routes    = module_path+ '/server/routes/'+ module + '.server.routes',
      // view_path = module_path+'/client/views/',
      // default template engine
      view_engine = 'pug';

  if (module.re('core')){
    root        = config.root || root;
    routes      = config.routes || routes;
    view_path   = config.views || view_path;
    view_engine = config.view_engine || view_engine;
  }
  
  
  // app.use(root, require(routes));
  modules[module] = {
    view_path: view_path,
    router: {root: root, routes: routes},
    view_engine: view_engine
  };
};