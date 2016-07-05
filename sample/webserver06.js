// create server with express
var express = require('express');
var app = express();
var http = require('http');
var port = 3000;

app.get('/', function(req, res){
	res.send('<font color=red>SAMPLE TEXT</font>');
})
http.createServer(app).listen(port);