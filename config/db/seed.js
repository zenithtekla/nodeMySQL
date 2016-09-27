'use strict';

/* CONFIGURATE after sync seed */
module.exports  = function(app) {
  var db = app.get('models') ,
    _ = require('lodash') ,
    Promise = require('bluebird') ,
    utils = require('../assets/utils'),
    path = require('path'),
    util_method = require(path.resolve('modules/calibrates/server/controllers/calibrates.server.utils'))(db, 'seed');

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
   /*var records = [
     {
       body: {
         desc:'labroom',
         model:"brts31",
         asset_number:1
       }
     },
     {
       body: {
         desc: 'production',
         model:"brts32",
         asset_number:2
       }
     },
     {
       body: {
         desc: 'production',
         model:"brts33",
         asset_number:3
       }
     }
   ];

  _.forEach(records, (record) => {
    util_method.createLocation(record);
  });*/

  for (var i = 1;i<10; i++){
    var req= {
      body: {
        desc: (i%2) ? 'labroom' : 'production',
        last_cal: '2012/09/23',
        next_cal: '2013/09/23'
      }
    }, res = '';
    util_method.createLocation(req, res);
  }

/*  var req= {
    body: {
      desc:'labroom',
      model:"brts31",
      asset_number:1
    }
  };
  util_method.createLocation(req);*/
};