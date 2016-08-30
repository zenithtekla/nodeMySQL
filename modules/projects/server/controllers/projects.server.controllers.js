var models = require( process.cwd() + '/modules/core/server/models');

exports.assembly = function *(render) {
  var that = this.body, views = require('co-views');
  /*var render = views('../../client/views/' , {
    map: {pug: 'jade'}
  });*/
  var Assembly = models.Assembly;
  // var findTask = Assembly.findById(5);
  Assembly.findAll().then(function (assemblys) {
    that = yield render('assembly_view' , {assemblys: assemblys});
  });
};