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
  	controller: 'WallCtrl'
  });
  $routeProvider.when('/projects', {
  	templateUrl: 'partials/projects.html',
  	controller: 'ProjectCtrl'
  });
  $routeProvider.when('/post/:index', {
    templateUrl: 'partials/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/post', {
    templateUrl: 'partials/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/save', {
    templateUrl: 'partials/save.html',
    controller: 'PostCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/'});
  //$locationProvider.html5Mode(true);
}]);