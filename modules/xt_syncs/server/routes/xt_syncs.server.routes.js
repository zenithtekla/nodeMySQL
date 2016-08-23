var express = require('express');
var router = express.Router();
var path = require('path');

// load the models
var models = require( process.cwd() + '/modules/core/server/models');

/* GET home page. */
router.get('/view1', function(req, res) {
    res.render('client_view1', { title: 'About', age: 30, path: __dirname.toString() });

    // -= access query object =-
    // so if /about?age=30 is passed, console prints { age: '30' }

    /*
     router.post .. {
     req.query.name // to access name that is sent through post
     }
     */
});

router.get('/view2', function (req,res) {
    res.render('client_view2', {"employees":[
        {"firstName":"John", "lastName":"Doe"},
        {"firstName":"Anna", "lastName":"Smith"},
        {"firstName":"Peter", "lastName":"Jones"}
    ]});
    
});

router.get('/assembly', function (req,res) {
    // var findTask = Assembly.findById(5);
    models.Assembly.findAll().then(function(assemblys){
        res.render('client_view3', { assemblys: assemblys});
    });
});

module.exports = router;