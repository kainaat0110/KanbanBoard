import React from 'react';
import './SortingOptions.css';

function SortingOptions({ setSortBy }) {
  return (
    <div className="sorting-options">
      <button onClick={() => setSortBy('priority')}>Sort by Priority</button>
      <button onClick={() => setSortBy('title')}>Sort by Title</button>
    </div>
  );
}

export default SortingOptions;
