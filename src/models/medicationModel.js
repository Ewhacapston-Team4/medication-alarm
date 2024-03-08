const mongoose = require('mongoose');
const { v4 : uuid } = require('uuid');

const medicationSchema = new mongoose.Schema({
  medicationID: { type: String, default: uuid(), unique: true },
  medicationName: { type: String, required: true },
});

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;