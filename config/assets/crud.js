"use strict";

module.exports = function(model){

  /*
  * USAGE:
  * Model.updateOrCreate({
  *    where: {},
  *    newRecord: {},
  *    onCreate: {},
  *    onUpdate: {},
  *    onError: {}
  * });
  *
  *
  * */
  var updateOrCreate = function (_) {
    var where     = _.where,
        newRecord = _.newRecord,
        onCreate  = _.onCreate,
        onUpdate  = _.onUpdate,
        onError   = _.onError;
    // First try to find the record
    model.findOne({where: where}).then(function (record) {
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
   *
   * Model.getList({
   *    limit: 3,
   *    onRead: {},
   *    onError: {}
   * });
   *
   *
   * */
  var getList = function (_) {
    var o = {};
    if (_.limit) o.limit = _.limit;
    model.findAll(o).then(function(records){
       _.onRead(records);
    }).catch(function (err) {
       _.onError(err);
    })
  };

  model.updateOrCreate  = updateOrCreate;
  model.getList         = getList;
};