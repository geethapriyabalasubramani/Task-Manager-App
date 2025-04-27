import React, { useState } from 'react';
import { useList } from '../context/ListContext';
import './TodoForm.css';

const TodoForm = ({ onSubmit, onClose }) => {
  const { lists, incrementListCount } = useList();
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState(['']);
  const [color, setColor] = useState('#fff9c4');
  const [selectedList, setSelectedList] = useState('personal');
  const [date, setDate] = useState('');

  const colors = [
    { value: '#fff9c4', label: 'Yellow' },
    { value: '#b3e5fc', label: 'Blue' },
    { value: '#ffcdd2', label: 'Red' },
    { value: '#c8e6c9', label: 'Green' },
    { value: '#f8bbd0', label: 'Pink' }
  ];

  const handleAddTask = () => {
    setTasks([...tasks, '']);
  };

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredTasks = tasks.filter(task => task.trim() !== '');
    if (title.trim() && filteredTasks.length > 0) {
      incrementListCount(selectedList);
      onSubmit({
        title,
        tasks: filteredTasks,
        color,
        listId: selectedList,
        date
      });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>Add New Task</h2>
      
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>List</label>
        <select
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          className="list-select"
        >
          {Object.entries(lists).map(([id, { label, icon }]) => (
            <option key={id} value={id}>
              {icon} {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Color</label>
        <div className="color-options">
          {colors.map(({ value, label }) => (
            <div
              key={value}
              className={`color-option ${color === value ? 'selected' : ''}`}
              style={{ backgroundColor: value }}
              onClick={() => setColor(value)}
              title={label}
            />
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Tasks</label>
        {tasks.map((task, index) => (
          <div key={index} className="task-input">
            <input
              type="text"
              value={task}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              placeholder="Enter task"
            />
            {tasks.length > 1 && (
              <button
                type="button"
                className="remove-task"
                onClick={() => handleRemoveTask(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-task" onClick={handleAddTask}>
          + Add Task
        </button>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="submit">
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm; 