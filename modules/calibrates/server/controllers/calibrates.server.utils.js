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
    var input  = { desc: req.body.desc };
    ECMS_Location.createRecord({
      newRecord: input,
      onError: (err)=>console.log(err),
      onSuccess: (record) => {
        EquipmentRecord(req.body, res, record.dataValues);
      }
    });
  }

  function EquipmentRecord(req, res, record){
    var equip = {
      location_id: record.id
    };

    switch (env) {
    	case 'seed':
        EquipmentSeed(equip, record.desc);
    		break;
      case 'production':
      case 'development':
      case 'test':
        equip.model = req.model;
        equip.asset_number = req.asset_number;
        break;
    	default:
    		break;
    }

    console.log(equip, env);
    create_equipment(req, res, equip);
  }

  function create_equipment(req, res, record){
    ECMS_Equipment.createRecord({
      newRecord: record,
      onError: (err)=>console.log(err),
      onSuccess:(record)=>{
        console.log(record.dataValues);
        create_ECMS_attrs_entry(req, res, record.dataValues);
      }
    });
  }

  function create_ECMS_attrs_entry(req, res, record){
    ECMS_Attribute.createRecord({
      newRecord: {
        asset_number: record.asset_number,
        last_cal: new Date(req.last_cal || '2012/08/22'),
        next_cal: new Date(req.next_cal || '2013/08/22')
      },
      onError: (err)=>console.log(err),
      onSuccess: (record) =>{
        if (env !=='seed')
          res.json(record.dataValues);
        return null;
      }
    });
  }

  function EquipmentSeed(equip, desc) {
    switch (desc) {
      case 'labroom':
        equip.model = 'brts' + Math.floor(Math.random()*2999).toString();
        equip.asset_number= Math.floor(Math.random()*2999);
        break;
      case 'production':
        equip.model = 'brts'+ Math.floor(Math.random()*2999).toString();
        equip.asset_number= Math.floor(Math.random()*2999);
        break;
      default:
        break;
    }
  }

  return utils;
};
