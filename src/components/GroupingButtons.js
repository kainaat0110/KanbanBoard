import React from 'react';
import './GroupingButtons.css';

function GroupingButtons({ setGroupBy, currentGroup }) {
  const options = [
    { label: 'Status', value: 'status' },
    { label: 'User', value: 'user' },
    { label: 'Priority', value: 'priority' },
  ];

  return (
    <div className="grouping-buttons">
      {options.map(option => (
        <button
          key={option.value}
          className={`group-button ${currentGroup === option.value ? 'active' : ''}`}
          onClick={() => setGroupBy(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default GroupingButtons;
