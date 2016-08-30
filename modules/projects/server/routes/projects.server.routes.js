var controller  = require('../controllers/projects.server.controllers');


module.exports = function(app, render){
  app.get('/task', controller.assembly(render));
};