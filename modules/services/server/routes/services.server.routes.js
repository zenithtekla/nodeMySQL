var express       = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/services.server.controllers');

router.route('/api/work_order/:work_order')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  next();
})
.get(controller.get)
.put(function(req, res, next) {
  // just an example of maybe updating the user
  req.user.name = req.params.name;
  // save user ... etc
  res.json(req.user);
})
.post(controller.post)
.delete(function(req, res, next) {
  next(new Error('not implemented'));
});

/*router.get('/work_order/:work_order', controller.get)
  .post('/work_order', controller.post);*/

module.exports = router;

/*

 // http://expressjs.com/en/4x/api.html#router
 // Return a 404 for all undefined api, module or lib routes
 app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);
 // https://github.com/zenithtekla/seanjs_emi/blob/master/modules/core/server/routes/core.server.routes.js
 */