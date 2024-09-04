const snakeCaseKeys = require('snakecase-keys');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const {
  IAM_URL,
  IAM_REALM,
  IAM_CLIENT_ID,
  IAM_CLIENT_SECRET,
} = require('../configs');
const callApi = require('../utils/callApi');

const getAccessToken = async () => {
  const data = {
    clientId: IAM_CLIENT_ID,
    clientSecret: IAM_CLIENT_SECRET,
    grantType: 'client_credentials',
  };

  try {
    const { accessToken } = await callApi({
      method: 'POST',
      url: `${IAM_URL}/auth/realms/${IAM_REALM}/protocol/openid-connect/token`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: new URLSearchParams(snakeCaseKeys(data)),
    });

    return accessToken;
  } catch (error) {
    throw new CustomError(errorCodes.IAM_ERROR);
  }
};

module.exports = { getAccessToken };
