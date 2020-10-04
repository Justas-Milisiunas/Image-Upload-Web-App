const imageService = require('./imagesService');
const Image = require('../models/image');

module.exports.getImageRating = async (imageId) => {
    const foundImage = await imageService.getImageAsync(imageId);
    return foundImage && foundImage.ratingSum;
}

module.exports.getAllRatings = async () => Image.getAllRatings();

module.exports.updateRating = async (imageId, ratingId, newRatingData) => {
    const foundImage = await imageService.getImageAsync(imageId);
    return foundImage && await foundImage.updateRating(ratingId, newRatingData);
}

module.exports.deleteRating = async (imageId, ratingId) => {
    const foundImage = await imageService.getImageAsync(imageId);
    return foundImage && await foundImage.deleteRating(ratingId);
}

module.exports.createRating = async (imageId, userId, rating) => {
    const foundImage = await imageService.getImageAsync(imageId);
    if (!foundImage) {
        return null;
    }

    return await foundImage.addRating(userId, rating);
}