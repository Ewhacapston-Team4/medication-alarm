const UserMedication = require('../models/userMedication');
const alarmScheduler = require('../utils/alarmScheduler');
const UserMedication = require('../models/userMedicationModel')

const alarmController = {
    // 알람 설정
    setAlarm: async (req, res) => {
        const { userId } = req;
        const { medicationName, medicationInstruction } = req.body;

        try {
            let dosage = null;
            if (medicationInstruction.dosage) {
                dosage = medicationInstruction.dosage;
            }
            const times = medicationInstruction.times;
            
            const newAlarm = new UserMedication({
                userId,
                medicationName,
                medicationInstruction: { dosage, times }
            });

            const savedAlarm = await newAlarm.save();
            res.status(201).json(savedAlarm);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // 모든 알람 가져오기
    getAlarms: async (req, res) => {
        const { userId } = req;
        try {
            const alarms = await UserMedication.find({ userId });
            res.status(200).json(alarms);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // 특정 알람 삭제
    deleteAlarm: async (req, res) => {
        const { userId } = req;
        const { medicationName } = req.params;
        try {
            await UserMedication.findOneAndDelete({ userId, medicationName });
            res.status(200).json({ message: 'Alarm deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = alarmController;
