const express = require("express");
const schedule = require("node-schedule");
const { sendMailFn, handleQueryDb } = require("../../utils");
const { mailInfoFn } = require("../../utils/config");
const { sendMailTemp } = require("../mails/template");
const dayjs = require("dayjs");
const router = express.Router();
// 发送邮件函数
function sendMail(mail, title, html, res, params) {
  const { reminderPattern, taskId } = params;
  let sqlStr = "UPDATE task_info SET status = 1 WHERE task_id = ?";
  const userInfo = mailInfoFn("blww885@163.com");
  let options = {
    from: userInfo.user, // sender address
    to: mail, // list of receivers
    subject: title || "待办事项提醒",
    html,
  };
  sendMailFn(options, res, userInfo.user, "待办提醒发送成功~", {
    sqlStr,
    taskId,
    reminderPattern,
  });
}

// ===========================更新任务提醒内容时间主题接口===============================
router.post("/task", (req, res) => {
  let {
    reminderTime,
    taskId,
    reminderPattern,
    interval,
    desc,
    userEmail,
    sendEmail,
  } = req.body;
  // 更新提醒的时间
  let sqlStr =
    "UPDATE task_info SET reminder_time = ?,reminder_pattern=?, interval_unit=?, description=?, reminder_email=?, send_email=?, status = 0 WHERE task_id = ?";
  handleQueryDb(
    sqlStr,
    [
      dayjs(reminderTime).format("YYYY-MM-DD HH:mm:ss"),
      reminderPattern,
      interval,
      desc,
      userEmail,
      sendEmail,
      taskId,
    ],
    res,
    "任务提醒时间设置成功~",
    {
      data: req.body,
    }
  );
});

// ==============================创建定时提醒=====================================
router.post("/time", (req, res) => {
  let {
    userEmail,
    reminderContent,
    reminderTitle,
    reminderTime,
    taskId,
    reminderPattern,
    interval,
    endTime,
    startTime,
  } = req.body;
  let rule;
  // //每个15、30、45秒执行
  // rule.second = [15, 30, 45];
  // // 每分钟的第10秒
  // rule.second = 10;
  // // 每小时的第10分钟
  // rule.minute = 10;
  // // 每周四，周五，周六，周天的17点
  // rule.dayOfWeek = [0, new schedule.Range(4, 6)];
  // rule.hour = 17;
  // rule.minute = 0;
  if (reminderPattern === "intervalTime") {
    rule = new schedule.RecurrenceRule();
    // 每小时的第10分钟
    // rule[interval] = Number(reminderTime);
    console.log(interval, "interval单位时间------------");
    // =======================周一到周日------------------------
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = Number(reminderTime);
    rule.minute = 0;
    //  =========================================================
  } else if (reminderPattern === "fixedTime") {
    rule = { start: startTime, end: endTime, rule: reminderTime };
  } else {
    rule = reminderTime;
  }
  console.log(rule, "提醒时间规则格式------------");

  // ==================================定时任务：在提醒时间发送提醒邮件======================================
  const job = schedule.scheduleJob(taskId, rule, (time) => {
    try {
      // 定时提醒时间到了发送邮件
      console.log("定时任务提醒时间", time);
      sendMail(userEmail, reminderTitle, reminderContent, res, {
        taskId,
        reminderPattern,
      });
    } catch (error) {
      console.error("Send reminder email error:", error);
    }
  });
  // 任务执行成功后的事件
  job.on("success", () => {
    // 存储任务的唯一值，用于取消任务，更新提醒的状态为已提醒
    let sqlStr =
      "UPDATE task_info SET job_id = ?, status = 0 WHERE task_id = ?";
    handleQueryDb(sqlStr, [job.name, taskId], null, "");
  });
  // job.cancel();

  // { hour: 15, minute: 31 }
  // "*/5 * * * * *"
  //每天下午5点21分发送
  //   schedule.scheduleJob({ hour: 15, minute: 31 }, function () {
  //     let sendTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  //     console.log(`✅任务创建成功，执行频率5s，` + sendTime);
  //     sendMail(
  //       "你好呀，我的宝贝老婆！",
  //       "<h1>系统邮件，请勿回复</h1><p>今天你看书了嘛？不看等下回来挨打</p>" +
  //         "<b>发送时间:" +
  //         sendTime +
  //         "</b>"
  //     );
  //   });
});

// ========================删除所有任务============================
function removeAll() {
  for (let i in schedule.scheduledJobs) {
    schedule.cancelJob(i);
  }
}
// =======================取消单个设置任务或者所有任务=====================
router.post("/task/cancel", (req, res) => {
  let { jobId, taskId, action, taskIdList } = req.body;
  if (action === "ALL") {
    removeAll();
    // 取消所有任务
    let sqlStr = `UPDATE task_info SET job_id = null, status = 2 WHERE task_id in ("${taskIdList.join('","')}")`;
    handleQueryDb(sqlStr, null, res, "所有任务取消成功~");
  } else {
    console.log(
      schedule?.scheduledJobs[jobId],
      "单任务取消处理----------------------"
    );
    // 更新取消后的任务状态
    let sqlStr =
      "UPDATE task_info SET job_id = ?, status = 2 WHERE task_id = ?";
    if (schedule.scheduledJobs[jobId]) {
      schedule.scheduledJobs[jobId]?.cancel();
      handleQueryDb(sqlStr, [null, taskId], res, "任务取消成功~");
    } else {
      res.send({
        code: 0,
        data: null,
        msg: "当前任务还未设置提醒",
      });
    }
  }
});

// ===================测试邮件模板===============
router.post("/test", (req, res) => {
  let { sendToUser } = req.body;
  // 更新提醒的时间
  sendMailTemp(sendToUser);
});
module.exports = router;
