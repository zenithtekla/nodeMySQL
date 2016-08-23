"use strict";

var fs        = require("fs"),
    path      = require("path"),
    Sequelize = require("sequelize"),
    env       = process.env.NODE_ENV || "development",
    config    = require(path.join(process.cwd(), '/config/db/', 'sql_config.json'))[env],
/* sequelize for JS, similar to Hibernate (ORM) to Java, Entity to .NET */
    sequelize = new Sequelize(config.database, config.user, config.password, config),
    db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;