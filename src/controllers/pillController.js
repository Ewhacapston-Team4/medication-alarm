const { exec } = require('child_process');
const path = require('path');

const pillController = {
  uploadPillPhoto: (req, res) => {
    // 이미지 파일 경로
    const imagePath = req.file.path;

    // 이미지 파일 경로에서 파일명 추출
    const imageName = path.basename(imagePath);

    // 파일명에 확장자를 붙여줍니다.
    const imageNameWithExtension = `${imageName}.png`; // 예를 들어 PNG 형식으로 이미지를 업로드한다고 가정합니다.

    // 파이썬 스크립트 실행
    exec(`python3 pill.py "${imageNameWithExtension}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(400).json({ error: 'Bad Request' });
      }

      // 정상적으로 결과가 출력될 경우
      const pillName = stdout.trim(); // 알약 이름
      return res.json({ pillName });
    });
  },
};

module.exports = pillController;
