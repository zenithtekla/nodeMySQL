var express = require('express'),
    router  = express.Router(),
    mysql   = require('mysql'),
    path    = require('path'),
    env     = process.env.NODE_ENV || "development";

/* load sql_config */
var __basepath =  process.cwd();
    // __basepath = 'c:\\' + __basepath.replace(/\//g, "\\").substr(3);
var sql = require( __basepath +'/config/db/sql_config.json')[env];

// implement connectionPool
var pool = mysql.createPool(sql);

router.get('/', function (req,res) {
    console.log('my process is ', process.cwd());
    // pool.query("SELECT * FROM mantis_live_dev WHERE", function(error, rows, fields));
    pool.getConnection(function(error, tempCont){
        if(!!error){
            tempCont.release();
            console.log('Error', error);
        } else {
            console.log('MySQL Pool process successfully connected.');
            var query1 = "SELECT * FROM mysampletable WHERE id>10";
            tempCont.query(query1, function(error, rows, fields){
                tempCont.release();
                // callback
                if(!!error){
                    console.log('Error in the query');
                } else {
                    console.log('Query successfully executed!\n');
                    var len = rows.length;
                    // res.send('Hello, ' + rows[0].Name);
                    // res.json(rows);
                    res.render('client_crud_view_chars', { rows: rows, len: len});
                    // parse with your rows/ fields
                }
            });
        }
    });
});
module.exports = router;