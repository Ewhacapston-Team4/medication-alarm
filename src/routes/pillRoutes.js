const express = require('express');
const multer = require('multer');
const router = express.Router();
const pillController = require('../controllers/pillController');
const searchPillController = require('../controllers/searchPillController');

// multer 설정: 이미지 업로드를 처리합니다.
const upload = multer({ dest: 'src/controllers/uploads/' });

// POST 요청 핸들러: 이미지를 업로드하고 pillController.uploadPillPhoto 함수로 라우팅합니다.
router.post('/upload', upload.single('image'), pillController.uploadPillPhoto);

router.get('/:pillName', searchPillController.searchPill);

module.exports = router;
