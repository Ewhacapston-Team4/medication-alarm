const cv = require('opencv4nodejs');

const opencvService = {
  processPillPacketImage: async (image) => {
    // Image processing logic using OpenCV
    // Example: Convert image to grayscale
    const grayImage = image.cvtColor(cv.COLOR_BGR2GRAY);

    // Add more image processing logic as needed

    return grayImage;
  },
};

module.exports = opencvService;