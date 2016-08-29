// model schema
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Schema = sequelize.define('Assembly', {
      customer_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
      },
      number: DataTypes.STRING(250),
      revision: DataTypes.STRING(10),
      unique_key: {
          type: DataTypes.STRING(10),
          allowNull: false,
          unique: true
      }
  },
  {
      timestamps: false,
      tableName: 'orm_assembly_table',
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

  return Schema;
};
/* The

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postsSchema = new Schema({
    content: String,
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    }
});

mongoose.model('posts', postsSchema);*/