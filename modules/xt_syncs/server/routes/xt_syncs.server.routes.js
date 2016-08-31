var controller  = require('../controllers/xt_syncs.server.controllers');


module.exports = function(app){
  // root definition is optional
  var root = app.get('root');
  
  app.get(root + '/view1', controller.view1)
    .get('/view2', controller.view2)
    .get('/assembly', controller.assembly)
    .get('/project', controller.project);
};