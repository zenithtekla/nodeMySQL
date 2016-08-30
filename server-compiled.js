'use strict';

// server.js

// modules =====================================================
var logger = require('koa-logger'),
    koa = require('koa'),
    app = module.exports = koa(),
    config = require('./config/config')
// session         = require('express-session'), easy-node-authentication.git
// morgan, fs
;

// CONFIGURATION ===============================================
// server port
var port = config.port;

app.use(logger());

app = require('./config/config.koa.server')(app);

app.listen(port);
console.log('listening on port: ', port);

//# sourceMappingURL=server-compiled.js.map