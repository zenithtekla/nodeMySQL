var express = require('express'),
    router = express.Router(),
    mysql = require('mysql');
//var path = require('path');

/* sequelize for JS, similar to Hibernate (ORM) to Java, Entity to .NET */
var sql = require( process.cwd() +'/config/db/sql_config');



router.get('/', function (req,res) {
    const Sequelize = require('sequelize');
    var connection = new Sequelize(sql.database, sql.user, sql.password, {
        host: sql.host,
        dialect: 'mysql', // optional dialect
        pool: sql.pool
    });

    // model schema
    var Assembly = connection.define('orm_assembly', {
        customer_id: Sequelize.INTEGER,
        number: Sequelize.TEXT,
        revision: Sequelize.TEXT,
        unique_key: { type: Sequelize.STRING, unique: true}
    });

    // add to assembly table
    var creTask = Assembly.create({
        customer_id: 6,
        number:'assy_02',
        revision: 'rev_02',
        unique_key: '_37R0KNO5B'
    });

    // var findTask = Assembly.findById(5);

    // this will create a database table if not exist already
    connection.sync({
        // force: true, // drop table
        logging: console.log
    }).then(function(){
        // default assembly
        creTask.then(function (task) {
            task.save();
        });

        /* // creTask is similar to the following
        Assembly.create({
            title: ' a brown fire-Ffox',
            content: 'jumps over the fench',
            remark: 'just a jumping fox'
        });*/

        Assembly.findAll().then(function(assemblys){
            var results = [];
            assemblys.map(assembly=>{
                results.push(assembly.dataValues);
            });

            // res.send('200');
            res.render('client_view3', { assemblys: results});
        });
    }).catch(function (error) {
        console.log(error);
    });
});
module.exports = router;