var services      = require('../configs/web_services.json'),
    ERPservices   = services["erp-2"],
    request       = require('request'),
    soapURI       = ERPservices.work_order;

exports.post = function (req,res) {
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
};

exports.get = function (req, res) {
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
};
