var db    = require( process.cwd() + '/server').get('models'),
  Todo  = db.Todo,
  app   = require( process.cwd() + '/server');
// apps  = require( process.cwd() + '/modules/core/server/configs/core.server.configs').apps;

exports.list = (req,res) => {
  Todo.getList({
    onRead: (records) => res.json(records),
    onError:(err) => res.json(err)
  });
};
// create or update
exports.create = (req,res) => {
  // res.status(303).send('thank you');
  Todo.findOne({ where: { task: req.body.task } }).then(function(todo){
    if(!todo){
      Todo.create(req.body)
        .then(function (todo) {
          res.json({message: 'record created ', record: todo.dataValues});
        }).catch(function (err) {
        res.json({message: 'error2 encountered' , err: err});
      });
    } else {
      // res.json({message: 'record exists ', record: todo.dataValues});
      Todo.update(req.body, {where: { task: req.body.task }})
        .then(function () {
          res.status(200).send({message:'modified an existing record @ param ' + req.body.task, record : req.body});
        });
    }
  }).catch(function(err){
    res.json({message: 'error1 encountered', err: err});
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