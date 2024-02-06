// 약 봉투 찍기 관련 로직

const opencvService = require('../services/opencvService'); //
const ocrService = require('../services/ocrService');
const nlpService = require('../services/nlpService');
const alarmScheduler = require('../utils/alarmScheduler');

const imageController = {
  handlePillPacketImage: async (req, res) => {
    try {
      const image = req.body.image; // Assume image is sent in the request body

      // Image processing using OpenCV
      const processedImage = await opencvService.processPillPacketImage(image);

      // OCR to extract text
      const extractedText = await ocrService.extractText(processedImage);

      // Natural Language Processing to get medication information
      const medicationInfo = nlp.processText(extractedText);

      // Schedule medication alarm
      alarmScheduler.scheduleMedicationAlarm(medicationInfo);

      res.status(200).json({ success: true, message: 'Image processing successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = imageController;
