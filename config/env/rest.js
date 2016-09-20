'use strict';

/* RESTful */
module.exports  = function(db, rest) {
  var todoResource = rest.resource({
    model: db.Todo,
    endpoints: ['/mytodos', '/mytodos/:id'],
    search: {
      param: 'tasks',
      attributes:['task']
    } // from Eric Stevens ppt, localhost:3000/mytodos?tasks=myTask1
    /* 
     *  Query Search by Param
     http://localhost:1337/mytodos/?tasks=1
     GET ALL
     http://localhost:1337/mytodos/?tasks

     GET, POST
     http://localhost:1337/mytodos/
     PUT to update, DELETE
     http://localhost:1337/mytodos/2
     * 
     * */
  });
};