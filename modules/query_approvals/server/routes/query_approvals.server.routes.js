
module.exports = function(app){
  // root definition is optional
  var root = app.get('root');

  var module_name = app.get('module_name');
  var controller  = require('../controllers/' + module_name + '.server.controllers');

  app.route('/pending_queries').all(/* taskPolicy.isAllowed */)
    .get(controller.list)
    .post(controller.create);

  app.route('/pending_queries/:id')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);
};