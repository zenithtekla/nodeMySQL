// model schema
"use strict";

module.exports = function(sequelize, DataTypes) {
  var MainTable = sequelize.define('ECMS_Main', {
      asset_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      last_cal: DataTypes.DATE(),
      schedule: DataTypes.INTEGER(20),
      next_cal: DataTypes.DATE(),
      file: DataTypes.BLOB()
  },
  {
      timestamps: false,
      tableName: 'ECMS_main_table',
      freezeTableName: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
  });

  return MainTable;
};