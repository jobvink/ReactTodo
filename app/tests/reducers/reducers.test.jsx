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
				todo: {
					id: '12332',
					text: 'iets om te doen',
					completed: false,
					createdAt: 213123
				}
			};
			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(action.todo);
		});

		it('should update completed and set timestamp on completedAt', () => {
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
			var updates = {
				completed: false,
				completedAt: null
			};
			var action = {
				type: 'UPDATE_TODO',
				id: state[0].id,
				updates
			};
			var res = reducers.todosReducer(df(state), df(action));

			expect(res[0].completed).toBe(updates.completed);
			expect(res[0].completedAt).toBe(updates.completedAt);
			expect(res[0].text).toEqual(state[0].text);
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
		});
	});

	describe('authReducer', () => {
		it ('should add uid when login', () => {
			var uid = 'some_uid';
			var action = {
				type: 'LOGIN',
				uid
			};
			var res = reducers.authReducer(df({}), df(action));

			expect(res.uid).toEqual(action.uid);
		});

		it('should remove uid when logout', () => {
			var uid = 'some_uid';
			var action = {
				type: 'LOGOUT',
			};
			var res = reducers.authReducer(df({auth: {udi: 'some_uid'}}), df(action));

			expect(res).toEqual({});
		})
	})
});



