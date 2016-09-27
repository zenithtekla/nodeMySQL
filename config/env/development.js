'use strict';

var morgan  = require('morgan'),
    session         = require('express-session'); // easy-node-authentication.git

/* CONFIGURATE RUN ENV */
module.exports  = function(app){
  /*
   // if-none-match header vs disable('etag'), pages status seems going well with etag disabling
   app.use(function(req, res, next) {
   req.headers['if-none-match'] = 'no-match-for-this';
   next();
   });*/
  // var models = app.get('models');

  // load models
  var models = require(process.cwd() + '/modules/core/server/models')(app);
  app.set('models', models);

  // use morgan logger
  app.use(morgan('dev'));

  app.use(session({
    secret: 'keyboard cat'
  }));

  /// error handlers
  // development error handler
  // will print stacktrace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

  ('NODE_ENV = development').chalk('magenta');

  require('./../db/task')(app);
  require('./sync')(app);
};