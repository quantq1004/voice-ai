const logger = require('@vbee-holding/node-logger');
const { NODE_ENV, PRODUCT, SERVER_ENV } = require('../configs');

const childLogger = logger.child({
  env: NODE_ENV,
  product: PRODUCT,
  server: SERVER_ENV,
  service: 'mobifone-tts-stats',
});

module.exports = childLogger;
