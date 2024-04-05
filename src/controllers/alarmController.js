const UserMedication = require('../models/userMedication');
const alarmScheduler = require('../utils/alarmScheduler');

// 알람 설정 함수
const alarmController = {
    setAlarm: async (req, res) => {
        try {
          // 요청에서 사용자 아이디와 약 정보 가져오기
          const { userID, medicationName, dosage, times } = req.body;
      
          // 알람 설정 정보 저장
          const userMedication = new UserMedication({
            userID: userID,
            medicationName: medicationName,
            medicationInstruction: {
              dosage: dosage,
              times: times
            }
          });
      
          // 알람 스케줄링
          alarmScheduler.scheduleAlarm(userMedication);
      
          // 저장된 알람 설정 정보 응답
          const savedMedication = await userMedication.save();
          res.status(201).json(savedMedication);
        } catch (error) {
          console.error('알람 설정 중 에러 발생:', error);
          res.status(500).json({ error: '알람 설정 중 에러 발생' });
        }
    }
}

