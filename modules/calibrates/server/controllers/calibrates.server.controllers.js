// load the models
// var models = require( process.cwd() + '/modules/core/server/models'),
//     ECMS_Equipment  = models.ECMS_Equipment;
var db              = require( process.cwd() + '/server').get('models'),
    env             = process.env.NODE_ENV || "development",
    utils           = require('./calibrates.server.utils')(db, env),
    chalk           = require('chalk'),
    moment          = require('moment'),
    ECMS_Equipment  = db.ECMS_Equipment,
    ECMS_Attribute  = db.ECMS_Attribute,
    ECMS_Location   = db.ECMS_Location;
    // ;

/* initial dumps from tables */
exports.equipment = (req, res, next) => {
  ECMS_Equipment.findAll().then(function(equipments){
    res.render('equipment', { equipments: equipments});
  });
};
exports.main = function (req, res, next) {
  ECMS_Attribute.findAll().then(function(mains){
    res.render('main', { mains: mains});
  });
};
exports.location = function (req, res, next) {
  ECMS_Location.findAll().then(function(locations){
    res.render('location', { locations: locations});
  });
};

/*
  Business logic
 */

exports.getEquipment = function(req,res, next) {
  utils.findAllMethod(req, res, next, function(records){
    res.render('calibrate', {env: env, moment: moment, calibrates: records});
  });
};

exports.getEquipmentBy = function(req,res, next) {
  utils.findAllMethod(req, res, next, function(result){
    res.json(result);
  });
};

exports.createModel = (req,res, next) => utils.createLocation(req, res, next);

exports.createEquipment = function(req,res,next){
   req.body.model = req.params.model;
   // SHOULD the location remain unchanged and unchangeable, add route /:model/?desc to set req.body.desc = req.params.desc;
   utils.createLocation(req, res, next);
};

exports.updateEquipment = function(req,res,next){
  utils.updateMethod(req, res, next);
};

exports.deleteEquipment = (req,res, next) => utils.deleteMethod(req,res,next);

exports.deleteModel = (req,res, next) => utils.deleteMethod(req,res,next);

/*
Un-used
 */

exports.calibrate = function (req, res, next) {
  // replace calibrates with logic, promise return.
  calibrates = {};
  // myPromise.doSomething().then(function(records){
  res.render('calibrate', { calibrates: calibrates});
  // });
};

exports.postEquipment = function (req, res, next) {
  Equipment.create(req.body,{
    fields:['model', 'asset_number', 'location_id']
  })
    .then(function (newEquipment) {
      console.log(newEquipment.dataValues);
    })
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