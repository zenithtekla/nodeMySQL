var http = require('http');
var fs = require('fs');

var port = 3333;
// Listen on port 8000, IP defaults to 127.0.0.1
var user = {
  age: 30,
  town: 'Sarjo'
};

// 404 response
function send404Response(response){
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("Error 404: Page not found!");
  response.end();
}

function onRequest(req, res){
	console.log("A user made a res "+ req.url);
    if (req.method == "GET" && req.url =="/view" ){
      res.writeHead(200, {"Context-Type": "text/html"}); // setting up the response
      // reading index file and feed it on response object
      fs.createReadStream("./view04.html").pipe(res);
      // res.end();
    } else {
      send404Response(res);
    }
}

http.createServer(onRequest).listen(port);
console.log(' The server is running ...');