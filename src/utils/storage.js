/**
 * Storage utility for managing LocalStorage operations
 * Provides get, set, clear, and remove methods with JSON serialization
 */

export const storage = {
  /**
   * Set a value in LocalStorage
   * @param {string} key - The storage key
   * @param {any} value - The value to store (will be JSON stringified)
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to storage: ${error}`);
    }
  },

  /**
   * Get a value from LocalStorage
   * @param {string} key - The storage key
   * @param {any} defaultValue - Default value if key not found
   * @returns {any} The stored value or default value
   */
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from storage: ${error}`);
      return defaultValue;
    }
  },

  /**
   * Remove a specific key from LocalStorage
   * @param {string} key - The storage key to remove
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage: ${error}`);
    }
  },

  /**
   * Clear all items from LocalStorage
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing storage: ${error}`);
    }
  },

  /**
   * Get all keys from LocalStorage
   * @returns {string[]} Array of all storage keys
   */
  getAllKeys: () => {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error(`Error getting storage keys: ${error}`);
      return [];
    }
  },
};

export default storage;
