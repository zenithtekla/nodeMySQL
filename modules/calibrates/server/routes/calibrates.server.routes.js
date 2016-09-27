"use strict";

module.exports = function(app){
  // root definition is optional
  var root = app.get('root');

  var module_name = app.get('module_name');
  var controller  = require('../controllers/' + module_name + '.server.controllers');

  app.get('/table_equipment', controller.equipment)
    .get('/table_main', controller.main)
    .get('/table_location', controller.location);
  app.route('/equipment')
    .get( controller.getEquipment)
    .post( controller.createEquipment);
  app.route('/equipment/:model/:asset_number')
    .get(controller.getEquipmentBy);
    // .put(controller.update);

  app.route('/equipment/:model')
    .get(controller.getEquipmentBy);
  app.route('/equipment/:asset_number')
    .get(controller.getEquipmentBy);

  app.route('/equipment/:location_id')
    .get(controller.getEquipmentBy);

  /*app.route('/tasks').all(/!* taskPolicy.isAllowed *!/)
    .get(controller.list)
    .post(controller.create);

  app.route('/tasks/:taskId')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);*/

  // app.post('/upload', auth.isAuthenticated(), controller.upload);
};

/*
 modules names are ready: config.modules
 naming convention in 1 routes.js file so,
 /cablirate/index (getAll() to display all records with statuses,
 containing action ribbons for equipment, record)
 /cablirate/equipment (getAll() to display all equipments, not quite necessary)
 /cablirate/equipment/add (insert|update)
 /cablirate/equipment/:equipment (post to retrieve related equipment data)
 /cablirate/record (getAll() to display all records)
 /cablirate/record/:record
 /cablirate/record/add (insert|update a record, not quite necessary)
 */