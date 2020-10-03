const User = require('../models/user');

module.exports.getUsers = async () => User.find();

module.exports.getUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

module.exports.getUser = async (email, password) => {
    try {
        return await User.findOne({email, password});
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

module.exports.createUser = async (email, password) => {
    const alreadyExists = await User.findOne({email});
    if (alreadyExists) {
        return null;
    }

    let newUser = new User({
        email,
        password
    });

    const error = newUser.validateSync();
    if (error) {
        console.log(error.message);
        return null;
    }

    return await newUser.save();
}

module.exports.deleteUser = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (e) {
        console.log(e.message)
        return null;
    }
}

module.exports.updateUser = async (id, newUserData) => {
    try {
        return await User.findByIdAndUpdate(id, newUserData, {
            new: true
        });
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

