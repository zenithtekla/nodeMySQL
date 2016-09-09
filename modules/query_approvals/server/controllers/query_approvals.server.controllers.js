var db      = require( process.cwd() + '/server').get('models'),
    Query   = db.Pending_xtQuery,
  path      = require("path"),
  env       = process.env.NODE_ENV || "development",
  config    = require(path.resolve('./config/db/sql_config.json'))[env],
  Sequelize = require("sequelize"),
  sequelize = new Sequelize(config.database, config.user, config.password, config);
// apps  = require( process.cwd() + '/modules/core/server/configs/core.server.configs').apps;

exports.list = (req,res) => {
  Query.findAll(/*{ limit: 3 }*/).then(function(records){
    res.json(records);
  }).catch(function(err){
    res.json({message: 'error encountered', err: err});
  });
};

exports.create = (req,res) => {
  // res.status(303).send('thank you');
  console.log(req.body.query_text);
  Query.findOrCreate({ where: { query_text: req.body.query_text }, defaults: req.body }).then(function(record, created){
    if(record[0].dataValues) res.json({ record: record[0].dataValues });
    else res.sendStatus(200);
  }).catch(function(err){
    // console.log(err);
    res.json({message: 'error encountered', err: err});
  });

/*  Query.create(req.body)
    .then(function (record) {
      res.json({message: 'record created ', record: record.dataValues});
    }).catch(function (err) {
    res.json({message: 'error create encountered' , err: err});
  });*/

  // res.status(200).json(req.body);
};

exports.read = (req,res) => {
  Query.findById(req.params.id).then(function(todo){
    res.json({message: 'view record :' + req.params.id, record: JSON.stringify(todo)});
  }).catch(function(err){
    res.json({message: 'error encountered', err: err});
  });
};

exports.update = (req,res) => {
  // var payload = req.body.status;
  // Explicit or implicit, salt and protect the req.body, param: { status: 1 } or param: { status: -1 } when angular POST it to the server
  if (req.body.status === 1) {
    Query.findById(req.params.id).then(function (record) {
      if(record.dataValues.status !== 0){
        return res.json('Not a pending query to update!');
      }

      execRawQuery(record.dataValues.query_text);
    });
  }

  Query.update({status: req.body.status},{ fields: ['status'], where: {id: req.params.id, status: 0} })
    .then(function(record){
      res.json('ok');
    }).catch(function(err){
      // if (err) { res.send(err); return; }
  });
};

exports.delete = function(req, res, next) {
  // verify and disregard if query is still on pending state.
  Query.destroy({where: {id: req.params.id, $not: [{status: 0}]}}).then(function(){
    res.send({message:'@param ' + req.params.id});
  }).catch(function(err){
    res.json({message: 'error encountered', err: err});
  });
  // next(new Error('not implemented'));
};

// execRawQuery(record.dataValues.query_text);
function execRawQuery(query){
  sequelize.query(query).spread(function(results, metadata){
  });
}