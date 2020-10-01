const mongoose = require('mongoose');

// TODO: Add regex validation for the email
const UserModelSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        select: false,
        minlength: [6, 'Password must be at least 6 letters long'],
        required: [true, 'Password if required']
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    ip: {
        type: String
    }
}, {
    toJSON: {
        transform: (doc, ret, options) => {
            delete ret.password;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('User', UserModelSchema);