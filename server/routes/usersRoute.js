const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const { authorize } = require('../middlewares/authorizationMiddleware');
const UserRole = require('../models/userRole');

router.get('/', authorize([UserRole.ADMIN]), usersController.getAllUsers);

router.get('/:id', usersController.getUser);

router.post('/', usersController.registerNewUser);

router.delete(
  '/',
  authorize([UserRole.ADMIN, UserRole.USER]),
  usersController.deleteUser
);

router.put(
  '/',
  authorize([UserRole.ADMIN, UserRole.USER]),
  usersController.updateUser
);

module.exports = router;
