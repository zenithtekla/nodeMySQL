'use strict';
var sql = {
    connectionLimit: 90, // only 90 queries at a time
    host: 'localhost',
    user: 'root',
    password: 'KTMEi',
    database: 'mantis_live_dev',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};
module.exports = sql;