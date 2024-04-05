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
      
      res.status(200).json({ message: 'Image uploaded and converted to PNG successfully' });

      const newImagePath = path.join(__dirname, '..', 'controllers', 'uploads', imageName);

      // 파이썬 스크립트 실행 코드
    });
  },
};

module.exports = pillController;
