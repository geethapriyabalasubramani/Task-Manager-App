import React from 'react';
import './TodoCard.css';

const TodoCard = ({ title, tasks, color, onDelete }) => {
  return (
    <div className="todo-card" style={{ backgroundColor: color }}>
      <div className="todo-card-header">
        <h3>{title}</h3>
        <button className="delete-button" onClick={onDelete}>×</button>
      </div>
      <ul className="todo-tasks">
        {tasks.map((task, index) => (
          <li key={index}>- {task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCard; 