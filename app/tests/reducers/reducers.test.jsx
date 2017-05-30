var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');
var uuid = require('node-uuid');
var moment = require('moment');

describe('Reducers', () => {
	describe('searchTextReducer', () => {
		it('should set search text', () => {
			var action = {
				type: 'SET_SEARCH_TEXT',
				searchText: 'Een zoek opdracht'
			};
			var res = reducers.searchTextReducer(df(''), df(action));

			expect(res).toEqual(action.searchText);
		});
	});

	describe('showCompletedReducer', () => {
		it('should toggle state', () => {
			var action = {
				type: 'TOGGLE_SHOW_COMPLETED',
				completed: false
			};
			var res = reducers.showCompletedReducer(df(false), df(action));

			expect(res).toBe(true);
		});
	});

	describe('todosReducer', () => {
		it('should add new todo', () => {
			var action = {
				type: 'ADD_TODO',
				text: 'Ga naar school'
			};
			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0].text).toEqual(action.text);
		});

		it('should toggle completed and set timestamp on completedAt', () => {
			var state =  [
				{
					id: uuid(),
					text: 'De eerste test todo',
					completed: false,
					createdAt: moment().unix(),
					completedAt: undefined
				},
				{
					id: uuid(),
					text: 'De tweede test todo',
					completed: false,
					createdAt: moment().unix(),
					completedAt: undefined
				}
			];
			var action = {
				type: 'TOGGLE_TODO',
				id: state[0].id
			};
			var res = reducers.todosReducer(df(state), df(action));

			expect(res[0].completed).toBe(true);
			expect(res[0].completedAt).toNotBe(undefined);
		});

		it('should add existing todos', () => {
			var todos = [{
				id: '111',
				text: 'iets',
				completed: false,
				completedAt: undefined,
				createdAt: 33000
			}];
			var action = {
				type: 'ADD_TODOS',
				todos
			};
			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(todos[0]);
		})
	});
});

