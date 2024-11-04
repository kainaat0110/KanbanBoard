import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import GroupingButtons from './components/GroupingButtons';
import SortingOptions from './components/SortingOptions';
import { fetchData } from './services/api';
import './App.css';
import Down from './icons/down.svg'
import Display from './icons/Display.svg'

function App() {
  const [tickets, setTickets] = useState([]); 
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const loadData = async () => {
    try {
      const { tickets, users } = await fetchData();
      setTickets(tickets);
      setUsers(users);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="app">
      <div className="display-dropdown">
        <button variant="outline" onClick={toggleDropdown} className="display-button">
          <img src={Display} style={{paddingRight: '0.3rem'}} alt="display" />
          Display
          <span style={{paddingRight: '0.3rem'}}><img src={Down} alt="down" /></span>
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <GroupingButtons setGroupBy={setGroupBy} currentGroup={groupBy} />
            <SortingOptions setSortBy={setSortBy} currentSort={sortBy} />
          </div>
        )}
      </div>
      <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left' }} className='board'>
        <Board 
          tickets={tickets} 
          users={users}
          groupBy={groupBy} 
          sortBy={sortBy} 
        />
        {tickets.length === 0 && <p>No tickets available.</p>}
      </div>
    </div>
  );
}

export default App;