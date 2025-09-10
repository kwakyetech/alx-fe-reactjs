// localStorage utility functions for Recipe Sharing App

/**
 * Safely save data to localStorage
 * @param {string} key - The key to store data under
 * @param {any} data - The data to store (will be JSON stringified)
 * @returns {boolean} - Success status
 */
export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage with key "${key}":`, error);
    return false;
  }
};

/**
 * Safely load data from localStorage
 * @param {string} key - The key to retrieve data from
 * @param {any} defaultValue - Default value if key doesn't exist or parsing fails
 * @returns {any} - The parsed data or default value
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Error loading from localStorage with key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - The key to remove
 * @returns {boolean} - Success status
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage with key "${key}":`, error);
    return false;
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} - Whether localStorage is supported
 */
export const isLocalStorageAvailable = () => {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn('localStorage is not available:', error);
    return false;
  }
};

// Storage keys for the Recipe Sharing App
export const STORAGE_KEYS = {
  RECIPES: 'recipeApp_recipes',
  FAVORITES: 'recipeApp_favorites',
  SEARCH_TERM: 'recipeApp_searchTerm'
};