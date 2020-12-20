const createHttpError = require('http-errors');
const Image = require('../models/image');
const userRole = require('../models/userRole');
const imageService = require('./imagesService');

module.exports.getComments = async () => await Image.getAllComments();

module.exports.getImageComments = async (imageId) => {
  const foundImage = await imageService.getImageAsync(imageId);
  return foundImage && foundImage.comments;
};

module.exports.updateComment = async (
  imageId,
  commentId,
  newCommentData,
  user
) => {
  const foundImage = await imageService.getImageAsync(imageId);
  const foundComment = foundImage.getComment(commentId);

  checkIfUserIsAdminOrCommentOwner(foundComment, user);

  return await foundImage.updateComment(commentId, newCommentData);
};

module.exports.deleteComment = async (imageId, commentId, user) => {
  const foundImage = await imageService.getImageAsync(imageId);
  const foundComment = foundImage.getComment(commentId);

  checkIfUserIsAdminOrCommentOwner(foundComment, user);

  return await foundImage.deleteComment(commentId);
};

module.exports.createComment = async (imageId, userId, newCommentData) => {
  const foundImage = await imageService.getImageAsync(imageId);

  return await foundImage.addComment(userId, newCommentData);
};

const checkIfUserIsAdminOrCommentOwner = (comment, user) => {
  if (user.role !== userRole.ADMIN && comment.userId.toString() !== user._id) {
    throw createHttpError.Forbidden('You are not the owner of this comment');
  }
};
