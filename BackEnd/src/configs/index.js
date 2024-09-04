// module.exports = {
//   PORT: process.env.PORT || 80,
//   MONGO_URI: process.env.MONGO_URI,
//   IAM_URL: process.env.IAM_URL,
//   IAM_REALM: process.env.IAM_REALM,
//   IAM_CLIENT_ID: process.env.IAM_CLIENT_ID,
//   IAM_CLIENT_SECRET: process.env.IAM_CLIENT_SECRET,
//   IAM_VALID_CLIENT_IDS: process.env.IAM_VALID_CLIENT_IDS
//     ? process.env.IAM_VALID_CLIENT_IDS.split(',')
//     : [],
//   DB_HOST: process.env.DB_HOST,
//   DB_PORT: process.env.DB_PORT,
//   DB_USER: process.env.DB_USER,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_NAME: process.env.DB_NAME,
//   PAYMENT_HUB_URL: process.env.PAYMENT_HUB_URL,
//   CRM_PAGE_URL: process.env.CRM_PAGE_URL,
//   UPLOAD_URL: process.env.UPLOAD_URL,
//   AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
//   AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
//   AWS_REGION: process.env.AWS_REGION,
//   LAMBDA_FUNCTION_NAME: process.env.LAMBDA_FUNCTION_NAME,
//   VOICE_CLONING_ID: 'voice-cloning',
//   NOTIFICATION_URL: process.env.NOTIFICATION_URL,
//   STT_URL: process.env.STT_URL,
//   STT_TOKEN: process.env.STT_TOKEN,
//   STT_APP_ID: process.env.STT_APP_ID,
//   TTS_API_URL: process.env.TTS_API_URL,
// };

const { A_WEEK } = require('../constants');
const { formatNumber } = require('../utils/number');
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  PEPPER: process.env.PEPPER,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: formatNumber(process.env.JWT_EXPIRES_TIME, A_WEEK),
};
