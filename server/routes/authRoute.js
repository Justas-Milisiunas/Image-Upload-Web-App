const express = require('express');
const router = express.Router();

const { authorize } = require('../middlewares/authorizationMiddleware');
const UserRole = require('../models/userRole');

const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);

router.post('/token', authController.refreshToken);

router.get(
  '/logout',
  authorize([UserRole.ADMIN, UserRole.USER]),
  authController.logout
);

module.exports = router;
