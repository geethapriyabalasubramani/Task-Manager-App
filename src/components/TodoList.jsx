import React from 'react';
import TodoCard from './TodoCard';
import Modal from './Modal';
import TodoForm from './TodoForm';
import { useList } from '../context/ListContext';
import './TodoList.css';

function isSameDay(dateStr, selectedDate) {
  if (!dateStr || !selectedDate) return false;
  const d = new Date(dateStr);
  const s = new Date(selectedDate);
  return d.getFullYear() === s.getFullYear() &&
    d.getMonth() === s.getMonth() &&
    d.getDate() === s.getDate();
}

function isUpcoming(dateStr, selectedDate) {
  if (!dateStr || !selectedDate) return false;
  const s = new Date(selectedDate);
  s.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return d > s;
}

const TodoList = ({ todos, setTodos }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { activeList, setActiveList, lists, dateFilter, setDateFilter, selectedDate } = useList();

  const addTodo = (newTodo) => {
    setTodos([...todos, { ...newTodo, id: Date.now() }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  let filteredTodos = todos;
  if (activeList) {
    filteredTodos = filteredTodos.filter(todo => todo.listId === activeList);
  }
  if (dateFilter === 'today') {
    filteredTodos = filteredTodos.filter(todo => isSameDay(todo.date, selectedDate));
  } else if (dateFilter === 'upcoming') {
    filteredTodos = filteredTodos.filter(todo => isUpcoming(todo.date, selectedDate));
  } else if (dateFilter === 'calendar') {
    filteredTodos = filteredTodos.filter(todo => todo.date);
  }
  // If no filter, show all todos (Sticky Wall)

  // Clear both filters
  const clearFilters = () => {
    setActiveList(null);
    setDateFilter(null);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Sticky Wall</h1>
      </div>
      {activeList && (
        <div className="filter-indicator">
          Filtering: <b>{lists[activeList]?.label}</b>
          <button className="clear-filter" onClick={clearFilters} title="Clear filter">×</button>
        </div>
      )}
      {dateFilter && (
        <div className="filter-indicator">
          Filtering: <b>{dateFilter === 'today' ? `Today (${selectedDate})` : dateFilter.charAt(0).toUpperCase() + dateFilter.slice(1)}</b>
          <button className="clear-filter" onClick={clearFilters} title="Clear filter">×</button>
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