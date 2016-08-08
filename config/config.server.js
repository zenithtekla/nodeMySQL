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

        // Some DATA-PRESET (pre-insert), e.g. add to assembly table
        var creTask = models.Assembly.create({
            customer_id: 6,
            number:'assy_02',
            revision: 'rev_02',
            unique_key: '_37R0KNO5B'
        });

        models.sequelize.sync({logging: console.log}).then(function (task) {
            // console.log(arguments);
/*          var server = app.listen(app.get('port'), function() {
                debug('Express server listening on port ' + server.address().port);
            });*/

            /*creTask.then(function (task) {
                task.save();
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