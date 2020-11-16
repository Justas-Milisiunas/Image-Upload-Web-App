const createError = require('http-errors');

/**
 * Endpoint authorization middleware. If no roles provided, anyone can access
 * @param roles User roles
 */
module.exports.authorize = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.user['role'];
    if (!roles.includes(userRole)) {
      throw createError.Forbidden('Access denied');
    }

    next();
  };
};
