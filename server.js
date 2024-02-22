const http = require('http');
const app = require('./app');

const serverConfig = {
  startServer: () => {
    const port = process.env.PORT || 3000;
    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  },
};

// 서버 시작
serverConfig.startServer();