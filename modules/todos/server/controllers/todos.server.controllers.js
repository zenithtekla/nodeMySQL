var db  = require( process.cwd() + '/server').get('models');

// var Todo = db.Todo;

exports.todos = (req,res) => {
  /*// var findTask = Assembly.findById(5);
  Assembly.findAll().then(function(assemblys){
    res.render('assembly_view', { assemblys: assemblys});
  });*/
  var todos = [
    {"task":"task1-simpleTodos app", "description":"using ConsolidateJS and different view engine"},
    {"task":"task2-adding full-blown RESTful API to the Todos app", "description":"to sample the all the get,post,put,delete handlers"},
    {"task":"task3-adding Authenticate-layer API to the Todos app", "description":"to provide an additional handlers in the controllers"},
    {"task":"task4-Package the Todos app", "description":"to provide the Todos app as a pattern to apply for any module app"}
  ];

  // res.send('ok');
  // res.json(todos);
  res.render('todos', {"todos": todos});
};