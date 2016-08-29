'use strict';
var path = require('path');

/* CONFIGURATE module */
module.exports = function(app, modules, module, module_path){
  var root        = '/'+module,
      routes      = path.join(module_path, 'server', 'routes', module + '.server.routes'),
      view_path   = path.join(module_path,'client', 'views'),
      view_engine = 'pug';
  
  try {
    var config  = require('./app.config.json');
    root        = config.root || root;
    routes      = config.routes || routes;
    view_path   = config.views || view_path;
    view_engine = config.view_engine || view_engine;
  } catch (ex) {
    handleErr(ex);
  }

  modules[module] = {
    view_path: view_path,
    router: {root: root, routes: routes},
    view_engine: view_engine
  };

  function handleErr(ex){
    if (ex instanceof Error && ex.code === "MODULE_NOT_FOUND")
      console.log("Undefined app.config.json - Use default settings!");
    else
      throw ex;
  }
};