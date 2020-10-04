const imageService = require('./imagesService');

module.exports.getRatings = async () => {
    return [
        {
            id: 1,
            imageId: 1,
            userId: 1,
            rating: 1
        },
        {
            id: 2,
            imageId: 1,
            userId: 1,
            rating: -1
        }
    ];
}

module.exports.getImageRatings = async (imageId) => {
    return [
        {
            id: 1,
            imageId: 1,
            userId: 1,
            rating: 1
        },
        {
            id: 2,
            imageId: 1,
            userId: 1,
            rating: -1
        }
    ];
}

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