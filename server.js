// server.js

// modules =====================================================
var express         = require('express'),
    app             = express(),
    config          = require('./config/config'),
    view_path       = config.views,
    route_path      = config.routes,
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
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup ===========================================
app.set('views', path.join(__dirname, view_path));
app.set('view engine', 'pug');

// configure ROUTES ============================================
var display = require('.' + route_path + 'xt_syncs.server.routes');
var display_w_crud = require('.' + route_path + 'xt_syncs.server.crud.routes');
var display_w_schema = require('.' + route_path + 'xt_syncs.server.schema');

// register routes
app.use('/', display);
app.use('/crud', display_w_crud);
app.use('/view3', display_w_schema);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port);