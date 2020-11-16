const createError = require('http-errors');

const authService = require('./authService');
const User = require('../models/user');

module.exports.getUsers = async () => User.find();

module.exports.getUserById = async (id) => {
  const foundUser = await User.findById(id);
  if (!foundUser) {
    throw createError.NotFound('User not found');
  }

  return foundUser;
};

module.exports.getUser = async (email, password) => {
  const foundUser = await User.findOne({ email, password });
  if (!foundUser) {
    throw createError.NotFound('User not found');
  }

  return foundUser;
};

module.exports.createUser = async (email, password) => {
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    throw createError.Conflict(
      `User with ${email} email is already registered`
    );
  }

  let newUser = new User({
    email,
    password,
  });

  const error = newUser.validateSync();
  if (error) {
    throw createError.BadRequest(error.message);
  }

  return await newUser.save();
};

module.exports.deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw createError.NotFound('User not found');
  }

  authService.logout(id);
  return deletedUser;
};

module.exports.updateUser = async (user, newUserData) => {
  return await User.findByIdAndUpdate(user._id, newUserData, {
    new: true,
    runValidators: true,
  });
};
