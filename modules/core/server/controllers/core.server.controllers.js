// load the models
var models = require( process.cwd() + '/modules/core/server/models'),
    env     = process.env.NODE_ENV || "development";

exports.home = function (req,res) {
  console.log("title == manuke");
  res.render('home', {"title": "Manuke", "env": env});
};