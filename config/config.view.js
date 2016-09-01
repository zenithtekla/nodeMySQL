'use strict';

var config  = require('./config'),
    _       = require('lodash'),
    utils   = require('./assets/utils'),
    path    = require('path');

module.exports  = function(app){
  // view engine setup ==============
  var loaded = [];

  _.each(config.modules, function(module){
    var module_path = path.join(process.cwd(), 'modules', module),
      module_sub  = utils.getDirectories(module_path);

    _.each(module_sub, function(sub){
      var module_subpath = path.join(module_path, sub);

      var module_subchild = utils.getDirectories(module_subpath);

      if(sub.re("server")){
        if (module_subchild.indexOf("routes") > 0) {
          loaded.push(module);
          require(path.join(process.cwd(), 'modules/core/server/configs', 'core.server.configs'))(app, module, module_path);
        }
      }
    });
  });

  JSON.stringify(loaded).chalk('yellow');
};