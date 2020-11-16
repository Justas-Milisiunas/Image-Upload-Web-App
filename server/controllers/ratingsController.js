const ratingsService = require('../services/ratingsService');

module.exports.getAllRatings = async (req, res) => {
  const allRatings = await ratingsService.getAllRatings();
  res.send(allRatings);
};

module.exports.getImageRatings = async (req, res, next) => {
  const imageId = req.params.imageId;

  try {
    const foundRatings = await ratingsService.getImageRating(imageId);
    res.send({ rating: foundRatings });
  } catch (e) {
    next(e);
  }
};

module.exports.updateRating = async (req, res, next) => {
  const { imageId, id } = req.params;
  const { user, body: updatedRatingData } = req;

  try {
    const updatedRating = await ratingsService.updateRating(
      imageId,
      id,
      updatedRatingData,
      user
    );

    res.send(updatedRating);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteRating = async (req, res, next) => {
  const { imageId, id } = req.params;
  const { user } = req;

  try {
    const deleteRating = await ratingsService.deleteRating(imageId, id, user);
    res.send(deleteRating);
  } catch (e) {
    next(e);
  }
};

module.exports.createRating = async (req, res, next) => {
  const userId = req.user._id;
  const { imageId, rating } = req.body;

  try {
    const createdRating = await ratingsService.createRating(
      imageId,
      userId,
      rating
    );

    res.send(createdRating);
  } catch (e) {
    next(e);
  }
};
