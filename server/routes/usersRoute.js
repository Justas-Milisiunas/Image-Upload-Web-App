const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUser);

router.post('/', usersController.registerNewUser);

router.delete('/:id', usersController.deleteUser);

router.put('/:id', usersController.updateUser);

module.exports = router;