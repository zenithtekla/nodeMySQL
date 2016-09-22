'use strict';

var config  = require('./config'),
    _       = require('lodash'),
    utils   = require('./assets/utils'),
    path    = require('path');

module.exports  = function(app){
  // view engine setup ==============
  var loaded = [], moduls = [], apps = {};

  _.each(config.modules, function(modul){
    var module_path = path.resolve('modules/', modul),
      module_sub  = utils.getDirectories(module_path);

    _.each(module_sub, function(sub){
      var module_subpath = path.join(module_path, sub);

      var module_subchild = utils.getDirectories(module_subpath);

      if(sub.re("server")){
        if (module_subchild.indexOf("routes") > 0) {
          loaded.push(modul);
          require(path.resolve('modules/core/server/configs/', 'core.server.configs'))(app, moduls, modul, module_path);
        }
      }
    });
  });

  _.forOwn(moduls, function(val,key){
     apps[key] = val._router.stack;
  });

  app.set('apps', apps);

  JSON.stringify(loaded).chalk('yellow');
};