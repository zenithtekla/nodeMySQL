var controller  = require('../controllers/xt_syncs.server.controllers');


module.exports = function(app){
  app.get('/view1', controller.view1)
    .get('/view2', controller.view2)
    .get('/assembly', controller.assembly(app))
    .get('/project', controller.project);
};