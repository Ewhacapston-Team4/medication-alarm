const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true },
  username: { type: String, required: true },
  email: { type: String },
});

userSchema.pre('save', async function (next) {
  try {
    // 비밀번호가 없거나 구글 로그인 시에는 해시화하지 않음
    if (!this.password || this.googleId) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    if (!this.password) {
      return false;  // 비밀번호가 없는 경우 false 반환
    }
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
