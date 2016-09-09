'use strict';
var utils     = require('../assets/utils'),
    log       = utils.log,
    mongoose  = require('mongoose'),
    mongoURI    = require('../db/mongo_config').url;

/* SYNC */
module.exports  = function(app) {
  var models = app.get('models');

  models.sequelize.sync({force: true, logging: console.log}).then(function (task) {
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

 /* mongoose.Promise = global.Promise;
  mongoose.connect(mongoURI, function (err, db) {
    if (!err) {
      console.log('Connection established to', mongoURI);
    }
    else console.dir('Unable to connect to the database Server', err);
  });*/
  // var productModel = mongoose.model('Product', {product: String, description: String});
  // var product = new productModel ({product: 'Toshiba', description: 'quality build'} );
  // var user = mongoose.model(User);
};