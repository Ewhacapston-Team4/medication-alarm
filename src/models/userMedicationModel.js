const mongoose = require('mongoose');
const { v4 : uuid } = require('uuid');

const userMedicationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicationName: { type: String, required: true },
  medicationInstruction: {
    dosage: { type: String },
    frequency: { type: String },
    times: [{ type: String }], //"18:00" 이런 형태? 
  }
});

const UserMedication = mongoose.model('UserMedication', userMedicationSchema);

module.exports = UserMedication;