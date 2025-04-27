import React, { useState } from 'react';
import TodoList from './components/TodoList';
import SideNav from './components/SideNav';
import { ListProvider } from './context/ListContext';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <ListProvider>
      <div className="app">
        <SideNav todos={todos} />
        <main className="main-content">
          <TodoList todos={todos} setTodos={setTodos} />
        </main>
      </div>
    </ListProvider>
  );
}

export default App;
