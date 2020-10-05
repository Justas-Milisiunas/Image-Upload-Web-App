const Image = require('../models/image');
const imageService = require('./imagesService');

module.exports.getComments = async () => await Image.getAllComments();

module.exports.getImageComments = async (imageId) => {
    const foundImage = await imageService.getImageAsync(imageId);
    return foundImage && foundImage.comments;
}

module.exports.updateComment = async (imageId, commentId, newCommentData) => {
    const foundImage = await imageService.getImageAsync(imageId);
    return foundImage && await foundImage.updateComment(commentId, newCommentData);
}

module.exports.deleteComment = async (imageId, commentId) => {
    const foundImage = await imageService.getImageAsync(imageId);
    return foundImage && await foundImage.deleteComment(commentId);
}

module.exports.createComment = async (imageId, userId, newCommentData) => {
    const foundImage = await imageService.getImageAsync(imageId);
    return foundImage && await foundImage.addComment(userId, newCommentData);
}