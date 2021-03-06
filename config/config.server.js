'use strict';
/**
 * Module dependencies.
 */

var express       = require('express'),
  path            = require('path'),
  cors            = require('cors'),
  favicon         = require('serve-favicon'),
  cookieParser    = require('cookie-parser'),
  bodyParser      = require('body-parser'),
  methodOverride  = require('method-override'),
  passport        = require('passport')

    // fs
  ;


/* CONFIGURATE SERVER */
module.exports  = function(app){

  /* =================================
  // configuration with middlewares
  ================================= */

  /*// MongoDB file
   var db = require('./config/db/mongo_config');
   // connect to mongoDB database
   mongoose.connect(db.url);*/

  // use cors
  app.use(cors());

  // use momentjs
  app.locals.moment = require('moment');

  app.set('json spaces', 4);

  // resolve 304 status code
  app.disable('etag');

  // uncomment after placing your favicon in /public http://onlinefavicon.com
  app.use(favicon(path.resolve('public/img/favicon.ico')));

  // get all data/stuff of the body (POST) parameters
  // parse application/json
  app.use(bodyParser.json());

  // parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser());

  // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(methodOverride('_method'));

  if (app.get('env') === 'development') require('./env/development')(app);

  if (app.get('env') === 'production') require('./env/production')(app);

  if (app.get('env') === 'test') require('./env/test')(app);

  // set the static files location /public/img will be /img for users
  app.use(express.static(path.resolve('public'))); // app.use(express.static('uploads')); http://expressjs.com/en/starter/static-files.html
  // app.use(express.static(path.resolve('modules/client/core')));
  app.use(express.static(path.resolve('modules/core/client/views')));
  app.use(express.static(path.resolve('modules/angular1/client/views')));

  // render views
  require('./config.view')(app);

  console.log("===================================================");

  app.use(passport.initialize());
  app.use(passport.session());

  /// catch 404 and forwarding to error handler
  app.use(function(req, res, next) {
    var err = new Error(req.url + ' Not Found');
    err.status = 404;
    next(err);
  });

  return app;
};