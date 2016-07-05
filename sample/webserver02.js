var http = require('http');

var port = 3333;
// Listen on port 8000, IP defaults to 127.0.0.1

var server = http.createServer(function(req, res){
	res.writeHead( 200, {"Content-Type": "text/plain"});
	res.end('zetek');
});

server.listen(port);