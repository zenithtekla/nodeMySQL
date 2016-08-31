// load the models
// var models = require( process.cwd() + '/modules/core/server/models'),
//     ECMS_Equipment  = models.ECMS_Equipment;
var db = require( process.cwd() + '/server').get('models'),
    cors   = require('cors'),
    ECMS_Equipment  = db.ECMS_Equipment,
    ECMS_Main       = db.ECMS_Main,
    ECMS_Location   = db.ECMS_Location;
    // ;

/* initial dumps from tables */
exports.equipment = (req, res) => {
  ECMS_Equipment.findAll().then(function(equipments){
    res.render('equipment', { equipments: equipments});
  });
};
exports.main = function (req, res) {
  ECMS_Main.findAll().then(function(mains){
    res.render('main', { mains: mains});
  });
};

exports.createEquipment = function (req, res) {
  ECMS_Equipment.create({
    asset_number: 'asset06',
    location_id: 'coordinates005-008',
    model: 'someModel1'
  }).then(function(new_equipment){
    res.json(new_equipment.assetNumber);
  });

};

exports.location = function (req, res) {
  ECMS_Location.findAll().then(function(locations){
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
  Record.findAll().then(function(records){
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