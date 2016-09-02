var db    = require( process.cwd() + '/server').get('models'),
    Todo  = db.Todo,
    app   = require( process.cwd() + '/server');
    // apps  = require( process.cwd() + '/modules/core/server/configs/core.server.configs').apps;

exports.list = (req,res) => {
  // var findTask = Todo.findById(5);
  Todo.findAll().then(function(tasks){
    console.log(tasks);
    res.render('list', { tasks: tasks});
  });

/*  var tasks = [
    {"task":"task1-simpleTodos app", "description":"using ConsolidateJS and different view engine"},
    {"task":"task2-adding full-blown RESTful API to the Todos app", "description":"to sample the all the get,post,put,delete handlers"},
    {"task":"task3-adding Authenticate-layer API to the Todos app", "description":"to provide an additional handlers in the controllers"},
    {"task":"task4-Package the Todos app", "description":"to provide the Todos app as a pattern to apply for any module app"}
  ];*/

  // res.send('ok');
  // res.json(tasks);
  // res.render('list', {"tasks": tasks});
};

exports.create = (req,res) => {
  // res.status(303).send('thank you');
  Todo.create(req.body)
    .then(function(newRecord){
      res.status(200);
    });
  // res.status(200).json(req.body);

};

exports.read = (req,res) => {
  var apps = app.get('apps');
  res.status(200).send({message:'TODO get an existing post by using param ' + req.params.taskId, apps: apps, core: app._router.stack});
};

exports.update = (req,res) => {
  res.status(200).send({message:'TODO modify an existing post by using param ' + req.params.taskId});
};

exports.delete = function(req, res, next) {
  res.send({message:'TODO delete an existing post by using param ' + req.params.taskId});
  // next(new Error('not implemented'));
};