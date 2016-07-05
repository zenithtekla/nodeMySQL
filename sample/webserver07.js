// create server with express, sendFile
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var port = 3000;
/*c:\inetpub\wwwroot\development\phuc_NodeJS_MySQL\NodeMySQL\sample*/
app.get('/', function(req, res){
	// res.send(__dirname);
	res.sendFile( __dirname + '/view03.html'); // same as './inc03.html'
});
app.get('/mantisbt', function(req, res){
	res.writeHead(200, {"Context-Type": "text/html"});
	// var data = fs.readFileSync('c:/inetpub/wwwroot/development/mantislive/index.php', 'utf-8');
	// res.end(data);
	fs.createReadStream("c:/inetpub/wwwroot/development/mantislive/index.php").pipe(res);
});
app.get('/sum/:i1/:i2', function(req, res){
	var n = req.params.i1;
	var sum = parseInt(req.params.i1) + parseInt(req.params.i2);
	res.send('<h1> Total </h1><br><h2>' + sum + '</h2>');
});
http.createServer(app).listen(port);