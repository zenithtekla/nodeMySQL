'use strict';
var morgan  = require('morgan');

/* CONFIGURATE RUN ENV */
module.exports  = function(app){
  // use morgan logger
  app.use(morgan('tiny'));

  ('NODE_ENV = test').chalk('blue');
};