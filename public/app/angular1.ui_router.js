var myapp = angular.module('manukeApp', ["ui.router"])
myapp.config(function($stateProvider, $urlRouterProvider){

  // For any unmatched url, send to /state1
  $urlRouterProvider.otherwise("/state1")

  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "includes/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "includes/state1.list.html",
      controller: function($scope){
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
      controller: function($scope){
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    })
})