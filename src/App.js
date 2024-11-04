import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import GroupingButtons from './components/GroupingButtons';
import SortingOptions from './components/SortingOptions';
import fetchTickets from './services/api'; 
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]); 
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  const loadTickets = async () => {
    try {
      const data = await fetchTickets();
      console.log('Fetched tickets:', data); 
      setTickets(data);
    } catch (error) {
      console.error('Failed to load tickets:', error);
    }
  };

  useEffect(() => {
    loadTickets(); 
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <div className="options">
        <GroupingButtons setGroupBy={setGroupBy} currentGroup={groupBy} />
        <SortingOptions setSortBy={setSortBy} />
      </div>
      <Board tickets={tickets} groupBy={groupBy} sortBy={sortBy} />
      {tickets.length === 0 && <p>No tickets available.</p>} {/* Display message when no tickets */}
    </div>
  );
}

export default App;
