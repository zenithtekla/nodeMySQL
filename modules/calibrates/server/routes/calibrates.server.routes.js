var express       = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/calibrates.server.controllers');


router.route('/calibrate/:calibrate')
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
    next(new Error('not implemented'));
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
  });

router.get('/table_equipment', controller.equipment)
  .get('/table_main', controller.main)
  .get('/table_location', controller.location);

module.exports = router;