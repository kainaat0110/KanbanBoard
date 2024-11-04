import React from 'react';

const Dropdown = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="dropdown">
      <label style={{ paddingRight: '8px' }}>{label}</label>
      <select value={selectedValue} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};


export default Dropdown;
