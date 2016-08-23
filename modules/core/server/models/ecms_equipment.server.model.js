// model schema
"use strict";

module.exports = function(sequelize, DataTypes) {
  var EquipmentTable = sequelize.define('ECMS_Equipment', {
      model: {
          type: DataTypes.STRING(20),
          allowNull: false
      },
      asset_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      location_id: DataTypes.STRING(20),
      status: {
          type: DataTypes.INTEGER(2).UNSIGNED,
          allowNull: false,
          unique: true
      }
  },
  {
      timestamps: false,
      tableName: 'ECMS_equipment_table',
      freezeTableName: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'

      /*, getterMethods   : {
        fullName       : function()  { return this.firstname + ' ' + this.lastname }
      },

      setterMethods   : {
        fullName       : function(value) {
            var names = value.split(' ');

            this.setDataValue('firstname', names.slice(0, -1).join(' '));
            this.setDataValue('lastname', names.slice(-1).join(' '));
        },
      },
      classMethods: {
        generateHash : function(password) {
        	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
      },
        instanceMethods: {
        validPassword : function(password) {
        	return bcrypt.compareSync(password, this.localpassword);
        }
      }

      */
  });
  // EquipmentTable.removeAttribute('id');
  return EquipmentTable;
};