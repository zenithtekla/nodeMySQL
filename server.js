// server.js

// modules =====================================================
var express         = require('express'),
    app             = express(),
    config          = require('./config/config'),
    path            = require('path'),
    favicon         = require('favicon'), // or require('serve-favicon');
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    // session         = require('express-session'), easy-node-authentication.git
    app             = require('./config/config.server')(app) // load config.server to initialise the RUN_ENV
    // morgan, fs
;

// CONFIGURATION ===============================================
// server port
var port = config.port;

/*// MongoDB file
var db = require('./config/db/mongo_config');
// connect to mongoDB database
mongoose.connect(db.url);*/

// configuration with middlewares ==============================

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

// set the static files location /public/img will be /img for users
app.use(express.static(path.join(__dirname, 'public'))); // app.use(express.static('uploads'));

// view engine setup ===========================================


// configure ROUTES ============================================

/*
modules names are ready: config.modules
naming convention in 1 routes.js file so,
    /cablirate/index (getAll() to display all records with statuses,
        containing action ribbons for equipment, record)
    /cablirate/equipment (getAll() to display all equipments, not quite necessary)
    /cablirate/equipment/add (insert|update)
    /cablirate/equipment/:equipment (post to retrieve related equipment data)
    /cablirate/record (getAll() to display all records)
    /cablirate/record/:record
    /cablirate/record/add (insert|update a record, not quite necessary)
 */

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port);