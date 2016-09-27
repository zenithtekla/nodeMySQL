// load the models
// var models = require( process.cwd() + '/modules/core/server/models'),
//     ECMS_Equipment  = models.ECMS_Equipment;
var db              = require( process.cwd() + '/server').get('models'),
    env             = process.env.NODE_ENV || "development",
    utils           = require('./calibrates.server.utils')(db, env),
    chalk           = require('chalk'),
    moment = require('moment'),
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

exports.getEquipment = function(req,res, next) {
  /*ECMS_Equipment.getList({
    cond: { include: [
      { model: ECMS_Attribute, attributes: ["last_cal", "schedule", "next_cal", "file"]},
      { model: ECMS_Location, attributes: ["desc"]}
    ]},
    onError: (err) => res.json({message: 'Unable to retrieve list of equipments', error:err}),
    onSuccess:(records) => {
      console.log(records);
    }
  })*/
  ECMS_Equipment.findAll({
    attributes: ["model", "asset_number", "location_id"],
    include: [
      { model: ECMS_Attribute, attributes: ["last_cal", "schedule", "next_cal", "file"]},
      { model: ECMS_Location, attributes: ["desc"]}
    ]
  }).then(function(records){
    // res.json(records);
    res.render('calibrate', {env: env, moment: moment, calibrates: records});
  })
};

exports.getEquipmentBy = function(req,res, next) {
  ECMS_Equipment.findAll({
    where: req.params,
    attributes: ["model", "asset_number", "location_id"],
    include: [
      { model: ECMS_Attribute, attributes: ["last_cal", "schedule", "next_cal", "file"]},
      { model: ECMS_Location, attributes: ["desc"]}
    ]
  }).then(function(result){
    res.json(result);
  })
};

exports.createEquipment = function (req, res, next) {
  // console.log(utils);
  utils.createLocation(req, res, next);
  /*create_location({desc:req.body.desc});

  function create_location(record){
    ECMS_Location.createRecord({
      newRecord: record,
      onError: (err)=>console.log(err),
      onSuccess: (record) => {
        return EquipmentRecord(record.dataValues);
      }
    });
  }

  function EquipmentRecord(record){
    var equip = {
      location_id: record.id,
      model: 'brts32',
      asset_number: 3
    };
    console.log(equip);
    create_equipment(equip);
  }

  function create_equipment(record){
    ECMS_Equipment.createRecord({
      newRecord: record,
      onError: (err)=>console.log(err),
      onSuccess:(record)=>{
        console.log(record.dataValues);
        create_ECMS_attrs_entry(record.dataValues);
      }
    });
  }

  function create_ECMS_attrs_entry(record){
    ECMS_Attribute.createRecord({
      newRecord: {
        asset_number:record.asset_number,
        last_cal: new Date(req.body.last_cal),
        next_cal: new Date(req.body.next_cal)
      },
      onError: (err)=>console.log(err),
      onSuccess: (record) =>res.json(record.dataValues)
    });
  }*/
};

exports.update = function(req,res,next){

};

/* logic goes here */
exports.calibrate = function (req, res, next) {
  // replace calibrates with logic, promise return.
  calibrates = {};
  // myPromise.doSomething().then(function(records){
    res.render('calibrate', { calibrates: calibrates});
  // });
};

exports.postCalibrate = function (req, res, next) {

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