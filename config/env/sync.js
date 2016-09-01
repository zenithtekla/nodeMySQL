'use strict';
var utils   = require('../assets/utils'),
    log     = utils.log;

/* SYNC */
module.exports  = function(app) {
  var models = app.get('models');

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
};