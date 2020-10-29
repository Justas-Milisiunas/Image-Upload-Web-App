const HttpStatus = require('http-status-codes');

/**
 * Endpoint authorization middleware. If no roles provided, anyone can access
 * @param roles User roles
 */
module.exports.authorize = (roles = []) => {
    return (req, res, next) => {
        const userRole = req.user['role'];
        if (!roles.includes(userRole)) {
            res.status(HttpStatus.FORBIDDEN);
            throw new Error('Access denied');
        }

        next();
    }
}