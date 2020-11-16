const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserRole = require('../models/userRole');
/**
 * Authorization middleware. If no token found, adds user with Guest role
 * @param req
 * @param res
 * @param next
 */
module.exports.user = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        req.user = {
            role: UserRole.GUEST
        }
        return next();
    }

    try {
        const user = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        req.user = _.omit(user, ['iat', 'exp']);

        next();
    } catch (e) {
        next(e);
    }
}