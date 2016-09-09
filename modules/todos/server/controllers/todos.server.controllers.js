var db    = require( process.cwd() + '/server').get('models'),
  Todo  = db.Todo,
  app   = require( process.cwd() + '/server');
// apps  = require( process.cwd() + '/modules/core/server/configs/core.server.configs').apps;

exports.list = (req,res) => {
  // var findTask = Todo.findById(5);
  Todo.findAll(/*{ limit: 3 }*/).then(function(tasks){
    res.json(tasks);
    // res.render('list', { tasks: tasks});
  }).catch(function(err){
    res.json({message: 'error encountered', err: err});
  });

  /*  var tasks = [
   {"task":"task1-simpleTodos app", "desc":"using ConsolidateJS and different view engine"},
   {"task":"task2-adding full-blown RESTful API to the Todos app", "desc":"to sample the all the get,post,put,delete handlers"},
   {"task":"task3-adding Authenticate-layer API to the Todos app", "desc":"to provide an additional handlers in the controllers"},
   {"task":"task4-Package the Todos app", "desc":"to provide the Todos app as a pattern to apply for any module app"}
   ];*/

  // res.send('ok');
  // res.json(tasks);
  // res.render('list', {"tasks": tasks});
};

exports.create = (req,res) => {
  // res.status(303).send('thank you');
  Todo.findOne({ where: { task: req.body.task } }).then(function(todo){
    if(todo.dataValues){
      res.json({message: 'record exists ', record: todo.dataValues});
    }
    else {
      Todo.create(req.body)
        .then(function (todo) {
          res.json({message: 'record created ', record: todo.dataValues});
        }).catch(function (err) {
        res.json({message: 'error encountered' , err: err});
      });
    }
  }).catch(function(err){
    res.json({message: 'error encountered', err: err});
  });

  // res.status(200).json(req.body);
};

exports.read = (req,res) => {
  var apps = app.get('apps');
  Todo.findById(req.params.taskId).then(function(todo){
    res.json({message: 'view record :' + req.params.taskId, record: todo});
  }).catch(function(err){
    res.json({message: 'error encountered', err: err});
  });
  // res.status(200).send({message:'TODO get an existing post by using param ' + req.params.taskId, apps: apps, core: app._router.stack});
};

exports.update = (req,res) => {
  Todo.update(req.body,{where: {id: req.params.taskId} })
    .then(function(){
      res.status(200).send({message:'modified an existing record @ param ' + req.params.taskId, record : req.body});
    }).catch(function(err){
    res.json({message: 'error encountered', err: err});
  });
};

exports.delete = function(req, res, next) {
  Todo.destroy({where: {id: req.params.taskId}}).then(function(){
    res.send({message:'deleted an existing record @ param ' + req.params.taskId});
  }).catch(function(err){
    res.json({message: 'error encountered', err: err});
  });
  // next(new Error('not implemented'));
};