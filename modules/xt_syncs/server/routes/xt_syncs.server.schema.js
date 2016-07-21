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
    var Article = connection.define('article', {
        title: Sequelize.STRING,
        content: Sequelize.STRING,
        remark: Sequelize.TEXT
    });

    // add to article table
    var creTask = Article.create({
        title:'first Article',
        content: 'kkk',
        remark: 'a TEXT'
    });

    var findTask = Article.findById(5);

    // this will create a database table if not exist already
    connection.sync({
        // force: true, // drop table
        logging: console.log
    }).then(function(){
        // default article
        creTask.then(function (task) {
            task.save();
        });

        /* // creTask is similar to the following
        Article.create({
            title: ' a brown fire-Ffox',
            content: 'jumps over the fench',
            remark: 'just a jumping fox'
        });*/

        Article.findAll().then(function(articles){
            console.log(articles);
            var results = [];
            articles.map(article=>{
                results.push(article.dataValues);
            });

            // res.send('200');
            res.render('client_view3', { articles: results});
        });
    }).catch(function (error) {
        console.log(error);
    });
});
module.exports = router;