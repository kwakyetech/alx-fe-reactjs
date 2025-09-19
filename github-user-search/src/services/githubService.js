import axios from 'axios';

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

    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('User not found');
      } else if (error.response.status === 403) {
        throw new Error('API rate limit exceeded');
      } else {
        throw new Error(`HTTP error! status: ${error.response.status}`);
      }
    }
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Search for GitHub users with advanced criteria and pagination
 * @param {Object} searchParams - Search parameters object
 * @param {string} searchParams.username - Username to search for
 * @param {string} searchParams.location - Location to filter by
 * @param {string} searchParams.minRepos - Minimum number of repositories
 * @param {number} searchParams.page - Page number for pagination (default: 1)
 * @param {number} searchParams.perPage - Results per page (default: 30, max: 100)
 * @returns {Promise<Object>} Search results from GitHub API
 */
export const searchUsers = async (searchParams) => {
  try {
    const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (apiKey) {
      headers['Authorization'] = `token ${apiKey}`;
    }

    // Build search query based on parameters
    let queryParts = [];
    
    if (searchParams.username) {
      queryParts.push(searchParams.username);
    }
    
    if (searchParams.location) {
      queryParts.push(`location:${searchParams.location}`);
    }
    
    if (searchParams.minRepos) {
      queryParts.push(`repos:>=${searchParams.minRepos}`);
    }

    // If no search criteria provided, return empty results
    if (queryParts.length === 0) {
      return { items: [], total_count: 0 };
    }

    const query = queryParts.join(' ');
    const page = searchParams.page || 1;
    const perPage = Math.min(searchParams.perPage || 30, 100); // GitHub API max is 100
    
    const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&sort=repositories&order=desc`, {
      headers
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new Error('API rate limit exceeded');
      } else if (error.response.status === 422) {
        throw new Error('Invalid search query');
      } else {
        throw new Error(`HTTP error! status: ${error.response.status}`);
      }
    }
    console.error('Error searching users:', error);
    throw error;
  }
};