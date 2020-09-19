const imagesService = require('../services/imagesService');

module.exports.getImages = async (req, res) => {
    const result = await imagesService.getImageAsync(req.params.id);
    res.send(result);
}

module.exports.getImage = async (req, res) => {
    const result = await imagesService.getImageAsync(req.params.id);
    res.send(result);
}

module.exports.updateImage = async (req, res) => {
    const result = await imagesService.updateImageAsync(req.params.id, {});
    res.send(result);
}

module.exports.deleteImage = async (req, res) => {
    const result = await imagesService.deleteImageAsync(req.params.id);
    res.send(result);
}

module.exports.getProtectedImage = async (req, res) => {
    const result = await imagesService.getProtectedImageAsync(req.params.id);
    res.send(result);
}

module.exports.uploadImage = async (req, res) => {
    const result = await imagesService.uploadImageAsync({});
    res.send(result);
}