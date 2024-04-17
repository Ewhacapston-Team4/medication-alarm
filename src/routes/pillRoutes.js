const express = require('express');
const multer = require('multer');
const router = express.Router();
const pillController = require('../controllers/pillController');
const searchPillController = require('../controllers/searchPillController');
const combinedPillController = require('../controllers/combinedPillController');

// multer 설정: 이미지 업로드를 처리합니다.
const uploadTri = multer({
    dest: 'src/controllers/uploads/tri/',
    limits: {
      fileSize: 10 * 1024 * 1024, // 최대 10MB 크기 제한
    },
  });

const uploadPent = multer({
    dest: 'src/controllers/uploads/pent/',
    limits: {
      fileSize: 10 * 1024 * 1024, // 최대 10MB 크기 제한
    },
  });

  const uploadHex = multer({
    dest: 'src/controllers/uploads/hex/',
    limits: {
      fileSize: 10 * 1024 * 1024, // 최대 10MB 크기 제한
    },
  });



// POST 요청 핸들러: 이미지를 업로드하고 pillController.uploadPillPhoto 함수로 라우팅합니다.
router.post('/upload/tri', uploadTri.single('image'), pillController.uploadTriPillPhoto);
router.post('/upload/pent', uploadPent.single('image'), pillController.uploadPentPillPhoto);
router.post('/upload/hex', uploadHex.single('image'), pillController.uploadHexPillPhoto);

router.get('/searchSeq/:pillName', searchPillController.searchSeq);
router.get('/search/:pillSeq', searchPillController.searchPill);
router.get('/combine/:pillSeq', combinedPillController.combinedPill);


module.exports = router;
