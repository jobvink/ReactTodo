var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
	beforeEach(() => {
		localStorage.removeItem('todos');
	});

	it('should exist', () => {
		expect(TodoAPI).toExist();
	});

	describe('setTodos', () => {
		it('should set valid todos array', () => {
			var todos = [{
				id: 23,
				text: 'test all files',
				completed: false
			}];
			TodoAPI.setTodos(todos);

			var actualTodos = JSON.parse(localStorage.getItem('todos'));
			expect(actualTodos).toEqual(todos);
		});

		it('should not set invalid todos array', () => {
			var badTodos = {a: 'b'};
			TodoAPI.setTodos(badTodos);

			expect(localStorage.getItem('todos')).toBe(null);
		});
	});

	describe('getTodos', () => {
		it('should return empty array for bad localstorage data', () => {
			var actualTodos = TodoAPI.getTodos();
			expect(actualTodos).toEqual([]);
		});

		it('should return todos when valid data', () => {
			var todos = [{
				id: 23,
				text: 'test all files',
				completed: false
			}];
			localStorage.setItem('todos', JSON.stringify(todos));

			var actualTodos = TodoAPI.getTodos();
			expect(actualTodos).toEqual(todos);
		})
	});

	describe('filterTodos', () => {
		var todos = [{
			id: 1,
			text: 'Test Tekst',
			completed: true
		}, {
			id: 2,
			text: 'Test met id 2',
			completed: false
		}, {
			id: 3,
			text: 'Test Tekst',
			completed: true
		}];
		it('should return all items if showcompleted is true', () => {
			var filterdTodos = TodoAPI.filterTodos(todos, true, '');
			expect(filterdTodos.length).toBe(3);
		});

		it('should return only items that are not completed when showCompleted is false', () => {
			var filterdTodos = TodoAPI.filterTodos(todos, false, '');
			expect(filterdTodos.length).toBe(1);
		});

		it('should sort by completed status', () => {
			var filterdTodos = TodoAPI.filterTodos(todos, true, '');
			expect(filterdTodos[0].completed).toBe(false);
		});

		it('should filter by completed searchText', () => {
			var filterdTodos = TodoAPI.filterTodos(todos, true, 'tekst');
			expect(filterdTodos.length).toBe(2);
		});

		it('should return all todos if searchText is empty', () => {
			var filterdTodos = TodoAPI.filterTodos(todos, true, '');
			expect(filterdTodos.length).toBe(3);
		});
	})
});