// import modules
var express = require('express'),
    config = require('./config/config'),
    view_path = config.views,
    route_path = config.routes,
    path = require('path'),
    pug = require('pug'),
    app = express();

var port = config.port;

// configure ROUTES
var display = require('.' + route_path + 'xt_syncs.server.routes');
var display_w_crud = require('.' + route_path + 'xt_syncs.server.crud.routes');
var display_w_schema = require('.' + route_path + 'xt_syncs.server.schema');

// console.log(display);

// view engine setup
app.set('views', path.join(__dirname, view_path));
app.set('view engine', 'pug');

// register routes
app.use('/', display);
app.use('/crud', display_w_crud);
app.use('/view3', display_w_schema);

app.listen(port);