// load the models
var models = require( process.cwd() + '/modules/core/server/models'),
    env     = process.env.NODE_ENV || "development";

exports.view1 = function(req, res) {
  res.render('client_view1', { title: 'About', age: 30, path: __dirname.toString() });

  // -= access query object =-
  // so if /about?age=30 is passed, console prints { age: '30' }

  /*
   router.post .. {
   req.query.name // to access name that is sent through post
   }
   */
};
exports.view2 = function (req,res) {
  res.render('client_view2', {"employees":[
    {"firstName":"John", "lastName":"Doe"},
    {"firstName":"Anna", "lastName":"Smith"},
    {"firstName":"Peter", "lastName":"Jones"}
  ]});
};
exports.assembly = function (req,res) {
  // var findTask = Assembly.findById(5);
  models.Assembly.findAll().then(function(assemblys){
    res.render('assembly_view', { assemblys: assemblys});
  });
};

// a pattern to use simple mySQL npm with poolConnection
exports.project = function (req,res) {
  var mysql   = require('mysql');
  console.log('my process is ', process.cwd());

  /* load sql_config */
  // __basepath = 'c:\\' + __basepath.replace(/\//g, "\\").substr(3);
  var __basepath =  process.cwd();
  var sql = require( __basepath +'/config/db/sql_config.json')[env];

  // implement connectionPool
  var pool = mysql.createPool(sql);

  // pool.query("SELECT * FROM mantis_live_dev WHERE", function(error, rows, fields));
  pool.getConnection(function(error, tempCont){
    if(!!error){
      tempCont.release();
      console.log('Error', error);
    } else {
      console.log('MySQL Pool process successfully connected.');
      var query1 = "SELECT id, project_id, summary FROM mantis_bug_table WHERE id<10";
      tempCont.query(query1, function(error, rows, fields){
        tempCont.release();
        // callback
        if(!!error){
          console.log('Error in the query');
        } else {
          console.log('Query successfully executed!\n');
          // res.send('Hello, ' + rows[0].Name);
          // res.json(rows);
          res.render('project_view', { rows: rows});
          // parse with your rows/ fields
        }
      });
    }
  });
};