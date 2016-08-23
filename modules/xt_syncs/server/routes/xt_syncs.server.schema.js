var express = require('express'),
    router = express.Router();
//var path = require('path');

// load the models
var models = require( process.cwd() + '/modules/core/server/models');


router.get('/', function (req,res) {
    // var findTask = Assembly.findById(5);
    models.Assembly.findAll().then(function(assemblys){
        res.render('client_view3', { assemblys: assemblys});
    });
});

module.exports = router;