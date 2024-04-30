const mongoose = require('mongoose');
const { v4 : uuid } = require('uuid');

const userMedicationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicationName: { type: String, required: true },
  medicationInstruction: {
    dosage: { type: String }, // 아침엔 한알 점심엔 반알 (알람 울릴 때 유저에게 뜨는 용)
    times: [{ type: String }], // ex) hour: 18, min: 30 -> 오후 6시 30분
  }
});

const UserMedication = mongoose.model('UserMedication', userMedicationSchema);

module.exports = UserMedication;