const BASE_URL = 'https://api.github.com';

/**
 * Fetch GitHub user data by username
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data from GitHub API
 */
export const fetchUserData = async (username) => {
  try {
    const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add authorization header if API key is available
    if (apiKey) {
      headers['Authorization'] = `token ${apiKey}`;
    }

    const response = await fetch(`${BASE_URL}/users/${username}`, {
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      } else if (response.status === 403) {
        throw new Error('API rate limit exceeded');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Search for GitHub users by username
 * @param {string} query - Search query
 * @returns {Promise<Object>} Search results from GitHub API
 */
export const searchUsers = async (query) => {
  try {
    const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (apiKey) {
      headers['Authorization'] = `token ${apiKey}`;
    }

    const response = await fetch(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}`, {
      headers,
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('API rate limit exceeded');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const searchResults = await response.json();
    return searchResults;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};