// import modules
var express = require('express'),
    cfg = require('./config/config'),    
    view_path = cfg.xt_sync.views,
    route_path = cfg.xt_sync.routes,
    path = require('path'),
    pug = require('pug'),
    app = express();

var port = cfg.port;

// configure ROUTES
var display = require('.' + route_path + 'xt_syncs.server.routes');
var display_w_crud = require('.' + route_path + 'xt_syncs.server.crud.routes');

// console.log(display);

// view engine setup
app.set('views', path.join(__dirname, view_path));
app.set('view engine', 'pug');

// register routes
app.use('/', display);
app.use('/crud', display_w_crud);

app.listen(port);