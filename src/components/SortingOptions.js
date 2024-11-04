import React from 'react';
import '../css/SortingOptions.css';

import Dropdown from './Dropdown';

const SortingOptions = ({ setSortBy, currentSort }) => {
  // Define sorting options here
  const sortingOptions = [
    { label: 'Priority', value: 'priority' },
    { label: 'Title', value: 'title' },
  ];

  // Handle the change when a different option is selected
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className='grouping-dropdown'>
      <Dropdown
      label="Sort by: "
      options={sortingOptions}
      selectedValue={currentSort}
      onChange={handleSortChange}
    />
    </div>
  );
};
export default SortingOptions;


