'use strict';
var express         = require('express'),
    app             = module.exports = express(),
    config          = require('./config/config'),
    port            = config.port // server port
;

// configure ROUTES before static to avoid 304 status code =======================================
app = require('./config/config.server')(app); // load config.server to initialise the RUN_ENV

app.listen(port);
app.on('error', onError);
app.on('listening', onListening);
console.log('listening on port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
}