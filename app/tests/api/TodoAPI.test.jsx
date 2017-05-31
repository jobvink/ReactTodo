var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
	beforeEach(() => {
		localStorage.removeItem('todos');
	});

	it('should exist', () => {
		expect(TodoAPI).toExist();
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