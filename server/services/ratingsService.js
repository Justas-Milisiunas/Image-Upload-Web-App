const imageService = require('./imagesService');
const Image = require('../models/image');

module.exports.getImageRating = async (imageId) => {
    const foundImage = await imageService.getImageAsync(imageId);
    return foundImage && foundImage.ratingSum;
}

module.exports.getAllRatings = async () => Image.getAllRatings();

module.exports.updateRating = async (ratingId, updatedRatingData) => {
    return {
        id: 1,
        imageId: 1,
        userId: 1,
        rating: -1
    };
}

module.exports.deleteRating = async (ratingId) => {
    return {
        id: 1,
        imageId: 1,
        userId: 1,
        rating: 1
    };
}

module.exports.createRating = async (imageId, userId, rating) => {
    const foundImage = await imageService.getImageAsync(imageId);
    if (!foundImage) {
        return null;
    }

    return await foundImage.addRating(userId, rating);
}