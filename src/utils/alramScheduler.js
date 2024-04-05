const schedule = require('node-schedule');

// 알람 스케줄링 함수
exports.scheduleAlarm = (userMedication) => {
  userMedication.medicationInstruction.times.forEach(time => {
    const alarmTime = new Date();
    alarmTime.setHours(time.hour);
    alarmTime.setMinutes(time.minute);
    schedule.scheduleJob(alarmTime, function() {
      // 여기에 알람 발송 로직을 구현
      console.log(`알람: ${userMedication.medicationName} 복용 시간입니다.`);
    });
  });
};
