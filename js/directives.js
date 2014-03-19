'use strict';

/* Directives */


var directives = angular.module('myApp.directives', []);

directives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

directives.directive('activeLink', ['$location',
	function($location) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs, controller) {
        var clazz = attrs.activeLink;
        var path = attrs.href.slice(1);
        $scope.location = $location;
        $scope.$watch('location.path()', function(newPath) {
          if (path === newPath) {
            element.parent().addClass(clazz);
          } else {
            element.parent().removeClass(clazz);
          }
        });
      }
    };
  }]);