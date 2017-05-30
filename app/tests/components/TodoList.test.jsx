var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

import {configure} from 'configureStore';
import ConectedTodoList, {TodoList} from 'TodoList';
import ConectedTodo, {Todo} from 'Todo';


describe('TodoList', () => {
	it('should exist', () => {
		expect(TodoList).toExist();
	});

	it('should render one Todo component for each todo item', () => {
		var todos = [{
			id: 1,
			text: 'een ding',
			completed: false,
			completedAt: undefined,
			createdAt: 500
		}, {
			id: 2,
			text: 'tweede ding',
			completed: false,
			completedAt: undefined,
			createdAt: 500
		}];
		var store = configure({
			todos
		});
		var provider = TestUtils.renderIntoDocument(
			<Provider store={store}>
				<ConectedTodoList/>
			</Provider>
		);
		var todolist = TestUtils.scryRenderedComponentsWithType(provider, ConectedTodoList)[0];
		var todosComponents = TestUtils.scryRenderedComponentsWithType(todolist, ConectedTodo);
		expect(todosComponents.length).toBe(todos.length)
	})
});