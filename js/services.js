'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', ['ngResource', 'ngCookies']);

/*
services.factory('Post', ['$resource',
  function($resource) {
    return $resource('http://localhost:3000/:user/KTH', {user: 'root'});
  }]);
*/

services.factory('Post', ['$resource',
	function($resource) {
		var data = [];
		var $res = $resource('http://localhost:3000/:user/KTH', {user: 'root'});
		var changeManager = new ChangeManager([]);

		$res.query(function(posts) {
			changeManager = new ChangeManager(posts);
		});

		return {
			add: function(post) { 
				changeManager.change(function(posts) {
					posts.push(post);
				});
			},
			edit: function(editPost, index) {
				changeManager.change(function(posts) {
					var post = posts[index];
					post.content = editPost.content;
					post.color = editPost.color;
				});
			},
			delete: function(index) {
				changeManager.change(function(posts) {
					posts.splice(index, 1);
				});
			},
			get: function() { 
				return changeManager.get();
			},
			save: function(success, error) {
				$res.save(changeManager.get()).$promise.then(success, error);
			},
			canUndo: function() {
				return changeManager.canUndo();
			},
			canRedo: function() {
				return changeManager.canRedo();
			},
			undo: function() {
				changeManager.undo();
			},
			redo: function() {
				changeManager.redo();
			}
		};
	}]);