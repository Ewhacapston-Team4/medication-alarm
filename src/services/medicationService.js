const medicationService = {
    processDetectedObjects: (detectedObjects) => {
      // Process detected objects from YOLO to get medication information
      // Example: Extract medication name and dosage from detectedObjects
      const medicationInfo = extractMedicationInfo(detectedObjects);
  
      return medicationInfo;
    },
  };
  
  module.exports = medicationService;
  