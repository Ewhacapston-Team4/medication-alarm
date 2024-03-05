// userService.js

const User = require('../models/userModel');

const userService = {
  getUserById: async (userId) => {
    try {
      const user = await User.findOne({ userId: userId });
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  },

  updateUser: async (userId, updatedData) => {
    try {
      const user = await User.findOneAndUpdate({ userId: userId }, updatedData, { new: true });
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const user = await User.findOneAndDelete({ userId: userId });
      return user;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

module.exports = userService;
