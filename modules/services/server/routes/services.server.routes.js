var express       = require('express'),
    router        = express.Router(),
    services      = require('../../config/web_services.json'),
    ERPservices   = services["erp-2"],
    cors          = require('cors'),
    request       = require('request');

router.get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
/*
module.exports = function (app) {
  var soapURI = ERPservices.work_order;
  app.post('/api/work_order',function (req,res) {
    var work_order = req.body.work_order;
    var url = soapURI + work_order;
    request({
      url: url,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body); // Print the json response
        // add further logic here
        res.send(body);
      }
    });
  });

  app.get('/api/work_order/:work_order', function (req, res) {
    var work_order = req.params.work_order;
    var url = soapURI + work_order;
    request({
      url: url,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body); // Print the json response
        // add further logic here
        res.send(body);
      }
    });
  });
};*/
module.exports = router;