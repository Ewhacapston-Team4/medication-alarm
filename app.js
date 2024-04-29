// app.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const appConfig = require('./src/config/appConfig');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const pillRoutes = require('./src/routes/pillRoutes');
const databaseConfig = require('./src/config/database');

const app = express();

// MongoDB 연결 설정
databaseConfig.connectToDatabase();

// 미들웨어 설정
app.use(bodyParser.json());

app.use(session({
  secret: 'your-secret-key', // 세션을 암호화하는 데 사용되는 키 (실제로는 더 복잡한 값 사용 권장)
  resave: false,
  saveUninitialized: false,
}));

// Passport 초기화 및 세션 사용 설정
app.use(passport.initialize());
app.use(passport.session());

// 라우터 설정
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pill', pillRoutes);
// app.use('/api/alarms', alarmRoutes)


// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
