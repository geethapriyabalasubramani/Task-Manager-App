import React, { useState } from 'react';
import { useList } from '../context/ListContext';
import './SideNav.css';

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

const SideNav = ({ todos = [] }) => {
  const { lists, activeList, setActiveList, addList, dateFilter, setDateFilter, selectedDate, setSelectedDate } = useList();
  const [showAddInput, setShowAddInput] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListIcon, setNewListIcon] = useState('🗂️');
  const [search, setSearch] = useState('');

  const handleAddList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      addList(newListName.trim(), newListIcon);
      setNewListName('');
      setNewListIcon('🗂️');
      setShowAddInput(false);
    }
  };

  const handleDateFilter = (filter) => {
    setDateFilter(dateFilter === filter ? null : filter);
    setActiveList(null);
  };

  // Calculate dynamic counts
  const todayCount = todos.filter(todo => isSameDay(todo.date, selectedDate)).length;
  const upcomingCount = todos.filter(todo => isUpcoming(todo.date, selectedDate)).length;

  // Filter lists by search
  const filteredLists = Object.entries(lists).filter(([_id, { label, icon }]) =>
    label.toLowerCase().includes(search.toLowerCase()) ||
    (icon && icon.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <nav className="sidenav">
      <div className="search-container">
        <input
          type="text"
          placeholder="Filter lists..."
          className="search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="nav-section">
        <h2>Tasks</h2>
        <ul>
          <li
            className={`nav-item${dateFilter === 'upcoming' ? ' active' : ''}`}
            onClick={() => handleDateFilter('upcoming')}
          >
            <span className="icon">📅</span>
            Upcoming
            <span className="count">{upcomingCount}</span>
          </li>
          <li
            className={`nav-item${dateFilter === 'today' ? ' active' : ''}`}
            onClick={() => handleDateFilter('today')}
          >
            <span className="icon">📝</span>
            Today
            <span className="count">{todayCount}</span>
          </li>
          {dateFilter === 'today' && (
            <div style={{ padding: '0.5rem 1rem' }}>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          )}
          <li
            className={`nav-item${dateFilter === 'calendar' ? ' active' : ''}`}
            onClick={() => handleDateFilter('calendar')}
          >
            <span className="icon">📆</span>
            Calendar
          </li>
          <li
            className={`nav-item${!dateFilter && !activeList ? ' active' : ''}`}
            onClick={() => { setDateFilter(null); setActiveList(null); }}
          >
            <span className="icon">📌</span>
            Sticky Wall
          </li>
        </ul>
      </div>

      <div className="nav-section">
        <h2>Lists</h2>
        <ul>
          {filteredLists.map(([id, { icon, label, count }]) => (
            <li
              key={id}
              className={`nav-item${activeList === id ? ' active' : ''}`}
              onClick={() => { setActiveList(activeList === id ? null : id); setDateFilter(null); }}
            >
              <span className="icon">{icon}</span>
              {label}
              {count > 0 && <span className="count">{count}</span>}
            </li>
          ))}
        </ul>
        {showAddInput ? (
          <form className="add-list-form" onSubmit={handleAddList}>
            <input
              className="add-list-input"
              type="text"
              value={newListName}
              onChange={e => setNewListName(e.target.value)}
              placeholder="List name"
              autoFocus
              required
            />
            <input
              className="add-list-icon"
              type="text"
              value={newListIcon}
              onChange={e => setNewListIcon(e.target.value)}
              maxLength={2}
              style={{ width: 32, textAlign: 'center' }}
              title="Icon (emoji)"
            />
            <button type="submit" className="add-list-save">✔</button>
            <button type="button" className="add-list-cancel" onClick={() => setShowAddInput(false)}>✖</button>
          </form>
        ) : (
          <button className="add-list-button" onClick={() => setShowAddInput(true)}>
            <span className="icon">+</span>
            Add New List
          </button>
        )}
      </div>
    </nav>
  );
};

export default SideNav; 