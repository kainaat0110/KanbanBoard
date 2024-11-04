import React from 'react';

function DisplayOptions({ setGroupBy }) {
  return (
    <div className="display-options">
      <label>Group By: </label>
      <select onChange={e => setGroupBy(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default DisplayOptions;
