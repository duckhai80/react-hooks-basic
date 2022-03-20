import PropTypes from "prop-types";
import React from "react";

TodoList.propTypes = {
  todos: PropTypes.array,
  onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  onTodoListClick: null,
};

function TodoList(props) {
  const { todos, onTodoListClick } = props;

  function handleTodoClick(todo) {
    if (onTodoListClick) {
      onTodoListClick(todo);
    }
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => handleTodoClick(todo)}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
