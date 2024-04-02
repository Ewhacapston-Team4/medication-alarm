// 알약 사진 업로드 시 알약명 

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const pillController = {
  uploadPillPhoto: (req, res) => {
    // 이미지 파일 경로
    const imagePath = req.file.path;

    // 이미지 파일 경로에서 파일명 추출
    const imageName = path.basename(imagePath);

    const newPath = `${imagePath}.png`;

    fs.rename(imagePath, newPath, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      const newImagePath = path.join(__dirname, '..', 'controllers', 'uploads', imageName);

      // 파이썬 스크립트 실행
      const python = spawn('python', ['C:/Users/82104/Node_lecture/medication-alarm/src/controllers/pill.py', newImagePath]);

      let pillName = ''; // 알약 이름을 저장할 변수

      python.stdout.on('data', (data) => {
        console.log('stdout:', data.toString());
        pillName = data.toString().trim(); // 알약 이름 저장
      });

      python.stderr.on('data', (data) => {
        console.error('stderr:', data.toString());
      });

      python.on('close', (code) => {
        if (pillName) {
          return res.json({ pillName }); // 알약 이름이 있을 경우 응답
        } else {
          return res.status(400).json({ error: 'Bad Request' }); // 알약 이름이 없을 경우 에러 응답
        }
      });
    });
  },
};

module.exports = pillController;
