var React = require('react');
var {connect} = require('react-redux');
import Todo from 'Todo'
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
	render: function () {
		var {todos, showCompleted, searchText} = this.props;
		var renderTodos = function(){
			if (todos.length === 0) {
				return (
					<p className="container__message">Niets om te doen</p>
				)
			}


			return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
				return (<Todo key={todo.id} {...todo} />)
			});
		};

		return (
			<div>
				{renderTodos()}
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state;
	}
)(TodoList);