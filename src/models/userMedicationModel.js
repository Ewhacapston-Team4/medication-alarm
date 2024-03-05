const mongoose = require('mongoose');
const { v4 : uuid } = require('uuid');

const userMedicationSchema = new mongoose.Schema({
  userMedicationID: { type: String, default: uuid(), unique: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicationID: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
  dosage: { type: Number, required: true },
  frequency: { type: String }, // You can choose between enum or string based on your needs
});

const UserMedication = mongoose.model('UserMedication', userMedicationSchema);

module.exports = UserMedication;