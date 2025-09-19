import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      setLoading(true);
      setError(null);
      setUser(null);

      try {
        const userData = await fetchUserData(username.trim());
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 max-w-lg mx-auto px-4 sm:px-0">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <button 
            type="submit" 
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-lg text-sm sm:text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300/30 active:translate-y-0 w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <div className="text-lg text-red-600">Looks like we cant find the user</div>
        </div>
      )}

      {/* Success State - Display User Info */}
      {user && !loading && !error && (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-200"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {user.name || user.login}
              </h2>
              <p className="text-indigo-600 text-lg font-medium mb-3">@{user.login}</p>
              {user.bio && (
                <p className="text-gray-600 mb-4 leading-relaxed">{user.bio}</p>
              )}
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;