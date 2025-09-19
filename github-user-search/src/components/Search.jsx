import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  const [searchType, setSearchType] = useState('username'); // 'username' or 'advanced'
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const RESULTS_PER_PAGE = 30;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (searchType === 'username' && username.trim()) {
      setLoading(true);
      setError(null);
      setUser(null);
      setUsers([]);
      setCurrentPage(1);
      setTotalCount(0);
      setHasMore(false);

      try {
        const userData = await fetchUserData(username.trim());
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else if (searchType === 'advanced' && (username.trim() || location.trim() || minRepos.trim())) {
      setLoading(true);
      setError(null);
      setUser(null);
      setUsers([]);
      setCurrentPage(1);
      setTotalCount(0);
      setHasMore(false);

      try {
        const searchResults = await searchUsers({
          username: username.trim(),
          location: location.trim(),
          minRepos: minRepos.trim(),
          page: 1,
          perPage: RESULTS_PER_PAGE
        });
        setUsers(searchResults.items || []);
        setTotalCount(searchResults.total_count || 0);
        setHasMore((searchResults.items?.length || 0) === RESULTS_PER_PAGE && searchResults.total_count > RESULTS_PER_PAGE);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const loadMoreResults = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const searchResults = await searchUsers({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos.trim(),
        page: nextPage,
        perPage: RESULTS_PER_PAGE
      });

      setUsers(prevUsers => [...prevUsers, ...(searchResults.items || [])]);
      setCurrentPage(nextPage);
      setHasMore((searchResults.items?.length || 0) === RESULTS_PER_PAGE && users.length + (searchResults.items?.length || 0) < totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Search Type Toggle */}
      <div className="mb-6 text-center">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setSearchType('username')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              searchType === 'username'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Username Search
          </button>
          <button
            type="button"
            onClick={() => setSearchType('advanced')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              searchType === 'advanced'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Advanced Search
          </button>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        {searchType === 'username' ? (
          // Username Search Form
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 max-w-lg mx-auto">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300/30 active:translate-y-0 w-full sm:w-auto"
            >
              Search
            </button>
          </div>
        ) : (
          // Advanced Search Form
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Search</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., octocat"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., San Francisco"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                  Min Repositories
                </label>
                <input
                  id="minRepos"
                  type="number"
                  value={minRepos}
                  onChange={(e) => setMinRepos(e.target.value)}
                  placeholder="e.g., 10"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300/30 active:translate-y-0"
            >
              Search Users
            </button>
          </div>
        )}
      </form>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg text-gray-600">Searching...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 font-medium">{error}</span>
            </div>
          </div>
        </div>
      )}

      {/* Single User Result (Username Search) */}
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
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                {user.location && (
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {user.location}
                  </div>
                )}
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {user.public_repos} repositories
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {user.followers} followers
                </div>
              </div>
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

      {/* Multiple Users Results (Advanced Search) */}
      {users.length > 0 && !loading && !error && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Search Results ({users.length} of {totalCount} users found)
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={user.avatar_url} 
                    alt={`${user.login}'s avatar`}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {user.login}
                    </h3>
                    <p className="text-sm text-gray-600">Score: {user.score?.toFixed(1)}</p>
                  </div>
                </div>
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={loadMoreResults}
                disabled={loadingMore}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loadingMore ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading More...
                  </div>
                ) : (
                  'Load More Results'
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {searchType === 'advanced' && users.length === 0 && !loading && !error && (username || location || minRepos) && (
        <div className="text-center py-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;