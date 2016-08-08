var express = require('express'),
    router = express.Router(),
    mysql = require('mysql');
//var path = require('path');

/* sequelize for JS, similar to Hibernate (ORM) to Java, Entity to .NET */
var models = require( process.cwd() + '/models');



router.get('/', function (req,res) {
/*    const Sequelize = require('sequelize');
        require('sequelize-isunique-validator')(Sequelize);

    var connection = new Sequelize(sql.database, sql.user, sql.password, {
        host: sql.host,
        dialect: 'mysql', // optional dialect
        pool: sql.pool
    });*/

    // validation of DB connection


    /*// add to assembly table
    var creTask = models.Assembly.create({
        customer_id: 6,
        number:'assy_02',
        revision: 'rev_02',
        unique_key: '_37R0KNO5B'
    });*/

    // var findTask = Assembly.findById(5);

        /* // creTask is similar to the following
        Assembly.create({
            title: ' a brown fire-Ffox',
            content: 'jumps over the fench',
            remark: 'just a jumping fox'
        });*/
    // console.log(models.Assembly);
    models.orm_assembly_table.findAll().then(function(assemblys){

/*        var results = [];
        assemblys.map(assembly=>{
            results.push(assembly.dataValues);
        });*/

        // res.send('200');
        res.render('client_view3', { assemblys: assemblys});
    });
});

module.exports = router;