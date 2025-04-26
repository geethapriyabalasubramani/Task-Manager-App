import React, { useState } from 'react';
import TodoCard from './TodoCard';
import Modal from './Modal';
import TodoForm from './TodoForm';
import { useList } from '../context/ListContext';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeList, setActiveList, lists } = useList();

  const addTodo = (newTodo) => {
    setTodos([...todos, { ...newTodo, id: Date.now() }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filter todos by activeList if set
  const filteredTodos = activeList
    ? todos.filter(todo => todo.listId === activeList)
    : todos;

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Sticky Wall</h1>
      </div>
      {activeList && (
        <div className="filter-indicator">
          Filtering: <b>{lists[activeList]?.label}</b>
          <button className="clear-filter" onClick={() => setActiveList(null)} title="Clear filter">×</button>
        </div>
      )}
      <div className="todo-grid">
        {filteredTodos.map(todo => (
          <TodoCard
            key={todo.id}
            title={todo.title}
            tasks={todo.tasks}
            color={todo.color}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
        <button className="add-todo-button" onClick={() => setIsModalOpen(true)}>
          <span>+</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TodoForm
          onSubmit={addTodo}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TodoList; 