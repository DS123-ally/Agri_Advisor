/**
 * Validation utility for form inputs and data validation
 */

export const validation = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number (10 digits)
   * @param {string} phone - Phone to validate
   * @returns {boolean} True if valid phone
   */
  isValidPhone: (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
  },

  /**
   * Validate required field
   * @param {string} value - Value to check
   * @returns {boolean} True if not empty
   */
  isNotEmpty: (value) => {
    return value && value.trim().length > 0;
  },

  /**
   * Validate number range
   * @param {number} value - Value to check
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {boolean} True if within range
   */
  isInRange: (value, min, max) => {
    return value >= min && value <= max;
  },

  /**
   * Validate positive number
   * @param {number} value - Value to check
   * @returns {boolean} True if positive
   */
  isPositive: (value) => {
    return value > 0;
  },
};

export default validation;
