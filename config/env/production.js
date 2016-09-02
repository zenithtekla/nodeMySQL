'use strict';

var morgan  = require('morgan'),
    session         = require('express-session');

/* CONFIGURATE RUN ENV */
module.exports  = function(app){
  /*app.use(function(req, res, next) {
   req.headers['if-none-match'] = 'no-match-for-this';
   next();
   });*/

  // use morgan logger
  app.use(morgan('combined'));

  var sess = {
    secret: 'keyboard cat',
    cookie: {}
  };


  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies

  app.use(session(sess));

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  ('NODE_ENV = production').chalk('green');
};