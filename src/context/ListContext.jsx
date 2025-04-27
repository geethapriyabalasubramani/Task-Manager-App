import React, { createContext, useState, useContext } from 'react';

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState({
    personal: { count: 0, icon: '👤', label: 'Personal' },
    work: { count: 0, icon: '💼', label: 'Work' },
    list1: { count: 0, icon: '📝', label: 'List 1' }
  });
  const [activeList, setActiveList] = useState(null); // null means show all
  const [dateFilter, setDateFilter] = useState(null); // null, 'today', 'upcoming', 'calendar'
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const incrementListCount = (listId) => {
    setLists(prev => ({
      ...prev,
      [listId]: {
        ...prev[listId],
        count: prev[listId].count + 1
      }
    }));
  };

  const decrementListCount = (listId) => {
    setLists(prev => ({
      ...prev,
      [listId]: {
        ...prev[listId],
        count: Math.max(0, prev[listId].count - 1)
      }
    }));
  };

  const addList = (label, icon = '🗂️') => {
    const id = label.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
    setLists(prev => ({
      ...prev,
      [id]: { count: 0, icon, label }
    }));
    return id;
  };

  return (
    <ListContext.Provider value={{
      lists,
      incrementListCount,
      decrementListCount,
      activeList,
      setActiveList,
      addList,
      dateFilter,
      setDateFilter,
      selectedDate,
      setSelectedDate
    }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};

export default ListContext; 