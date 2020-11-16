const imagesService = require('../services/imagesService');
const HttpStatus = require('http-status-codes');
const path = require('path');

module.exports.getImages = async (req, res) => {
  const result = await imagesService.getImages();
  res.send(result);
};

module.exports.getImage = async (req, res, next) => {
  try {
    const foundImage = await imagesService.getImageAsync(req.params.id);

    res.sendFile(
      path.resolve(
        `${process.env.UPLOADED_IMAGES_DIRECTORY}/${foundImage._id}.${foundImage.extension}`
      )
    );
  } catch (e) {
    next(e);
  }
};

module.exports.updateImage = async (req, res, next) => {
  const { user, body, params } = req;

  try {
    const updatedImage = await imagesService.updateImageAsync(
      params.id,
      body,
      user
    );

    res.send(updatedImage);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST);
    next(e);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  const {user, params} = req;

  try {
    const foundImageData = await imagesService.deleteImageAsync(params.id, user);
    res.send(foundImageData);
  } catch (e) {
    next(e);
  }
};

// TODO: Implement protected image uploading feature
module.exports.getProtectedImage = async (req, res) => {
  const result = await imagesService.getProtectedImageAsync(req.params.id);
  res.send(result);
};

module.exports.uploadImage = async (req, res, next) => {
  const { title } = req.body;
  const image = req.file;

  try {
    const uploadedImage = await imagesService.uploadImage(
      title,
      image,
      req.user,
    );

    res.status(HttpStatus.CREATED).send(uploadedImage);
  } catch (e) {
    next(e);
  }
};
