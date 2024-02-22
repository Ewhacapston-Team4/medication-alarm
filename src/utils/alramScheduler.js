const schedule = require('node-schedule');

const alarmScheduler = {
  scheduleDailyAlarm: (hour, minute, callback) => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = hour;
    rule.minute = minute;

    // 매일 정해진 시간에 알람 스케줄링
    const job = schedule.scheduleJob(rule, callback);

    return job;
  },
};

module.exports = alarmScheduler;
