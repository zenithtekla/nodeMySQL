// model schema
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Schema;
  Schema = sequelize.define('ECMS_Equipment' , {
      model: {
        type: DataTypes.STRING(20) ,
        allowNull: false
      } ,
      asset_number: {
        type: DataTypes.STRING(20) ,
        allowNull: false ,
        unique: true
      } ,
      location_id: DataTypes.STRING(20) ,
      status: {
        type: DataTypes.INTEGER(2).UNSIGNED ,
        defaultValue: 1
      }
    } ,
    {
      timestamps: false ,
      tableName: 'ECMS_equipment_table' ,
      freezeTableName: true ,
      charset: 'utf8' ,
      collate: 'utf8_unicode_ci',
      getterMethods: {
        assetNumber: function () {
          return this.asset_number + ' ' + this.location_id;
        }
      }
    });
  // Schema.removeAttribute('id');
  return Schema;
};