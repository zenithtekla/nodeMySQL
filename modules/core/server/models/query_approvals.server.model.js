// model schema
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Schema = sequelize.define('Pending_xtQuery' , {
    approved_by   :   DataTypes.INTEGER(10),
    approved_time :   DataTypes.INTEGER(10),
    created_by    :   DataTypes.INTEGER(10),
    query_text    :   {
      // ER_TOO_LONG_KEY: Specified key was too long; max key length is 767 bytes
      type: DataTypes.TEXT('long')
    },
    remark        :   DataTypes.TEXT('long'),
    status        :   {
      type: DataTypes.INTEGER(2),
      defaultValue: 0
    },
    time_stamp    :   DataTypes.INTEGER(10)
  } ,
  {
    timestamps: false ,
    tableName: 'mantis_query_manex_sync_table' ,
    freezeTableName: true ,
    charset: 'utf8' ,
    collate: 'utf8_unicode_ci',
    getterMethods: {
      // registered methods can only be invoked when a new record is generated within this system.
      queryRecord: function () {
        return this.query_text + ' created @ ' + this.time_stamp;
      }
    }
  });
  // Schema.removeAttribute('id');
  return Schema;
};