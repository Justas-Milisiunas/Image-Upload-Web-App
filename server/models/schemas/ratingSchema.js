const mongoose = require('mongoose');

const RatingStatus = require('../ratingStatus');

const RatingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'User ID is required'],
    immutable: true,
  },
  rating: {
    type: Number,
    enum: [RatingStatus.DOWNVOTE, RatingStatus.UPVOTE],
    required: [true, 'Rating status is required'],
  },
});

module.exports = RatingSchema;
