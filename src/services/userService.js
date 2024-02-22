const User = require('../models/userModel');

const userService = {
  // 사용자 생성
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // 사용자 ID로 사용자 조회
  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  },

  // 모든 사용자 조회
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  },

  // 사용자 정보 업데이트
  updateUser: async (userId, updatedData) => {
    try {
      const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // 사용자 삭제
  deleteUser: async (userId) => {
    try {
      const user = await User.findByIdAndDelete(userId);
      return user;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

module.exports = userService;