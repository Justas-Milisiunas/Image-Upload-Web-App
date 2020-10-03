const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const {authorize} = require('../middlewares/authMiddleware');
const UserRole = require('../models/userRole');

router.get('/', authorize([UserRole.ADMIN]), usersController.getAllUsers);

router.get('/:id', usersController.getUser);

router.post('/', usersController.registerNewUser);

router.delete('/:id', usersController.deleteUser);

router.put('/:id', usersController.updateUser);

module.exports = router;