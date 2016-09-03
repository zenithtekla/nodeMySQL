'use strict';
var config  = require('./core.config.json'),
    path    = require('path'),
    global_config = require(process.cwd() + '/config/config');

/* CONFIGURATE COREmodule */
module.exports = function(app, moduls, modul, module_path){
  var routes      = path.join(module_path, 'server', 'routes', modul + '.server.routes'),
      view_path   = path.join(module_path,'client', 'views'),
      root        = '',
      view_engine = global_config.default_template_engine,
      express     = require('express'),
      override    = false;

  if (!modul.re('core')) {
    try {
      config  = require(path.join(module_path, 'server', 'configs', 'module.config.json'));
      override = true;
    } catch (ex) {
      handleErr(ex);
    }
  }

  if (modul.re('core') || override) {
    root        = config.root || root;
    routes      = config.routes || routes;
    view_path   = config.views || view_path;
    view_engine = config.view_engine || view_engine;
  }

  if (modul.re('core')){
    register(app);
  } else {
    moduls[modul] = express();
    var sub = moduls[modul];
    register(sub);
    app.use('/' + modul, sub);
  }

  function handleErr(ex){
    if (ex instanceof Error && ex.code === "MODULE_NOT_FOUND")
      console.log(modul + "[module.config.json] not found - Use default settings!");
    else
      throw ex;
  }

  function register(app){
    app.set('root', root);
    app.set('module_name', modul);

    require(routes)(app);

    /* swig & handlebars require engine to be declared
     app.engine('html', swig.renderFile);
     */
    if (view_engine.re('pug') || view_engine.re('hjs')){
      app.set('views', view_path);
      app.set('view engine', view_engine);
    }

    // 'pug', 'hjs' work right out of the box

    // for angularJS : it is best to use 'pug', 'ejs' or 'html' template defined in module.config.json

    if (view_engine.re('ejs') || view_engine.re('html')) {
       app.engine('html', require('ejs').renderFile);
       app.set('views', view_path);
       app.set('view engine', 'html');
    }
    // for swig, the following should work.
    if (view_engine.re('swig')) {
      var swig = require('swig');
      swig = new swig.Swig();
      app.engine('html', swig.renderFile);
      app.set('views', view_path);
      app.set('view engine', 'html');
    }

    if (view_engine.re('nunjucks')) {
      var nunjucks = require('nunjucks');
      nunjucks.configure('views' , {
        autoescape: true ,
        express: app
      });
    }

    if (view_engine.re('handlebars')) {
      var exphbs  = require('express-handlebars');
      app.engine('handlebars', exphbs({defaultLayout: 'main'}));
      app.set('views', view_path);
      app.set('view engine', view_engine);
    }
  }
};