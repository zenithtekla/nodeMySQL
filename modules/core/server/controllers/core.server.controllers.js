// load the models
var models = require( process.cwd() + '/modules/core/server/models'),
    env     = process.env.NODE_ENV || "development";

exports.home = function (req,res) {
  res.render('layout', {title: "CoreHomeApp", env: env});
};
exports.greet = function (req,res) {
  res.render('index', {greet: "This is a greet text", title: "CoreIndexApp", env: env});
};

exports.article = function (req,res) {
  res.render('article', {title: "ArticleApp", env: env });
};
exports.chat = function (req,res) {
  res.render('chat', {title: "ChatApp", env: env});
};