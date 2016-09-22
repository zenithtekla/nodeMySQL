var db    = require( process.cwd() + '/server').get('models'),
  Todo  = db.Todo,
  app   = require( process.cwd() + '/server');
// apps  = require( process.cwd() + '/modules/core/server/configs/core.server.configs').apps;

exports.list = (req,res) => {
  Todo.getList({
    cond: {limit: 2},
    onError:(err) => res.json(err),
    onSuccess: (records) => res.render('list', { tasks:records})
  });
};
// create or update
exports.create = (req,res) => {
  // res.status(303).send('thank you');
  Todo.getRecord({
    cond: { where: { task: req.body.task } },
    onError: (err)      => res.json({message: 'error1 encountered' , err: err}),
    onSuccess: (rec) => {
      if(!rec)
        Todo.createRecord({
          newRecord:req.body,
          onError: (err)      => res.json({message: 'error2 encountered' , err: err}),
          onSuccess: (record) => res.json({message: 'record created ', record: record.dataValues})
        });
      else
        Todo.updateRecord({
          newRecord: req.body,
          cond: {where: { task: req.body.task }},
          onError: (err)  => res.json({message: 'error3 encountered', err: err}),
          onSuccess: ()   => res.status(200).send({message:'modified an existing record @ param ' + req.body.task, record : req.body})
        })
    }
  });

  // res.status(200).json(req.body);
};

exports.read = (req,res) => {
  var apps = app.get('apps');
  Todo.getRecordById({
    id: req.params.taskId,
    onError: (err) => res.json({message: 'error encountered', err: err}),
    onSuccess: (record) => res.json({message: 'view record :' + req.params.taskId, record: record})
  });
  // res.status(200).send({message:'TODO get an existing post by using param ' + req.params.taskId, apps: apps, core: app._router.stack});
};

exports.update = (req,res) => {
  Todo.updateRecord({
    newRecord: req.body,
    cond: {where: {id: req.params.taskId} },
    onError: (err) => res.json({message: 'error encountered', err: err}),
    onSuccess: () => res.status(200).send({message:'modified an existing record @ param ' + req.params.taskId, record : req.body})
  });
};

exports.delete = function(req, res, next) {
  Todo.deleteRecord({
    cond: {where: {id: req.params.taskId}},
    onError: (err) => res.json({message: 'error encountered', err: err}),
    onSuccess: () => res.send({message:'deleted an existing record @ param ' + req.params.taskId})
  });
  // next(new Error('not implemented'));
};