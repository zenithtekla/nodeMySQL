var http = require("http");

http.createServer(function(req, res){
	// 404 for not found
	res.writeHead( 200, {"Content-Type": "text/plain"});
	res.end('zetek');
}).listen(8888);