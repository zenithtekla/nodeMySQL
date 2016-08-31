
module.exports = function(app){
  // root definition is optional
  var root = app.get('root');
  
  var module_name = app.get('module_name');
  var controller  = require('../controllers/' + module_name + '.server.controllers');

  app.get(root + '/todos', controller.todos);
};