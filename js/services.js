'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', ['ngResource', 'ngCookies']);

services.factory('Post', ['$resource',
	function($resource) {
		return postResource($resource, 'KTH');
	}]);

services.factory('Project', ['$resource',
	function($resource) {
		return postResource($resource, 'projects');
	}]);

function postResource($resource, id) {
	var data = [];
	var $res = $resource('http://localhost:3000/:user/:id', {user: 'root', id: id});
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
				posts[index] = editPost;
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
}