const { MESSAGES } = require('../config/constants');


const getLocalizedMessage = (key, language = 'en') => {
 
  const lang = ['en', 'hi'].includes(language) ? language : 'en';
  
  
  const message = MESSAGES[lang][key];
  
  
  if (!message && lang !== 'en') {
    return MESSAGES.en[key] || key;
  }
  
  return message || key;
};

module.exports = { getLocalizedMessage };