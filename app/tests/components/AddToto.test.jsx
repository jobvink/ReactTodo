var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
	it('should exist', () => {
		expect(AddTodo).toExist();
	});

	it('should call onAddTodo prop with vailid data', () => {
		var TodoText = 'Bekijk je mail';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.todoText.value = TodoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toHaveBeenCalledWith(TodoText);
	});

	it('should not call onAddTodo prop when invalid value', () => {
		var TodoText = '';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.todoText.value = TodoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	})
});