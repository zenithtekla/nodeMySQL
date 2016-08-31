module.exports = function(app){
  // root definition is optional
  var root = app.get('root');

  var module_name = app.get('module_name');
  var controller  = require('../controllers/' + module_name + '.server.controllers');

  // as root = "/api" in json cfg file, view1 goes by xt_syncs/api/view1
  app.get(root + '/view1', controller.view1)
    .get('/view2', controller.view2)
    .get('/assembly', controller.assembly)
    .get('/project', controller.project);
};