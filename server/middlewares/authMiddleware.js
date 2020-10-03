const jwt = require('jsonwebtoken');
const _ = require('lodash');
const HttpStatus = require('http-status-codes');

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
        console.log(e.message);
        return res.status(HttpStatus.BAD_REQUEST).status({error: 'Invalid access token'});
    }
}

/**
 * Endpoint authorization middleware. If no roles provided, anyone can access
 * @param roles User roles
 */
module.exports.authorize = (roles = []) => {
    return (req, res, next) => {
        const userRole = req.user['role'];
        if (!roles.includes(userRole)) {
            return res.status(HttpStatus.FORBIDDEN).send({error: 'Access denied'});
        }

        next();
    }
}