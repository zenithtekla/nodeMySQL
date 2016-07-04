// import modules
var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
	// properties ...
		host:'localhost',
		user:'root',
		password:'KTMEi',
		database:'mantis_live_dev'
});

connection.connect(function(error){
	if (!!error){
		console.log('Error');
	} else
		console.log('dB connected!');
});

app.get('/', function(req, res){
	// about mysql
	// connection.query("SELECT * FROM mantis_live_dev WHERE", function(error, rows, fields));
	var query1 = "SELECT * FROM mysampletable WHERE id>10"
	connection.query(query1, function(error, rows, fields){
		// callback
		if(!!error){
			console.log('Error in the query');
		} else {
			console.log('Success!\n');
			console.log(rows);
			res.send('Hello, ' + rows[0].Name);
			// parse with your rows/ fields
		}
	});
});

app.listen(1337);