function ChangeManager(obj) {
	var changes = [clone(obj)];
	var changeIndex = 0;

	this.getIndex = function() {
		return changeIndex;
	}

	this.canUndo = function() {
		return changeIndex > 0;
	}

	this.canRedo = function() {
		return changeIndex < changes.length-1
	}

	this.undo = function() {
		if (this.canUndo()) changeIndex--;
		return this;
	};

	this.redo = function() {
		if (this.canRedo()) changeIndex++;
		return this;
	};

	this.change = function(func) {
		changes = changes.slice(0, changeIndex+1);
		var obj = clone(this.get());
		func(obj);
		changes.push(clone(obj));
		changeIndex++;
		return this;
	};

	this.get = function() {
		var tmp = changes[changeIndex];
		return tmp;
	};

	function clone(obj) {
		return angular.copy(obj);
	}
}