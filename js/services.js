'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', ['ngResource', 'ngCookies']);

services.factory('Post', ['$resource', '$http',
  function($resource, $http) {
    return $resource('http://localhost:3000/:user/posts/KTH', {user: 'root'});
  }]);
