'use strict';


/* CONFIGURATE RUN ENV */
module.exports = function(app){
    var config = require('./config'), 
        _      = require('underscore'),
        path   = require('path'),
        util  = require('./assets/util');

    // view engine setup ==============
    var modules = {}, view_paths = [];

    _.each(config.modules, function(module){
      var module_path = path.join(process.cwd(), 'modules', module),
          module_sub = util.getDirectories(module_path);

      modules[module] = {};

      _.each(module_sub, function(sub){
        modules[module][sub] = {};
        var module_subpath = path.join(module_path, sub);

        var module_subchild = util.getDirectories(module_subpath);
        console.log(module_subchild);
        if (module_subchild.indexOf("configs") > -1)
          require(path.join(module_subpath, 'configs', module + '.server.configs'))(app, modules, module, module_path);

        /*_.each(module_subchild, function(child){
          var module_subchild_path = path.join(module_subpath, child);
          modules[module][sub][child] = util.getFiles(module_subchild_path);
          // console.log(modules[module][sub][child]);

          if(child.re("routes"))
            app.use('/' + module, require(path.join(module_subchild_path, module + '.server.routes')));

          if(child.re("views")) {
            // view_paths.push(module_subchild_path);
            var view_path = module_subchild_path;
          }
        });*/
      });
    });
    /*console.log(view_paths);
    app.set('views', view_paths);
    app.set('view engine', 'pug');*/
    // =================================

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

        /*var equipmentTask = models.ECMS_Equipment.bulkCreate([{
          id: 5,
          asset_number: 'asset05',
          location_id: 'geoLocation05',
          model: 'someModel',
          status: 2
        },{
          id: 6,
          asset_number: 'asset06',
          location_id: 'geoLocation06',
          model: 'someModel',
          status: 1
        }]);*/

        models.sequelize.sync({ /*force: true, logging: console.log*/ }).then(function (task) {
            // console.log(arguments);
/*          var server = app.listen(app.get('port'), function() {
                debug('Express server listening on port ' + server.address().port);
            });*/

            /*creTask.then(function (task) {
                task.save();
            });*/
        });
    }

    if (app.get('env') === 'production') {
    }

    if (app.get('env') === 'test') {
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