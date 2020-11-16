const imageService = require('./imagesService');
const Image = require('../models/image');
const userRole = require('../models/userRole');
const createHttpError = require('http-errors');

module.exports.getImageRating = async (imageId) => {
  const foundImage = await imageService.getImageAsync(imageId);
  return foundImage && foundImage.ratingSum;
};

module.exports.getAllRatings = async () => Image.getAllRatings();

module.exports.updateRating = async (
  imageId,
  ratingId,
  newRatingData,
  user
) => {
  const foundImage = await imageService.getImageAsync(imageId);
  const foundRating = await foundImage.getRating(ratingId);

  checkIfUserIsAdminOrRatingOwner(foundRating, user);

  return await foundImage.updateRating(ratingId, newRatingData);
};

module.exports.deleteRating = async (imageId, ratingId, user) => {
  const foundImage = await imageService.getImageAsync(imageId);
  const foundRating = await foundImage.getRating(ratingId);

  checkIfUserIsAdminOrRatingOwner(foundRating, user);

  return await foundImage.deleteRating(ratingId);
};

module.exports.createRating = async (imageId, userId, rating) => {
  const foundImage = await imageService.getImageAsync(imageId);
  if (!foundImage) {
    return null;
  }

  return await foundImage.addRating(userId, rating);
};

const checkIfUserIsAdminOrRatingOwner = (rating, user) => {
  if (user.role !== userRole.ADMIN && rating.userId.toString() !== user._id) {
    throw createHttpError.Forbidden('You are not the owner of this rating');
  }
};
