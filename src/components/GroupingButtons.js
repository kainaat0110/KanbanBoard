import React from 'react';
import '../css/GroupingButtons.css';


function GroupingButtons({ setGroupBy, currentGroup }) {
  const options = [
    { label: 'Status', value: 'status' },
    { label: 'User', value: 'user' },
    { label: 'Priority', value: 'priority' },
  ];

  const handleChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <div className="grouping-dropdown">
      <label>Grouping:  </label>
      <select value={currentGroup} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}



export default GroupingButtons;

