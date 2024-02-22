const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /user/:userId
router.get('/:userId', userController.getUserInfo);

module.exports = router;
