const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const appConfig = {
  configureApp: () => {
    const app = express();

    // 미들웨어 설정
    app.use(cors());
    app.use(bodyParser.json());
    app.use(morgan('combined'));

    return app;
  },
};

module.exports = appConfig;
