var express     = require('express'),
    router         = express.Router(),
    controller  = require('../controllers/xt_syncs.server.controllers');

/* GET home page. */
router.get('/test', controller.get)
.get('/view1', controller.view1)
.get('/view2', controller.view2)
.get('/assembly', controller.assembly)
.get('/project', controller.project);

module.exports = router;