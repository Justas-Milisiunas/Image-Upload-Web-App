const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/commentsController');
const {authorize} = require('../middlewares/authMiddleware');
const UserRole = require('../models/userRole');

router.get('/', commentsController.getAllComments);

router.get('/:id', commentsController.getImageComments);

router.put('/:imageId/:id', authorize([UserRole.USER, UserRole.ADMIN]), commentsController.updateComment);

router.delete('/:imageId/:id', authorize([UserRole.USER, UserRole.ADMIN]), commentsController.deleteComment);

router.post('/:imageId', authorize([UserRole.USER, UserRole.ADMIN]), commentsController.createComment);

module.exports = router;