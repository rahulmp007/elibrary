const { MESSAGES } = require('../config/constants');

/**
 * Get localized message based on key and language
 * @param {string} key - Message key (e.g., 'USER_CREATED', 'BOOK_NOT_FOUND')
 * @param {string} language - Language code ('en' or 'hi')
 * @returns {string} Localized message
 */
const getLocalizedMessage = (key, language = 'en') => {
  // Ensure language is valid
  const lang = ['en', 'hi'].includes(language) ? language : 'en';
  
  // Get message from constants
  const message = MESSAGES[lang][key];
  
  // Fallback to English if translation not found
  if (!message && lang !== 'en') {
    return MESSAGES.en[key] || key;
  }
  
  return message || key;
};

module.exports = { getLocalizedMessage };