// model schema
"use strict";

module.exports = function(sequelize, DataTypes) {
  var LocationTable = sequelize.define('ECMS_Location', {
      desc: {
          type: DataTypes.STRING(20),
          allowNull: false
      }
  },
  {
      timestamps: false,
      tableName: 'ECMS_location_table',
      freezeTableName: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
  });

  return LocationTable;
};