const Sequelize = require('sequelize');
var sql = require(process.cwd() + '/config/db/sql_config');
require('sequelize-isunique-validator')(Sequelize);

var connection = new Sequelize(sql.database, sql.user, sql.password, {
  host: sql.host,
  dialect: 'mysql', // optional dialect
  pool: sql.pool
});

connection
  .authenticate()
  .then(function(err) {
    console.log('dB connection has been established successfully.');
  }).
catch(function(err) {
  console.dir('Unable to connect to the database: ', err);
});


var model = function(name){
  connection.import(process.cwd() + 'modules/core/server/models/' + name + '.server.model');
};

connection.sync({
  logging: console.log
}).then(function(cb) {
  console.log('awaiting db Transaction');
  if (cb)
    cb();
});

// return a singleton module
module.exports = model;