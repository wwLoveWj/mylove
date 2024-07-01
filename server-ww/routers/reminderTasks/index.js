const express = require("express");
const schedule = require("node-schedule");
const { sendMailFn, handleQueryDb } = require("../../utils");
const { mailInfoFn } = require("../../utils/config");

const router = express.Router();
// 发送邮件函数
function sendMail(mail, html, res, taskId) {
  let sqlStr = "UPDATE task_info SET status = 1 WHERE task_id = ?";
  const userInfo = mailInfoFn("blww885@163.com");
  let options = {
    from: userInfo.user, // sender address
    to: mail, // list of receivers
    subject: "待办事项提醒",
    html,
  };
  sendMailFn(options, res, userInfo.user, "待办提醒发送成功~", {
    sqlStr,
    taskId,
  });
}
// 任务提醒时间接口
router.post("/task", (req, res) => {
  let { reminderTime, taskId } = req.body;
  // 更新提醒的时间
  let sqlStr =
    "UPDATE task_info SET reminder_time = ?, status = 0 WHERE task_id = ?";
  handleQueryDb(sqlStr, [reminderTime, taskId], res, "任务提醒时间设置成功~", {
    data: req.body,
  });
});
// 创建定时提醒任务
router.post("/time", (req, res) => {
  let { userEmail, reminderContent, reminderTime, taskId } = req.body;
  // 定时任务：在提醒时间发送提醒邮件
  schedule.scheduleJob(reminderTime, () => {
    try {
      // 更新提醒的状态为已提醒
      sendMail(userEmail, reminderContent, res, taskId);
    } catch (error) {
      console.error("Send reminder email error:", error);
    }
  });
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

module.exports = router;
