const UserMedication = require('../models/userMedication');
const alarmScheduler = require('../utils/alarmScheduler');
const UserMedication = require('../models/userMedicationModel')

// 알람 설정 함수
const alarmController = {
    //알람 설정
    setAlarm: async (req, res) => {
        const { userId } = req;
        const { medicationName, medicationInstruction } = req.body;

        try {
            const { dosage, times } = medicationInstruction;
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
    getAlarms : async (req, res) => {
        const { userId } = req;
    },
    // 특정 알람 삭제
    deleteAlarm : async (req, res) => {
        const { userId } = req;
        medicationName = req.params.medicationName;
    }
}

//유유