'use strict';

/* utility method */
module.exports  = function(db, env) {
  var chalk = require('chalk'),
      log   = require('chalk-log'),
      _     = require('lodash'),
    ECMS_Equipment  = db.ECMS_Equipment,
    ECMS_Attribute  = db.ECMS_Attribute,
    ECMS_Location   = db.ECMS_Location;

  var utils = {
    createLocation: function(req, res, next){
      create_location(req, res, next);
    }
  };

  function create_location(req, res, next){
    var inputs = req.body,
        input  = { desc: inputs.desc };
    ECMS_Location.createRecord({
      newRecord: input,
      onError: (err)=>console.log(err),
      onSuccess: (record) => {
        EquipmentRecord(inputs, res, record.dataValues);
      }
    });
  }

  function EquipmentRecord(inputs, res, record){
    var equip = {
      location_id: record.id
    };
    log.ok(env);
    switch (env) {
    	case 'seed':
        EquipmentSeed(equip, record.desc);
    		break;
      case 'production':
      case 'development':
      case 'test':
        equip.model = inputs.model;
        equip.asset_number = inputs.asset_number;
        break;
    	default:
    		break;
    }

    console.log(equip, env);
    create_equipment(inputs, res, equip);
  }

  function create_equipment(inputs, res, record){
    ECMS_Equipment.createRecord({
      newRecord: record,
      onError: (err)=>console.log(err),
      onSuccess:(record)=>{
        console.log(record.dataValues);
        create_ECMS_attrs_entry(inputs, res, record.dataValues);
      }
    });
  }

  function create_ECMS_attrs_entry(inputs, res, record){
    console.log(record.asset_number, inputs);
    ECMS_Attribute.createRecord({
      newRecord: {
        asset_number:inputs.asset_number,
        last_cal: new Date(inputs.last_cal || '2012/08/22'),
        next_cal: new Date(inputs.next_cal || '2013/08/22')
      },
      onError: (err)=>console.log(err),
      onSuccess: (record) =>res.json(record.dataValues)
    });
  }

  function EquipmentSeed(equip, desc) {
    switch (desc) {
      case 'labroom':
        equip.model = 'brts32';
        equip.asset_number= '3';
        break;
      case 'production':
        equip.model = 'brts33';
        equip.asset_number= '4';
        break;
      default:
        break;
    }
  }

  return utils;
};
