import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2 max-w-lg mx-auto">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300/30 active:translate-y-0"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;