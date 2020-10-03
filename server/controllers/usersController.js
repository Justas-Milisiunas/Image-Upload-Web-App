const usersService = require('../services/usersService');
const HttpStatus = require('http-status-codes');

module.exports.getAllUsers = async (req, res) => {
    const allUsers = await usersService.getUsers();
    res.send(allUsers);
}

module.exports.registerNewUser = async (req, res) => {
    const {email, password} = req.body;
    const createdUser = await usersService.createUser(email, password);

    if (!createdUser) {
        res.status(HttpStatus.BAD_REQUEST).json({
            error: 'Invalid model data'
        });
        return;
    }

    res.status(HttpStatus.CREATED).send(createdUser);
}

module.exports.getUser = async (req, res) => {
    const userId = req.params.id;
    const foundUser = await usersService.getUser(userId);

    if (!foundUser) {
        res.status(HttpStatus.NOT_FOUND).send({
            error: 'User not found'
        });
        return;
    }

    res.send(foundUser);
}

module.exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await usersService.deleteUser(userId);

    if (!deletedUser) {
        res.status(HttpStatus.NOT_FOUND).send({
            error: 'User not found'
        });
        return;
    }

    res.send(deletedUser);
}

module.exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const newUserData = req.body;

    const updatedUser = await usersService.updateUser(userId, newUserData);
    if (!updatedUser) {
        res.status(HttpStatus.NOT_FOUND).send({
            error: 'User not found or invalid data'
        });
        return;
    }

    res.send(updatedUser);
}