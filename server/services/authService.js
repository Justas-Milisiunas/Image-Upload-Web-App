const jwt = require('jsonwebtoken');
const _ = require('lodash');

const userService = require('./usersService');

let refreshTokens = [];

module.exports.login = async (email, password) => {
    const user = await userService.getUser(email, password);
    if (!user) {
        return null;
    }

    const accessToken = generateAccessToken(user.tokenPayload);
    const refreshToken = generateRefreshToken(user.tokenPayload);

    // TODO: Save refresh tokens in the mongo db
    refreshTokens.push(refreshToken);
    return {accessToken, refreshToken};
}

module.exports.refreshAccessToken = async (refreshToken) => {
    if (!refreshTokens.includes(refreshToken)) {
        return null;
    }

    try {
        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
        return generateAccessToken(_.omit(user, ['iat']));
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME});
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET);
}