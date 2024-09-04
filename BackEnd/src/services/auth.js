const jwt = require('jsonwebtoken');
const camelCaseKeys = require('camelcase-keys');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');
// const { IAM_VALID_CLIENT_IDS } = require('../configs');

const verifyAccessToken = async (accessToken) => {
  try {
    let data = jwt.verify(accessToken, IAM_PUBLIC_KEY);
    data = camelCaseKeys(data);
    // const { sub: userId, azp: clientId } = data;
    const { sub: userId } = data;

    if (!userId) throw new CustomError(codes.UNAUTHORIZED);
    // if (!IAM_VALID_CLIENT_IDS.includes(clientId))
    //   throw new CustomError(codes.UNAUTHORIZED);

    return data;
  } catch (error) {
    logger.error(error);
    throw new CustomError(codes.UNAUTHORIZED);
  }
};

module.exports = {
  verifyAccessToken,
};
