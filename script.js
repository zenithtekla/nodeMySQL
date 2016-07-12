// import modules
var express = require('express'),
    mysql = require('mysql'),
    cfg = require('./config/config'),
    sql = require('./config/db/sql_config'),
    view_path = cfg.xt_sync.views,
    route_path = cfg.xt_sync.routes,
    path = require('path'),
    pug = require('pug'),
    app = express();

var port = cfg.port;

// configure ROUTES
var display = require('.' + route_path + 'xt_syncs.server.routes');

// console.log(display);

// view engine setup
app.set('views', path.join(__dirname, view_path));
app.set('view engine', 'pug');

// register routes
app.use('/', display);

/*// implement connectionPool
var connection = mysql.createPool(sql);

app.get('/', function(req, res){
	// about mysql
	// connection.query("SELECT * FROM mantis_live_dev WHERE", function(error, rows, fields));
	connection.getConnection(function(error, tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');
		} else {
			console.log('Successfully connected.');
			var query1 = "SELECT * FROM mysampletable WHERE id>10";
			tempCont.query(query1, function(error, rows, fields){
				tempCont.release();
				// callback
				if(!!error){
					console.log('Error in the query');
				} else {
					console.log('Success!\n');
					console.log(rows);
					// res.send('Hello, ' + rows[0].Name);
					// res.json(rows);
					res.render('index', rows);
					// parse with your rows/ fields
				}
			});
		}
	})
});*/

app.listen(port);