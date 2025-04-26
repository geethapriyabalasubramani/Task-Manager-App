import React from 'react';
import TodoList from './components/TodoList';
import SideNav from './components/SideNav';
import { ListProvider } from './context/ListContext';
import './App.css';

function App() {
  return (
    <ListProvider>
      <div className="app">
        <SideNav />
        <main className="main-content">
          <TodoList />
        </main>
      </div>
    </ListProvider>
  );
}

export default App;
