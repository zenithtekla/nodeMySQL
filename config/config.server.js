'use strict';


/* CONFIGURATE RUN ENV */
module.exports = function(app){
    var config = require('./config'), 
        _      = require('underscore'),
        path   = require('path'),
        util  = require('./assets/util');

  // view engine setup ==============
    var modules = {}, view_paths = [], route_paths = [];
    _.each(config.modules, function(module){
      var module_path = path.join(process.cwd(), 'modules', module),
          module_sub = util.getDirectories(module_path);

      view_paths.push(path.join(module_path, 'client', 'views'));

      route_path = path.join(module_path, 'server', 'routes');
      route_paths.push(route_path);

      modules[module] = {};

      _.each(module_sub, function(sub){
        modules[module][sub] = {};
        var module_subpath = path.join(module_path, sub);

        var module_subchild = util.getDirectories(module_subpath);

        _.each(module_subchild, function(child){
          var module_subchild_path = path.join(module_subpath, child);
          modules[module][sub][child] = util.getFiles(module_subchild_path);
          // console.log(modules[module][sub][child]);
          if(child === "routes")
            app.use('/' + module, require(path.join(module_subpath, child, module + '.server.routes')));
        });
      });

     /* console.log('Katana');
      console.log(modules[module].server.routes);
*/
      /*modules[module] = {
        client: {},
        server: {
         route: []
        }
      };*/

    });
    app.set('views', view_paths);
    app.set('view engine', 'pug');

  // as for now, this will do:
  var route_path = config.routes.xtsyncs;
  // console.log('route_path: ', route_path);
  // console.log('base_path: ', config.base_path);

  // var display = require(path.join(process.cwd(), route_path, 'xt_syncs.server.routes'));
  // var display_w_crud = require('.' + process.cwd() + '/' + route_path + 'xt_syncs.server.simple.mysql');
  // var display_w_schema = require('./../' + route_path + 'xt_syncs.server.schema');

// register routes
//   app.use('/xt_syncs', display);
  // app.use('/xt_syncs/mysql', display_w_crud);
  // app.use('/xt_syncs/view3', display_w_schema);

  /*// register routes
  app.use('/'+ module, display);
  app.use('/'+ module +'/mysql', display_w_crud);
  app.use('/'+ module + '/view3', display_w_schema);*/

    /// error handlers
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });

        console.log('NODE_ENV = development');
        var models = require(process.cwd() + '/modules/core/server/models');

        // Some DATA-PRESET (pre-insert), e.g. add to assembly table
        /*var creTask = models.Assembly.create({
            customer_id: 6,
            number:'assy_02',
            revision: 'rev_02',
            unique_key: '_37R0KNO5B'
        });*/

        models.sequelize.sync().then(function (task) {
            // console.log(arguments);
/*          var server = app.listen(app.get('port'), function() {
                debug('Express server listening on port ' + server.address().port);
            });*/

            /*creTask.then(function (task) {
                task.save();
            });*/
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    return app;
};