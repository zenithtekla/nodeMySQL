(function () {
  'use strict';
  var app = angular
    .module('manukeApp', [
      'ui.router',
      'ngAnimate',
      'ui.bootstrap',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch'
    ]);

  app.config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/state1');
    $urlRouterProvider.otherwise('/404');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/client/views/index',
        controller: 'coreCtrl'
      })
      .state('state1', {
        url: "/state1",
        templateUrl: "includes/state1.html"
      })
      .state('state1.list', {
        url: "/list",
        templateUrl: "includes/state1.list.html",
        controller: function($scope) {
          $scope.items = ["A", "List", "Of", "Items"];
        }
      })
      .state('state2', {
        url: "/state2",
        templateUrl: "includes/state2.html"
      })
      .state('state2.list', {
        url: "/list",
        templateUrl: "includes/state2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      })
      .state('main', {
        url: '/table_main',
        templateUrl: 'modules/calibrates/client/views/main',
        controller: 'coreCtrl'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/client/views/error',
        data: {
          ignoreState: true,
          pageTitle: 'Not-Found'
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: 'modules/core/client/views/error',
        data: {
          ignoreState: true,
          pageTitle: 'Bad-Request'
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'modules/core/client/views/error',
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden'
        }
      });
  }
}());