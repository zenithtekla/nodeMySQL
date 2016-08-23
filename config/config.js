'use strict';
var fs    = require('fs'),
    path  = require('path');

var initGlobalConfig = function(){
  return {
        port: process.env.PORT || 1337,
 /*       views: {
          xtsyncs: '/modules/xt_syncs/client/views/',
          calibrate: '/modules/calibrate/client/views/'
        }, */    
        routes: {
          xtsyncs: '/modules/xt_syncs/server/routes/',
          calibrate: '/modules/calibrate/server/routes/'
        },
        modules: getDirectories('modules')
        /* temporary solution as for now
        as fsreaddirSync or Gulp|Grunt|Webpack has not yet been incorporated
        for automatic loading & registering of the files of every module.
        pending buildTool & TestScript (Mocha, Chai, Jasmine...)
        */
    };
};

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();

// ========================= Util method ======================
// pending relocation to config
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}


