const mongoose = require('mongoose');
const UserRole = require('../userRole');

// TODO: Add regex validation for the email
const UserModelSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 letters long'],
      required: [true, 'Password if required'],
    },
    registrationDate: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    ip: {
      type: String,
    },
    role: {
      type: Number,
      enum: [UserRole.USER, UserRole.ADMIN],
      default: UserRole.USER,
      immutable: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.password;
      },
    },
  }
);

UserModelSchema.virtual('tokenPayload').get(function () {
  return {
    _id: this._id,
    role: this.role,
  };
});

module.exports = UserModelSchema;
