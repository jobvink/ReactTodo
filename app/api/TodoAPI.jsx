var $ = require('jQuery');

module.exports = {
	filterTodos: function (todos, showCompleted, searchText) {
		var filterdTodos = todos;

		// Filter door showCompleted
		filterdTodos = filterdTodos.filter((todo) => {
			return !todo.completed || showCompleted;
		});

		// Filter door searchText
		if(searchText.length > 0) {
			filterdTodos = filterdTodos.filter((todo) => {
				var index = todo.text.toLowerCase().indexOf(searchText);
				return index !== -1;
			});
		}

		// Sorteer todos door niet voltooide todos
		filterdTodos.sort((a,  b) => {
			if (!a.completed && b.completed){
				return -1;
			} else if (a.completed && !b.completed){
				return 1;
			} else {
				return 0;
			}
		});

		return filterdTodos;
	}
};