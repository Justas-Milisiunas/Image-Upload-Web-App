const fs = require('fs').promises;
const mime = require('mime-types');

const Image = require('../models/image');

module.exports.getImages = async () => Image.find();

module.exports.getImageAsync = async (id) => {
    try {
        return await Image.findById(id);
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

module.exports.updateImageAsync = async (id, updatedImage) => {
    try {
        return await Image.findByIdAndUpdate(id, updatedImage, {
            new: true
        });
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

module.exports.deleteImageAsync = async (id) => {
    try {
        const foundImageData = await Image.findByIdAndDelete(id);
        if (!foundImageData) {
            return null;
        }

        await fs.unlink(`./${process.env.UPLOADED_IMAGES_DIRECTORY}/${foundImageData._id}.${foundImageData.extension}`);
        return foundImageData;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

module.exports.getProtectedImageAsync = async (id) => {
    return {
        "id": 1,
        "name": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "extension": "png",
        "createdAt": "2020-07-29T09:12:33.001Z",
        "userId": 1,
        "title": "New image",
        "password": "Password123"
    }
}

// TODO: Remove hardcoded userId
module.exports.uploadImage = async (title, file) => {
    const extension = mime.extension(file.mimetype);

    try {
        const newImage = new Image({
            extension,
            userId: '5f747088f4b0946ebba9d5b4',
            title
        });

        await fs.writeFile(`./${process.env.UPLOADED_IMAGES_DIRECTORY}/${newImage.id}.${extension}`, file.buffer);

        const error = newImage.validateSync();
        if (error) {
            console.log(error.message);
            return null;
        }

        return await newImage.save();
    } catch (e) {
        console.log(e.message);
        return null;
    }
}