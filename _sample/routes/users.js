var express = require('express');
var router = express.Router();

/*
// regular Express example
router.get('/', function(req, res){
	// look for index.jade or html view file and pass a JSON
	res.render('index', { title: 'Express'});
});*/

router.get('/:p', function(req, res){
	// req.params = '/' a slash partial in the browser
	// req.query = ?user=myApp&age=33
	// console.log(req.query) => { user: 'myApp', age: 33 }
	switch (true) {
		case req.params.p === 'ok':
			res.send('ok');
			break;
		case req.params.p === 'success':
			res.send('200');
			break;
		case req.params.p === 'fail':
			res.send('404');
			break;
		case req.params.p === 'json':
			res.send({
				users: ['John', 'Joe']
			});
			break;
		case req.params.p === 'render':
			res.render('index', { user: 'John', age: 33 });
			break;
		default:
			res.send('a new request received!');
			break;
	}
});


module.exports = router;