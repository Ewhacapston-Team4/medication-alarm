// authController.js

const User = require('../models/userModel');
const dataValidator = require('../utils/dataValidator'); // 추가

const authController = {
  signup: async (req, res) => {
    try {
      dataValidator.validateSignupData(req.body); // 추가
      const { userId, password, username, email } = req.body;
      const newUser = new User({ userId, password, username, email });
      await newUser.save();

      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: error.message }); // 수정
    }
  },

  login: async (req, res) => {
    try {
      dataValidator.validateLoginData(req.body); // 추가
      const { userId, password } = req.body;
      const user = await User.findOne({ userId });

      if (!user) {
        res.status(401).json({ success: false, message: 'Invalid userId or password' });
        return;
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) {
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid userId or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: error.message }); // 수정
    }
  },
};

module.exports = authController;