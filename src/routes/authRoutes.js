const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const dataValidator = require('../utils/dataValidator');

// POST /auth/signup
router.post('/signup', authController.signup);

// POST /auth/login
router.post('/login', authController.login);

module.exports = router;