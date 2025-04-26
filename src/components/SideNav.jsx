import React from 'react';
import { useList } from '../context/ListContext';
import './SideNav.css';

const SideNav = () => {
  const { lists, activeList, setActiveList } = useList();

  return (
    <nav className="sidenav">
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
      </div>

      <div className="nav-section">
        <h2>Tasks</h2>
        <ul>
          <li className="nav-item active">
            <span className="icon">📅</span>
            Upcoming
            <span className="count">12</span>
          </li>
          <li className="nav-item">
            <span className="icon">📝</span>
            Today
            <span className="count">5</span>
          </li>
          <li className="nav-item">
            <span className="icon">📆</span>
            Calendar
          </li>
          <li className="nav-item">
            <span className="icon">📌</span>
            Sticky Wall
          </li>
        </ul>
      </div>

      <div className="nav-section">
        <h2>Lists</h2>
        <ul>
          {Object.entries(lists).map(([id, { icon, label, count }]) => (
            <li
              key={id}
              className={`nav-item${activeList === id ? ' active' : ''}`}
              onClick={() => setActiveList(activeList === id ? null : id)}
            >
              <span className="icon">{icon}</span>
              {label}
              {count > 0 && <span className="count">{count}</span>}
            </li>
          ))}
        </ul>
        <button className="add-list-button">
          <span className="icon">+</span>
          Add New List
        </button>
      </div>

      <div className="nav-section">
        <h2>Tags</h2>
        <div className="tags">
          <span className="tag">Tag 1</span>
          <span className="tag">Tag 2</span>
          <button className="add-tag-button">+ Add Tag</button>
        </div>
      </div>
    </nav>
  );
};

export default SideNav; 