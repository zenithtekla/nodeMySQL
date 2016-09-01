'use strict';
var path   = require('path'),
    utils  = require('./assets/utils');

var initGlobalConfig = function(){
  return {
        port: process.env.PORT || 1337,
        modules: utils.getDirectories('modules'),
        apps: utils.getAppsDir('modules'),
        base_path: path.join(__dirname, '../'),
        default_template_engine: 'pug'
        /*
        using regEx on basepath (r4)
         var __basepath =  process.env.PWD;
            __basepath = 'c:\\' + __basepath.replace(/\//g, "\\").substr(3);

        temporary solution as for now
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