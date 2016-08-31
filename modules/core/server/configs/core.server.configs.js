'use strict';
var config  = require('./core.config.json'),
    path    = require('path'),
    global_config = require(process.cwd() + '/config/config');

/* CONFIGURATE COREmodule */
module.exports = function(app, modules, module, module_path){
  var routes      = path.join(module_path, 'server', 'routes', module + '.server.routes'),
      view_path   = path.join(module_path,'client', 'views'),
      root        = '',
      view_engine = global_config.default_template_engine,
      express     = require('express'),
      override    = false;

  if (!module.re('core')) {
    try {
      config  = require(path.join(module_path, 'server', 'configs', 'module.config.json'));
      override = true;
    } catch (ex) {
      handleErr(ex);
    }
  }

  if (module.re('core') || override) {
    root        = config.root || root;
    routes      = config.routes || routes;
    view_path   = config.views || view_path;
    view_engine = config.view_engine || view_engine;
  }

  if (module.re('core')){
    register(app);
  } else {
    var sub = express();
    register(sub);
    app.use('/' + module, sub);
  }

  function handleErr(ex){
    if (ex instanceof Error && ex.code === "MODULE_NOT_FOUND")
      console.log(module + "[module.config.json] not found - Use default settings!");
    else
      throw ex;
  }

  function register(app){
    app.set('root', root);
    app.set('module_name', module);

    require(routes)(app);

    /* swig & handlebars require engine to be declared
     app.engine('html', swig.renderFile);
     */
    app.set('views', view_path);
    app.set('view engine', view_engine);
  }
};