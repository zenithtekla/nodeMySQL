// load the models
var models = require( process.cwd() + '/modules/core/server/models'),
    cors   = require('cors');
/* initial dumps from tables */
exports.equipment = function (req, res) {
  models.ECMS_Equipment.findAll().then(function(equipments){
    res.render('equipment', { equipments: equipments});
  });
};
exports.main = function (req, res) {
  models.ECMS_Main.findAll().then(function(mains){
    res.render('main', { mains: mains});
  });
};
exports.location = function (req, res) {
  models.ECMS_Location.findAll().then(function(locations){
    res.render('location', { locations: locations});
  });
};

/* logic goes here */
exports.calibrate = function (req, res) {
  // replace calibrates with logic, promise return.
  calibrates = {};
  // myPromise.doSomething().then(function(records){
    res.render('calibrate', { calibrates: calibrates});
  // });
};

exports.record = function (req, res) {
  models.Record.findAll().then(function(records){
    res.render('record', { records: records});
  });
};

exports.postCalibrate = function (req, res) {

};
exports.postEquipment = function (req, res) {
  Equipment.create(req.body,{
    fields:['model', 'asset_number', 'location_id']
  })
    .then(function (newEquipment) {
      console.log(newEquipment.dataValues);
    })
};

exports.postRecord = function (req, res) {

};

/* cloned from exports.userByID */
exports.locationByID = function(req, res, next, id) {
  if (!id) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id).then(function(location) {
    if (!location) {
      return next(new Error('Failed to load location ' + id));
    } else {

      var data = {};

      data.id = location.id;
/*    data.firstName = location.firstName;
      data.lastName = location.lastName;
      data.displayName = location.displayName;
      data.email = location.email;
      data.locationname = location.locationname;
      data.roles = JSON.parse(location.roles);
      data.provider = location.provider;
      data.updatedAt = location.updatedAt;
      data.createdAt = location.createdAt;*/

      req.model = data;
      next();
      return null;
    }
  }).catch(function(err) {
    return next(err);
  });

};