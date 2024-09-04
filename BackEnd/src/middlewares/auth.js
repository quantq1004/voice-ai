const asyncMiddleware = require('./async');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');
const authService = require('../services/auth');
const { VOICE_CLONING_ID } = require('../configs');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(codes.UNAUTHORIZED);

  const [tokenType, accessToken] = authorization.split(' ');

  if (tokenType !== 'Bearer') throw new Error(codes.UNAUTHORIZED);

  const data = await authService.verifyAccessToken(accessToken);
  const { sub: userId, email, name, phoneNumber, resourceAccess } = data;

  req.userId = userId;
  req.user = { userId, email, name, phoneNumber };
  req.roles = resourceAccess[VOICE_CLONING_ID]?.roles || [];

  return next();
};

const hasRole = (role) => (req, res, next) => {
  const userRoles = req.roles;

  const hasPermission = userRoles.includes(role);
  if (!hasPermission) throw new CustomError(codes.FORBIDDEN);

  return next();
};

module.exports = {
  auth: asyncMiddleware(auth),
  hasRole,
};
