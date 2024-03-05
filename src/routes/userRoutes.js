const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users/:userId
router.get('/:userId', userController.getUserInfo);

// GET /api/users
router.get('/', userController.getAllUsers);

// PUT /api/users/:userId
router.put('/:userId', userController.updateUser);

// DELETE /api/users/:userId
router.delete('/:userId', userController.deleteUser);

module.exports = router;

