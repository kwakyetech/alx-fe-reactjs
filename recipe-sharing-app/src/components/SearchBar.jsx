import React from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-8 flex justify-center items-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 pr-12 text-base border-2 border-gray-300 rounded-full outline-none transition-colors duration-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-lg">
          🔍
        </div>
      </div>
    </div>
  );
};

export default SearchBar;