var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');

var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import TodoApp from 'TodoApp';
var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');

import Login from 'Login';

// store.subscribe(() => {
// 	var state = store.getState();
// 	console.log('nieuwe state', store.getState());
// 	TodoAPI.setTodos(state.todos);
// });

// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));

store.dispatch(actions.startAddTodos());

// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');
// <Provider store={store}>
// <TodoApp/>
// </Provider>,

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/">
				<Route path="todo" component={TodoApp} />
				<IndexRoute component={Login} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);
