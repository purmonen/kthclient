'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

controllers.controller('ProjectCtrl', ['$scope', '$route',
	function($scope, $route) {
	}]);

controllers.controller('PostCtrl', ['$scope', '$sce', '$route', '$http', '$cookieStore', '$timeout', 'Post',
	function($scope, $sce, $route, $http, $cookieStore, $timeout, Post) {
		$scope.addPostColor = '#ffffff';
		$scope.addPostContent = '';
		$scope.password = $cookieStore.get('password');
		$scope.errorMessage = '';
		$scope.successMessage = '';

		var lastSaveIndex = 0;

		Post.query().$promise.then(function(posts) {
			$scope.changeManager = new ChangeManager(posts);
		}, function() {
			$scope.changeManager = new ChangeManager([]);
		});

		$scope.add = function() {
			var content = {
				content: $scope.addPostContent,
				color: $scope.addPostColor,
				timestamp: Date.now()
			};

			$scope.changeManager.change(function(posts) {
				posts.push(content);
			}).get();
			$scope.addPostContent = '';
			$scope.addPostColor = '#ffffff';
		};

		$scope.showEditModal = function(post) {
			$scope.editContent = post.content;
			$scope.editColor = post.color;
			$scope.editIndex = $scope.changeManager.get().indexOf(post);
			$('#editModal').modal();
		}

		$scope.html = function(html) {
			return $sce.trustAsHtml(html);
		}

		$scope.edit = function() {
			$scope.changeManager.change(function(posts) {
				var post = posts[parseInt($scope.editIndex)];
				post.content = $scope.editContent;
				post.color = $scope.editColor;
			}).get();
		}

		$scope.delete = function(index) {
			$scope.changeManager.change(function(posts) {
				posts.splice($scope.editIndex, 1);
			}).get();
		}

		$scope.save = function() {
			var delay = 3000;
			$http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($scope.password);
			Post.save($scope.changeManager.get()).$promise.then(function() {
				$cookieStore.put('password', $scope.password);
				$scope.successMessage = 'Save successful';
				$timeout(function() {
					$scope.successMessage = '';
				}, delay);
			}, function() {
				$scope.errorMessage = 'Wrong password';
				$timeout(function() {
					$scope.errorMessage = '';
				}, delay);
			});
			lastSaveIndex = $scope.changeManager.getIndex();
		}

		window.onbeforeunload = function() {
			if ($scope.changeManager.getIndex() !== lastSaveIndex) {
				return 'You have unsaved changes. Are you sure you want to leave?';
			}
		}
	}]);