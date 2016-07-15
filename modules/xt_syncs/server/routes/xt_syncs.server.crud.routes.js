var express = require('express'),
    router = express.Router(),
    mysql = require('mysql'),
    path = require('path');
var __basepath =  process.env.PWD;
    __basepath = 'c:\\' + __basepath.replace(/\//g, "\\").substr(3);
var sql = require( __basepath +'/config/db/sql_config');

// implement connectionPool
var connection = mysql.createPool(sql);

router.get('/view3', function (req,res) {

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
                    var len = rows.length;
                    // res.send('Hello, ' + rows[0].Name);
                    // res.json(rows);
                    res.render('client_view3', { rows: rows, len: len});
                    // parse with your rows/ fields
                }
            });
        }
    });
    console.log(sql);

});
module.exports = router;