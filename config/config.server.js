'use strict';


/* CONFIGURATE RUN ENV */
module.exports = function(app){

    /// error handlers
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
        console.log('NODE_ENV = development');
        var models = require(process.cwd() + '/modules/core/models');
        models.sequelize.sync().then(function () {
            // console.log(arguments);
/*            var server = app.listen(app.get('port'), function() {
                debug('Express server listening on port ' + server.address().port);
              });*/
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    return app;
};