// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appConfig = require('./src/config/appConfig');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// MongoDB 연결 설정
mongoose.connect(appConfig.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// 미들웨어 설정
app.use(bodyParser.json());

// 라우터 설정
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
