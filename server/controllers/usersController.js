const usersService = require('../services/usersService');
const HttpStatus = require('http-status-codes');

module.exports.getAllUsers = async (req, res) => {
  const allUsers = await usersService.getUsers();
  res.send(allUsers);
};

module.exports.registerNewUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const createdUser = await usersService.createUser(email, password);
    res.status(HttpStatus.CREATED).send(createdUser);
  } catch (e) {
    next(e);
  }
};

module.exports.getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const foundUser = await usersService.getUserById(userId);

    res.send(foundUser);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const { _id: userId } = req.user;

  try {
    const deletedUser = await usersService.deleteUser(userId);

    res.send(deletedUser);
  } catch (e) {
    next(e);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { user, body: newUserData } = req;

  try {
    const updatedUser = await usersService.updateUser(user, newUserData);
    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
};
