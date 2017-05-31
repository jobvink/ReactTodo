import firbase, {firebaseRef} from 'app/firebase/';
import moment from 'moment';

export var setSearchText = (searchText) => {
	return {
		type: 'SET_SEARCH_TEXT',
		searchText
	}
};

export var toggleShowCompleted = () => {
	return {
		type: 'TOGGLE_SHOW_COMPLETED'
	}
};

export var startAddTodo = (text) => {
	return (dispatch, getState) => {
		var todo = {
			text,
			completed: false,
			createdAt: moment().unix(),
			completedAt: null
		};
		var todoRef = firebaseRef.child('todos').push(todo);

		return todoRef.then(() => {
			dispatch(addTodo({
				...todo,
				id: todoRef.key
			}));
		});
	};
};

export var addTodo = (todo) => {
	return {
		type: 'ADD_TODO',
		todo
	}
};

export var addTodos = (todos) => {
	return {
		type: 'ADD_TODOS',
		todos
	};
};

export var startAddTodos = () => {
	return (dispatch, getState) => {
		var todoRef = firebaseRef.child('todos');
		var reactTodo = [];
		return todoRef.once('value').then((snapshot) => {
			var todos = snapshot.val();

			var keys = Object.keys(todos);

			keys.forEach((key) => {
				var todo = todos[key];
				reactTodo.push({
					id: key,
					text: todo.text,
					completed: todo.completed,
					createdAt: todo.createdAt,
					completedAt: todo.completedAt
				});
			});
			dispatch(addTodos(reactTodo));
		});
	}
};

export var updateTodo = (id, updates) => {
	return {
		type: 'UPDATE_TODO',
		id,
		updates
	};
};

export var startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		var todoRef = firebaseRef.child(`todos/${id}`);
		var updates = {
			completed,
			completedAt: completed ? moment().unix() : null
		};
		return todoRef.update(updates).then(() => {
			dispatch(updateTodo(id, updates));
		});
	};
};

