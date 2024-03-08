const userService = require('../services/userService');

const userController = {
  getUserInfo: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ success: false, message: `User with ID ${userId} not found` });
        return;
      }

      res.json({ success: true, data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedUser = await userService.updateUser(userId, req.body);
      res.json({ success: true, data: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await userService.deleteUser(userId);
      res.json({ success: true, data: deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = userController;
