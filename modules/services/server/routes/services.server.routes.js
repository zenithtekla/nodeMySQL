var express       = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/services.server.controllers');

router.get('/api/work_order/:work_order', controller.get)
  .post('/api/work_order', controller.post);
/*
*/
module.exports = router;