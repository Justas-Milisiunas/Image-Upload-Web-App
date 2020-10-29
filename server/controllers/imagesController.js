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
  try {
    const updatedImage = await imagesService.updateImageAsync(
      req.params.id,
      req.body
    );

    res.send(updatedImage);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST);
    next(e);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const foundImageData = await imagesService.deleteImageAsync(req.params.id);
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
      req.user._id
    );

    res.status(HttpStatus.CREATED).send(uploadedImage);
  } catch (e) {
    next(e);
  }
};
