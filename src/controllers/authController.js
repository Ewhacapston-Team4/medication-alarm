// 회원가입, 로그인 api

require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dataValidator = require('../utils/dataValidator'); // 추가

passport.use(new GoogleStrategy({
  clientID: process.env.my_client_ID,
  clientSecret: process.env.my_client_secret,
  callbackURL: 'http://localhost:3000/api/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // 1. 이메일 기준으로 기존 사용자 확인
    const existingUser = await User.findOne({googleId: profile.id});

    if (existingUser) {
      // 이미 가입된 사용자인 경우, 해당 사용자 정보를 반환
      return done(null, existingUser);
    }

    // 2. 가입되지 않은 경우, 새로운 사용자 생성
    const newUser = new User({
      googleId: profile.id,
      userId: profile.emails[0].value,
      username: profile.displayName,
      email: profile.emails[0].value,
    });

    // 3. 새로운 사용자 저장
    await newUser.save();

    // 4. 새로운 사용자 정보를 반환
    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}
));

passport.use(new LocalStrategy(
  async (userId, password, done) => {
    try {
      const user = await User.findOne({ userId });

      if (!user) {
        return done(null, false, { message: 'Invalid userId or password' });
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid userId or password' });
      }
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  // 사용자 객체에서 고유 식별자를 추출하여 세션에 저장
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

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

  login: //passport.authenticate('local', { failureRedirect: '/' }),
    async (req, res) => {
      passport.authenticate('loacal', async (err, user, info) => {
        try {
          if (err || !user) {
            return res.status(401).json({success: false, message: info.message });
          }

          req.login(user, { session : false }, async (error) => {
            if (error) return next(error);
            const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
          });
        } catch (error) {
          return res.status(400).json({ success: false, message: error.message });
        }
      })(req, res);
    },

  googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),
  googleCallback: (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/' })(req, res, async () => {
      // Google 로그인 성공 후의 처리 로직
      if (req.user) {
        const user = req.user;
        console.log('Google 로그인 성공:', user);

        // 브라우저에 "로그인 성공" 메시지 전송
        res.send('로그인 성공');
      } else {
        // 로그인 실패 처리
        res.send('로그인 실패');
      }
    });
  },

};

module.exports = authController;