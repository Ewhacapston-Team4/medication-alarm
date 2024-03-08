const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const dataValidator = require('../utils/dataValidator');

// POST /auth/signup
router.post('/signup', authController.signup);

// POST /auth/login
router.post('/login', authController.login);

// Google OAuth 로그인
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

module.exports = router;