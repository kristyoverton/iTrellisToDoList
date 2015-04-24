app.controller('ListController', ['$scope', function($scope) {
	$scope.title = 'To Do List';
	$scope.badDate = false;
	$scope.todos = []; //will be an array of objects

	$scope.addTask = function(newTask) {
		// Checks to make sure the day of the month is valid for the month, 
		//then adds the task to the list and resets the form.
		//Dates in the past are valid-- you should be able to keep track of tasks
		//even if you should have already finished them. 

		if (!isValidDay(newTask.deadline)) {
			$scope.badDate = true;
		} else {
			var d = new Date (newTask.deadline.year, newTask.deadline.month, newTask.deadline.day);
			$scope.todos.push(
				{
					task:newTask.task,
					deadline: d,
					details: newTask.details,
					done: false
				});
			$scope.newTask = {};
			$scope.newTaskForm.$setPristine();
		}
	}

	function isValidDay(someday) {
		// checks to make sure the day exists in the month
		if ((someday.day == 31 && 
				(someday.month == 01 || someday.month == 03 || someday.month == 05 || someday.month == 08 || someday.month == 10))
			||
			(someday.day == 30 && someday.month == 01)) {
			return false;
		} else if (someday.day == 29 && someday.month ==01) {
			//leap year calculator
			if (someday.year %4 != 0) {
				return false;
			} else if (someday.year %100 != 0 ) {
				return true;
			} else if (someday.year %400 != 0) {
				return false;
			}
		} else
			return true;
	}

	$scope.showDetails = function(index) {
		//shows the details of a task
		$scope.todos[index].show = true;
	}
	$scope.noDetails = function(index) {
		//hides the details of a task
		$scope.todos[index].show = false;
	}

	$scope.deleteTask = function(index) {
		//deletes a task from the list
		if(confirm("Are you sure you want to delete this task?")) {
			$scope.todos.splice(index,1);
		}
	}

	$scope.toggleDone = function(index) {
	// marks a task as complete if it's not and vice versa

		if($scope.todos[index].done) {
			$scope.todos[index].done = true;
			$scope.todos[index].props = "text-decoration: line-through";
		} else {
			$scope.todos[index].done = false;
			$scope.todos[index].props = "text-decoration: none";
		}
	}

	$scope.isOverdue = function(index) {
		//highlights a task if its deadline has passed
		var today = new Date();
		if (today > $scope.todos[index].deadline) {
			return {'background-color':"#800000",'color':'silver'};
		}
	}
	}]);