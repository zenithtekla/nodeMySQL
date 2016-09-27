'use strict';

/* CONFIGURATE after sync seed */
module.exports  = function(app) {
  var db = app.get('models') ,
    _ = require('lodash') ,
    Promise = require('bluebird') ,
    utils = require('../assets/utils');

  var ECMS_Location   = db.ECMS_Location,
    ECMS_Attribute   = db.ECMS_Attribute,
    ECMS_Equipment    = db.ECMS_Equipment;

  /*

   ECMS_Attribute.bulkCreate({
     records:[{
       asset_number: '1',
       last_cal:'2012/08/22',
       next_cal:'2013/08/22',
       schedule:'sth1'
     },{
       asset_number: '2',
       last_cal:'2012/08/22',
       next_cal:'2013/08/22',
       schedule:'sth2'
     }]
   });

   */

  /*

   ECMS_Location.bulkRecords({
     records: [{ desc: "labroom" } , { desc: "production" }],
     onError: (err)=>console.log(err),
     onSuccess: () => ECMS_Location.getRecords({
       onError: (err)=>console.log(err),
       onSuccess: (records)=>{
         // console.log(records);
         _.forEach(records, (record)=> EquipmentRecord(record));
       }
     })
   });

   */


  create_locations([{ desc: "labroom" }, { desc: "production" }]);

  function create_locations(records){
    _.forEach(records, (record) => create_location(record));
  }

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
      location_id: record.id
    };
    switch (record.desc) {
      case 'labroom':
        equip.model = 'brts32';
        equip.asset_number= '1';
        break;
      case 'production':
        equip.model = 'brts33';
        equip.asset_number= '2';
        break;
      default:
        break;
    }
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
        last_cal: new Date('2012/08/22'),
        next_cal: new Date('2013/08/22')
      },
      onError: (err)=>console.log(err),
      onSuccess: (record) =>console.log(record.dataValues)
    });
  }

  /*db.ECMS_Attribute.bulkCreate([
   {
     asset_number: '1',
     last_cal: new Date('2012/08/22'),
     next_cal: new Date('2013/08/22')
   },
   {
     asset_number: '2',
     last_cal: new Date('2012/08/22'),
     next_cal: new Date('2013/08/22')
   }
   ]);
   db.ECMS_Equipment*/
};