'use strict';

var express       = require('express'),
  path            = require('path'),
  cors            = require('cors'),
  favicon         = require('favicon'), // or require('serve-favicon');
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

  app.set('json spaces', 4);

  // resolve 304 status code
  app.disable('etag');

  // uncomment after placing your favicon in /public
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  // app.use(favicon(__dirname + '/public/favicon.ico'));

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

  if (app.get('env') === 'development') require('./env/development')(app);

  if (app.get('env') === 'production') require('./env/production')(app);

  if (app.get('env') === 'test') require('./env/test')(app);

  // set the static files location /public/img will be /img for users
  app.use(express.static(path.resolve('public'))); // app.use(express.static('uploads')); http://expressjs.com/en/starter/static-files.html
  // app.use(express.static(path.resolve('modules/client/core')));


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