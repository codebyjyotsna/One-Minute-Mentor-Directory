import React, { useState } from 'react';

const FilterBar = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange({ category: e.target.value, search: searchTerm });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ category: selectedCategory, search: e.target.value });
  };

  return (
    <div className="filter-bar">
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by title or tags..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default FilterBar;
