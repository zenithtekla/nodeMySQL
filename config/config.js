'use strict';

var initGlobalConfig = function(){
    var config = {
        port: 1337,
        db: '/config/db/',
        xt_sync: {
          views: '/modules/xt_syncs/client/views/',
          routes: '/modules/xt_syncs/server/routes/'
        }
    };
  return config;
};

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();
