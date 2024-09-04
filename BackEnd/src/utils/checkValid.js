const { EMAIL_REGEX } = require('../constants');

const validateEmail = (email) => EMAIL_REGEX.test(String(email).toLowerCase());

module.exports = { validateEmail };
