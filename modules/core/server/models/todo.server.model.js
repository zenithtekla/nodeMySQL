"use strict";

module.exports = function(sequelize, DataTypes) {
  var Schema = sequelize.define('Todo', {
      task: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      desc: DataTypes.STRING(20),
      due: DataTypes.DATE()
    },
    {
      tableName: 'todo_table',
      freezeTableName: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });

  return Schema;
};