// dataValidator.js

const validator = require('validator');

const dataValidator = {
  validateSignupData: (userData) => {
    const { userId, password, username, email } = userData;
    if (!userId || !password || !username || !email) {
      throw new Error('All fields are required');
    }

    if (!validator.isEmail(email)) {
      throw new Error('Invalid email format');
    }

    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 1 })) {
      throw new Error('Password must be at least 8 characters long and contain at least one lowercase letter, one number, and one special character');
    }

    return true;
  },

  validateLoginData: (userData) => {
    const { userId, password } = userData;
    if (!userId || !password) {
      throw new Error('UserId and password are required');
    }

    return true;
  },

  // 다른 유효성 검증 메서드를 추가할 수 있습니다.
};

module.exports = dataValidator;