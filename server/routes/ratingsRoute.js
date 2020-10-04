const express = require('express');
const router = express.Router();

const ratingsController = require('../controllers/ratingsController');
const {authorize} = require('../middlewares/authMiddleware');
const UserRole = require('../models/userRole');

router.get('/', authorize([UserRole.ADMIN]), ratingsController.getAllRatings);

router.get('/:imageId', ratingsController.getImageRatings);

router.put('/:id', ratingsController.updateRating);

router.delete('/:id', ratingsController.deleteRating);

router.post('/', authorize([UserRole.USER, UserRole.ADMIN]), ratingsController.createRating);

module.exports = router;