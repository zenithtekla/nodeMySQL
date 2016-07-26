'use strict';

var initGlobalConfig = function(){
    return {
        port: process.env.PORT || 1337,
        views: '/modules/xt_syncs/client/views/',
        routes: '/modules/xt_syncs/server/routes/'
    };
};

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();
