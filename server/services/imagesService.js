const fs = require('fs').promises;
const mime = require('mime-types');
const createError = require('http-errors');

const Image = require('../models/image');

module.exports.getImages = async () => Image.find();

module.exports.getImageAsync = async (id) => {
  const foundImage = await Image.findById(id);
  if (!foundImage) {
    throw createError.NotFound('Image not found');
  }

  return foundImage;
};

module.exports.updateImageAsync = async (id, updatedImageData) => {
  const updatedImage = await Image.findByIdAndUpdate(id, updatedImageData, {
    new: true,
  });

  if (!updatedImage) {
    throw createError.BadRequest('Invalid image data');
  }

  return updatedImage;
};

module.exports.deleteImageAsync = async (id) => {
  const foundImageData = await Image.findByIdAndDelete(id);
  if (!foundImageData) {
    throw createError.NotFound('Image not found');
  }

  await fs.unlink(
    `./${process.env.UPLOADED_IMAGES_DIRECTORY}/${foundImageData._id}.${foundImageData.extension}`
  );
  return foundImageData;
};

module.exports.getProtectedImageAsync = async (id) => {
  return {
    id: 1,
    name: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    extension: 'png',
    createdAt: '2020-07-29T09:12:33.001Z',
    userId: 1,
    title: 'New image',
    password: 'Password123',
  };
};

// TODO: Remove hardcoded userId
module.exports.uploadImage = async (title, file, userId) => {
  const extension = mime.extension(file.mimetype);

  const newImage = new Image({
    extension,
    userId,
    title,
  });

  await fs.writeFile(
    `./${process.env.UPLOADED_IMAGES_DIRECTORY}/${newImage.id}.${extension}`,
    file.buffer
  );

  const error = newImage.validateSync();
  if (error) {
    throw createError.BadRequest(error.message);
  }

  return await newImage.save();
};
