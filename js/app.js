'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
  	templateUrl: 'partials/wall.html',
  	controller: 'PostCtrl'
  });
  $routeProvider.when('/projects', {
  	templateUrl: 'partials/projects.html',
  	controller: 'ProjectCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/'});
  //$locationProvider.html5Mode(true);
}]);