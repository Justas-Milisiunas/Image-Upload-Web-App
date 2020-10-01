const express = require('express');
const router = express.Router();

const imagesController = require('../controllers/images');

router.get('/:page', imagesController.getImages);

router.get('/:id', imagesController.getImage);

router.patch('/:id', imagesController.updateImage);

router.delete('/:id', imagesController.deleteImage);

router.get('/:id/:password', imagesController.getProtectedImage);

router.post('/', imagesController.uploadImage);

module.exports = router;