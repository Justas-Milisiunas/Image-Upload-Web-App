const imagesService = require('../services/imagesService');
const HttpStatus = require('http-status-codes');
const path = require('path');

module.exports.getImages = async (req, res) => {
    const result = await imagesService.getImages();
    res.send(result);
}

module.exports.getImage = async (req, res) => {
    const foundImage = await imagesService.getImageAsync(req.params.id);
    if (!foundImage) {
        res.status(HttpStatus.NOT_FOUND).send({error: 'Image not found'});
        return;
    }

    res.sendFile(path.resolve(`${process.env.UPLOADED_IMAGES_DIRECTORY}/${foundImage._id}.${foundImage.extension}`));
}

module.exports.updateImage = async (req, res) => {
    const updatedImage = await imagesService.updateImageAsync(req.params.id, req.body);
    if (!updatedImage) {
        res.status(HttpStatus.BAD_REQUEST).send({error: 'Image not found or invalid image data'});
        return;
    }

    res.send(updatedImage);
}

module.exports.deleteImage = async (req, res) => {
    const foundImageData = await imagesService.deleteImageAsync(req.params.id);
    if (!foundImageData) {
        res.status(HttpStatus.NOT_FOUND).send({error: 'Image not found'});
        return;
    }
    res.send(foundImageData);
}

// TODO: Implement protected image uploading feature
module.exports.getProtectedImage = async (req, res) => {
    const result = await imagesService.getProtectedImageAsync(req.params.id);
    res.send(result);
}

module.exports.uploadImage = async (req, res) => {
    const {title} = req.body;
    const image = req.file;

    const uploadedImage = await imagesService.uploadImage(title, image);
    if (!uploadedImage) {
        res.status(HttpStatus.BAD_REQUEST).send({error: 'Invalid model data'});
        return;
    }

    res.status(HttpStatus.CREATED).send(uploadedImage);
}