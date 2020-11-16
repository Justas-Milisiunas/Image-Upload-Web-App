const fs = require('fs').promises;
const mime = require('mime-types');
const createError = require('http-errors');

const UserRole = require('../models/userRole');
const Image = require('../models/image');

module.exports.getImages = async () => Image.find();

module.exports.getImageAsync = async (id) => {
  const foundImage = await Image.findById(id);
  if (!foundImage) {
    throw createError.NotFound('Image not found');
  }

  return foundImage;
};

module.exports.updateImageAsync = async (imageId, updatedImageData, user) => {
  const { title } = updatedImageData;

  const foundImage = await this.getImageAsync(imageId);
  checkIfUserImageOwner(foundImage, user);

  foundImage.title = title;
  await foundImage.save();

  return foundImage;
};

module.exports.deleteImageAsync = async (id, user) => {
  const foundImage = await this.getImageAsync(id);
  checkIfUserImageOwner(foundImage, user);

  return await foundImage.remove();
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

module.exports.uploadImage = async (title, file, { _id: userId }) => {
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

const checkIfUserImageOwner = async (image, user) => {
  if (user._id !== image.userId && user.role !== UserRole.ADMIN) {
    throw createError.Forbidden('You are not the owner of this image');
  }
};
