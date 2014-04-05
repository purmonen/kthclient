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

directives.directive('myTextarea', function() {
    return {
      template: 'Hello world'
    };
});

directives.directive('myPost', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/my-post.html'
  };
});

directives.directive('myProject', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/my-project.html'
  };
});

directives.directive('myForm', function() {
  return {
    restrict: 'E',
    transclude: false,
    templateUrl: 'templates/my-form.html'
  }
});

directives.directive('myField', function($compile) {
  return {
    restrict: 'E',
    template: '<input type="text">'  
  };
});

directives.directive('myModel', function($compile) {
  return {
    restrict: 'A',
    compile: function(element, attr) {
      console.log(element);
      element[0].removeAttribute('my-model');
      return function(scope) {
        console.log(scope.$eval(attr.myModel));

        element[0].setAttribute('ng-model', scope.$eval(attr.myModel));
        console.log(element[0]);
        $compile(element[0])(scope);
      };
    }
  };
});