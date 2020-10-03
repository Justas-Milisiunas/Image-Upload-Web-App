const HttpStatus = require('http-status-codes');

const authService = require('../services/authService');

module.exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    const tokens = await authService.login(email, password);
    if (!tokens) {
        res.status(HttpStatus.BAD_REQUEST).send({error: 'Bad login data'});
        return;
    }

    res.json(tokens);
}

module.exports.refreshToken = async (req, res) => {
    const {refreshToken} = req.body;

    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    if (!newAccessToken) {
        res.status(HttpStatus.NOT_FOUND).send({error: 'Invalid request token'});
        return;
    }

    res.json({accessToken: newAccessToken});
}