'use strict';

/* CONFIGURATE RUN ENV */

module.exports = function (app) {
    var route = require('koa-route'),
        parse = require('co-body'),
        config = require('./config'),
        _ = require('lodash'),
        path = require('path'),
        util = require('./assets/util'),
        log = util.log;

    // view engine setup ==============
    var modules = {},
        loaded = [],
        views = [],
        view_engines = [];

    _.each(config.modules, function (module) {
        var module_path = path.join(process.cwd(), 'modules', module),
            module_sub = util.getDirectories(module_path);

        _.each(module_sub, function (sub) {
            var module_subpath = path.join(module_path, sub);

            var module_subchild = util.getDirectories(module_subpath);

            if (sub.re("server")) {

                modules[module] = {};

                if (module_subchild.indexOf("routes") > -1) {
                    loaded.push(module);
                    require(path.join(process.cwd(), 'modules/core/server/configs', 'core.koa.configs'))(app, modules, module, module_path);
                }
            }
        });
    });

    // =================================
    console.log("=================================================");

    console.log('content loaded: ', loaded);

    // resolve 304 status code

    /// error handlers
    // development error handler
    // will print stacktrace

    /*
    // if-none-match header vs disable('etag'), pages status seems going well with etag disabling
    app.use(function(req, res, next) {
      req.headers['if-none-match'] = 'no-match-for-this';
      next();
    });*/

    'NODE_ENV = development'.chalk('green');
    JSON.stringify(loaded).chalk('yellow');
    var models = require(process.cwd() + '/modules/core/server/models');

    // Some DATA-PRESET (pre-insert), e.g. add to assembly table
    /*var buildTask = models.Assembly.create({
      customer_id: 6,
      number:'assy_02',
      revision: 'rev_02',
      unique_key: '_37R0KNO5B'
    }, {
      validate: true,
      ignoreDuplicates: true
    });*/
    /*
     var buildTask = models.Assembly.build({
       customer_id: 6,
       number:'assy_02',
       revision: 'rev_02',
       unique_key: '_37R0KNO5B'
       });
        var creTask = models.Assembly.create({
          customer_id: 6,
          number:'assy_02',
          revision: 'rev_02',
          unique_key: '_37R0KNO5B'
      }).then(function(insertedAssembly){
        console.log(insertedAssembly.dataValues);
      });;*/

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
    }], {
      // validate: true,
      ignoreDuplicates: true
    });*/

    models.sequelize.sync({/*force: true, logging: console.log*/}).then(function (task) {
        log.ok('database sync successful.');
        // buildTask.save();
        // console.log(arguments);
        /*          var server = app.listen(app.get('port'), function() {
                        debug('Express server listening on port ' + server.address().port);
                    });*/

        /*
        // validOne
        buildTask.save();
            buildTask.then(function (task) {
            task.save();
        });*/
    });

    return app;
};

//# sourceMappingURL=config.koa.server-compiled.js.map