var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
	render: function () {
		var {todos, onToggle} = this.props;
		var renderTodos = function(){
			if (todos.length === 0) {
				return (
					<p className="container__message">Niets om te doen</p>
				)
			}


			return todos.map((todo) => {
				return (<Todo key={todo.id} {...todo} onToggle={onToggle}/>)
			});
		};

		return (
			<div>
				{renderTodos()}
			</div>
		)
	}
});

module.exports = TodoList;