"use strict";

var _ = require('lodash');
// pending implementation of var bluebird = require('bluebird); Promisify these CRUD utility methods

module.exports = function(model){

  /*
   * USAGE:
   * Model.findOrCreateRecord({
   *    cond: { where: { query_text: req.body.query_text }, defaults: req.body },
   *    newRecord: {},
   *    onSuccess: {},
   *    onError: {}
   * });
   *
   *  // defaults is optional
   *
   * */
  var findOrCreateRecord = function(o){
    model.findOrCreate(o.cond).then(function(record, created){
      /*if(record[0].dataValues) res.json({ record: record[0].dataValues });
      else res.sendStatus(200);*/
      o.onSuccess(record);
    }).catch(function(err){
      o.onError(err);
    });
  };

  /*
  * USAGE:
  * Model.updateOrCreate({
  *    cond: {},
  *    newRecord: {},
  *    onCreate: {},
  *    onUpdate: {},
  *    onError: {}
  * });
  *
  *
  * */
  var updateOrCreate = function (o) {
    var cond      = o.cond || {},
        newRecord = o.newRecord,
        onCreate  = o.onCreate,
        onUpdate  = o.onUpdate,
        onError   = o.onError;
    // First try to find the record
    model.findOne(cond).then(function (record) {
      if (!record) {
        // Item not found, create a new one
        model.create(newRecord)
          .then(function () {
            onCreate();
          })
          .error(function (err) {
            onError(err);
          });
      } else {
        // Found an item, update it
        model.update(newRecord, {where: where})
          .then(function () {
            onUpdate();
          })
          .catch(function (err) {
            onError(err);
          });
      }
    }).catch(function (err) {
      onError(err);
    });
  };

  /*
   * USAGE:
   * Model.createRecord({
   *    newRecord: {},
   *    onSuccess: {},
   *    onError: {}
   * });
   *
   *
   * */
  var createRecord = function(o){
    model.create(o.newRecord).then(function(record){
      o.onSuccess(record);
    }).catch(function (err) {
      o.onError(err);
    })
  };


  /*
   * USAGE:
   *
   * Model.getList({
   *    limit: 3,
   *    onRead: {},
   *    onError: {}
   * });
   *
   *
   * */
  var getList = function (o) {
/*    var ob = {};
    _.forOwn(o, function(v, k){
      if (v) ob.k = o.k;
    });*/
    model.findAll(o.cond).then(function(records){
       o.onSuccess(records);
    }).catch(function (err) {
       o.onError(err);
    })
  };

  /*
   * USAGE:
   *
   * Model.getRecordById({
   *    id: req.params.id,
   *    onSuccess: {},
   *    onError: {}
   * });
   *
   *
   * */
  var getRecordById = function (o) {
    model.findById(o.id).then(function(record){
      o.onSuccess(record);
    }).catch(function (err) {
      o.onError(err);
    })
  };

  /*
   * USAGE:
   *
   * Model.getRecord({
   *    cond: {}, // cond: {where: {}}, OR cond: {where: {id: req.params.id}}
   *    onSuccess: {},
   *    onError: {}
   * });
   *
   *
   * */
  var getRecord = function (o) {
    model.findOne(o.cond).then(function (record) {
      o.onSuccess(record);
    }).catch(function (err) {
      o.onError(err);
    })
  };

  /*
   * USAGE:
   *
   * Model.updateRecord({
   *    newRecord: {}, // newRecord: req.body,
   *    cond: {
   *      fields: ['status'],
   *      where: {},
   *    },
   *    onSuccess: {},
   *    onError: {}
   * });
   *
   *
   * */
  var updateRecord = function (o) {
    model.update(o.newRecord, o.cond).then(function () {
      o.onSuccess();
    }).catch(function (err) {
      o.onError(err);
    })
  };

  /*
   * USAGE:
   *
   * Model.deleteRecord({
   *    cond: {
   *      where: {},
   *      $not: {}
   *    },
   *    onSuccess: {},
   *    onError: {}
   * });
   *
   *
   * */
  var deleteRecord = function (o) {
    model.destroy(o.cond).then(function () {
      o.onSuccess();
    }).catch(function (err) {
      o.onError(err);
    })
  };

  model.findOrCreateRecord    = findOrCreateRecord;
  model.updateOrCreate        = updateOrCreate;
  model.createRecord          = createRecord;
  model.getList               = getList;
  model.getRecordById         = getRecordById;
  model.getRecord             = getRecord;
  model.updateRecord          = updateRecord;
  model.deleteRecord          = deleteRecord;
};