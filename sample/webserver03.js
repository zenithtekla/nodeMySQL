var http = require('http');
var fs = require('fs');

var port = 3333;

function onRequest(req, res){
	res.writeHead(200, {'Content-Type':'text/html'});
	var data = fs.readFileSync(__dirname + '/view03.html', 'utf-8');
	res.end(data);
}

http.createServer(onRequest).listen(port);