const jwt = require('jsonwebtoken');
const _ = require('lodash');
const createError = require('http-errors');

const userService = require('./usersService');

let refreshTokens = [];

module.exports.login = async (email, password) => {
  const user = await userService.getUser(email, password);

  const accessToken = generateAccessToken(user.tokenPayload);
  const refreshToken = generateRefreshToken(user.tokenPayload);

  // TODO: Save refresh tokens in the mongo db
  const { _id: userId } = user._id;
  refreshTokens.push({ refreshToken, userId });

  return {
    user,
    accessToken,
    refreshToken,
    accessTokenMaxAge:
      parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME, 10) * 1000,
    refreshTokenMaxAge:
      parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME, 10) * 1000,
  };
};

module.exports.logout = (userId) => {
  refreshTokens = refreshTokens.filter((token) => token.userId !== userId);
};

module.exports.refreshAccessToken = async (refreshToken) => {
  if (!refreshTokens.includes(refreshToken)) {
    throw createError.NotFound('Refresh token invalid');
  }

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    return generateAccessToken(_.omit(user, ['iat']));
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME + 's',
  });

  return accessToken;
};

const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET);

  return refreshToken;
};
