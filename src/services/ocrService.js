const Tesseract = require('tesseract.js');

const ocrService = {
  extractText: async (image) => {
    // OCR (Optical Character Recognition) logic using Tesseract
    const { data: { text } } = await Tesseract.recognize(image, 'eng');
    return text;
  },
};

module.exports = ocrService;
