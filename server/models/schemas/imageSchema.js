const mongoose = require('mongoose');
const _ = require('lodash');
const createError = require('http-errors');

const CommentSchema = require('./commentSchema');
const RatingSchema = require('./ratingSchema');

const ImageModelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'User ID is required'],
      immutable: true,
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 letters long'],
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    extension: {
      type: String,
      required: [true, 'Extension is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [4, 'Title must be at least 4 letters long'],
    },
    rating: {
      type: [RatingSchema],
    },
    comments: {
      type: [CommentSchema],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret, options) => {
        delete ret.id;
      },
    },
  }
);

ImageModelSchema.methods.addRating = async function (userId, rating) {
  const newRating = { userId, rating };

  // Creates rating subdoc without adding to the Image document
  const savedRating = await this.rating.create(newRating);
  const error = savedRating.validateSync();

  if (error) {
    throw createError.BadRequest(error.message);
  }

  // Check if user has not already rated this image
  const userAlreadyRated =
    this.rating.filter((r) => r.userId.toString() === userId).length > 0;
  if (userAlreadyRated) {
    throw createError.Forbidden('This user already rated this image');
  }

  // Adds rating subdoc to the Image document
  await this.updateOne({
    $push: { rating: savedRating },
  });

  return savedRating;
};

ImageModelSchema.methods.getRating = async function (ratingId) {
  const foundRating = this.rating.id(ratingId);
  if (!foundRating) {
    throw createError.NotFound('Rating not found');
  }

  return foundRating;
};

ImageModelSchema.methods.deleteRating = async function (ratingId) {
  const foundRating = await this.getRating(ratingId);

  foundRating.remove();
  await this.save();

  return foundRating;
};

ImageModelSchema.methods.updateRating = async function (ratingId, ratingData) {
  const foundRating = await this.getRating(ratingId);

  if (foundRating.rating === ratingData.rating) {
    throw createError.BadRequest('Same rating provided');
  }

  foundRating.rating = ratingData.rating;

  // Checks if new rating is valid
  const error = this.validateSync();
  if (error) {
    throw createError.BadRequest(error.message);
  }

  await this.save();
  return foundRating;
};

ImageModelSchema.methods.getComment = function (commentId) {
  const foundComment = this.comments.id(commentId);
  if (!foundComment) {
    throw createError.NotFound('Comment not found');
  }

  return this.comments.id(commentId);
};

ImageModelSchema.methods.addComment = async function (userId, message) {
  const imageId = this._id;
  const newComment = { userId, ...message, imageId };
  const commentDocument = await this.comments.create(newComment);

  const error = commentDocument.validateSync();
  if (error) {
    throw createError.BadRequest(error.message);
  }

  await this.updateOne({
    $push: { comments: commentDocument },
  });

  return commentDocument;
};

ImageModelSchema.methods.deleteComment = async function (commentId) {
  const foundComment = this.getComment(commentId);

  foundComment.remove();
  await this.save();

  return foundComment;
};

ImageModelSchema.methods.updateComment = async function (
  commentId,
  updatedData
) {
  let foundComment = this.getComment(commentId);

  foundComment.set(updatedData);

  const error = foundComment.validateSync();
  if (error) {
    throw createError.BadRequest(error.message);
  }

  await this.save();
  return foundComment;
};

ImageModelSchema.virtual('ratingSum').get(function () {
  return this.rating.reduce((sum, r) => sum + r.rating, 0);
});

ImageModelSchema.virtual('url').get(function () {
  return process.env.HOST_IP + '/images/' + this._id;
});

ImageModelSchema.statics.getAllRatings = async function () {
  const allImages = await this.find({}, 'rating');
  return allImages.map((image) => image.rating).flat();
};

ImageModelSchema.statics.getAllComments = async function () {
  const allImages = await this.find({}, 'comments');
  return allImages.map((image) => image.comments).flat();
};

module.exports = ImageModelSchema;
