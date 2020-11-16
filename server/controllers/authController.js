const HttpStatus = require('http-status-codes');

const authService = require('../services/authService');

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const tokens = await authService.login(email, password);
    res.json(tokens);
  } catch (e) {
    next(e);
  }
};

module.exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (e) {
    next(e);
  }
};
