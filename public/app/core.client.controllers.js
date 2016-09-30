(function () {
  'use strict';

  var app = angular
    .module('manukeApp', [])
    .controller('coreCtrl', coreCtrlFn);

  coreCtrlFn.$inject = ['$scope', '$http', '$location'];

  function coreCtrlFn($scope, $http, $location) {
    console.log('coreCtrl success');
  }

}());