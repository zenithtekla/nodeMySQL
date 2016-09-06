// model schema
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Schema = sequelize.define('ECMS_Equipment' , {
    model: {
      type: DataTypes.STRING(20) ,
      allowNull: false
    } ,
    asset_number: {
      type: DataTypes.STRING(20) ,
      allowNull: false ,
      unique: true
    } ,
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
    },
    classMethods: {
      associate: function(models){
        // by default, will reference to targetKey of primary id in the Location table
        // belongsTo - foreignKey sits on the source table: which is this Schema
        Schema.belongsTo(models.ECMS_Location, { as: 'Location', foreignKey: 'location_id', targetKey: 'id' } );
        Schema.belongsTo(models.ECMS_Main, { as: 'Equipment', foreignKey: 'asset_number', targetKey: 'asset_number'});
      }
    }
  });
  // Schema.removeAttribute('id');
  return Schema;
};