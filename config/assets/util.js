var fs      = require('fs'),
    path    = require('path'),
    chalk   = require('chalk'),
    log     = require('chalk-log'),
    _       = require('lodash');
module.exports = {
  getDirectories: function (srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
      return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
  },
  getFiles: function (srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
      return (file.indexOf(".") !== 0) && (file.indexOf("js") !== 0);
    });
  },
  getAppsDir: function (srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
      return file!=="core" && file!=="user"
        && fs.statSync(path.join(srcpath, file)).isDirectory();
    });
  },
  log: log
};

String.prototype.chalk = function (color) {
 return console.log(chalk[color](this));
};

Array.prototype.chalk = function (color, z) {
  z = z || '';
  return console.log(chalk[color](this.join(z)));
  /*
   support the following:
   var arr = ['a brown', 'fox', 'jumps'];
   arr.chalk('red', ' ');
   arr.chalk('red');
  */
};

String.prototype.re = function(pattern){
  pattern = (typeof pattern ==='string') ? new RegExp(pattern) : pattern;
  return pattern.test(this);
};