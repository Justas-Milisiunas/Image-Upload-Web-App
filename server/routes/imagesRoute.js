const express = require('express');
const router = express.Router();

const imagesController = require('../controllers/imagesController');
const { authorize } = require('../middlewares/authorizationMiddleware');
const UserRole = require('../models/userRole');

router.get('/', imagesController.getImages);

router.get('/:id', imagesController.getImage);

router.patch(
  '/:id',
  authorize([UserRole.ADMIN, UserRole.USER]),
  imagesController.updateImage
);

router.delete(
  '/:id',
  authorize([UserRole.ADMIN, UserRole.USER]),
  imagesController.deleteImage
);

router.get('/:id/:password', imagesController.getProtectedImage);

router.post(
  '/',
  authorize([UserRole.ADMIN, UserRole.USER]),
  imagesController.uploadImage
);

module.exports = router;
