// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const authenService = async (req, res, next) => {
  // 클라이언트로부터 JWT 토큰을 헤더나 쿼리 매개변수 등에서 추출
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  JWT_SECRET = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token not provided' });
  }

  try {
    // JWT 토큰을 검증하고 토큰에서 유저 아이디 추출
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // 추출한 유저 아이디를 요청 객체에 추가
    req.userId = userId;

    // 다음 미들웨어 실행
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authenService;
