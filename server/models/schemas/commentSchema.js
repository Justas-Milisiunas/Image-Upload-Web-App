const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'User ID is required'],
    immutable: true,
  },
  message: {
    type: String,
    required: [true, 'Comment message is required'],
  },
});

module.exports = CommentSchema;
