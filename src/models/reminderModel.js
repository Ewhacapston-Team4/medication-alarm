const mongoose = require('mongoose');
const { v4 : uuid } = require('uuid');

const reminderSchema = new mongoose.Schema({
  reminderID: { type: String, default: uuid(), unique: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicationID: { type: mongoose.Schema.Types.ObjectId, ref: 'UserMedication', required: true },
  reminderTime: { type: String }, // Adjust data type based on your preference (e.g., Date, String)
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;