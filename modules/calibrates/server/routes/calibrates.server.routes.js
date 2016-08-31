/*router.route('/calibrate/:calibrate')
  .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(controller.calibrate)
  .put(function(req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post(controller.postCalibrate)
  .delete(function(req, res, next) {
    next(new Error('not implemented')); // res.redirect('/');
  });

router.route('/equipment/:equipment')
  .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(controller.equipment)
  .put(function(req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post(controller.postEquipment)
  .delete(function(req, res, next) {
    next(new Error('not implemented'));
  });

router.route('/record/:record')
  .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(controller.record)
  .put(function(req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post(controller.postRecord)
  .delete(function(req, res, next) {
    next(new Error('not implemented'));
  });*/



module.exports = function(app){
  // root definition is optional
  var root = app.get('root');

  var module_name = app.get('module_name');
  var controller  = require('../controllers/' + module_name + '.server.controllers');
  
  app.get('/equipment', controller.createEquipment)
    .get('/table_equipment', controller.equipment)
    .get('/table_main', controller.main)
    .get('/table_location', controller.location);

  // app.post('/upload', auth.isAuthenticated(), controller.upload);
};