'use strict';

var config = require('./core.config.json'),
    path = require('path'),
    global_config = require(process.cwd() + '/config/config');

/* CONFIGURATE COREmodule */
module.exports = function (app, modules, module, module_path) {
  var routes = path.join(module_path, 'server', 'routes', module + '.server.routes'),
      view_path = path.join(module_path, 'client', 'views'),
      view_engine = global_config.default_template_engine,
      override = false;

  if (!module.re('core')) {
    try {
      config = require(path.join(module_path, 'server', 'configs', 'module.config.json'));
      override = true;
    } catch (ex) {
      handleErr(ex);
    }
  }

  if (module.re('core') || override) {
    routes = config.routes || routes;
    view_path = config.views || view_path;
    view_engine = config.view_engine || view_engine;
  }

  modules[module] = {
    view_path: view_path,
    routes: routes,
    view_engine: view_engine
  };

  function handleErr(ex) {
    if (ex instanceof Error && ex.code === "MODULE_NOT_FOUND") console.log(module + "[module.config.json] not found - Use default settings!");else throw ex;
  }
};

//# sourceMappingURL=core.server.configs-compiled.js.map