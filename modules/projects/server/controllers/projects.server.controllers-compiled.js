'use strict';

var models = require(process.cwd() + '/modules/core/server/models');

exports.assembly = function (view_path) {

  var render = views(view_path, {
    map: { pug: 'jade' }
  });
  var Assembly = app.get('models').Assembly;
  // var findTask = Assembly.findById(5);
  Assembly.findAll().then(function (assemblys) {
    res.render('assembly_view', { assemblys: assemblys });
  });
};

//# sourceMappingURL=projects.server.controllers-compiled.js.map