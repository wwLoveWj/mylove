const express = require("express");
const schedule = require("node-schedule");
const notifier = require("node-notifier"); //在 Node.js 中发送跨平台通知的工具
const dayjs = require("dayjs");
const { sendMailFn, camelCaseKeys, handleQueryDb } = require("../../utils");
const { mailInfoFn } = require("../../utils/config");

const router = express.Router();
// 发送邮件函数
async function sendMail(mail, html, res) {
  const userInfo = mailInfoFn("blww885@163.com");
  let options = {
    from: userInfo.user, // sender address
    to: mail, // list of receivers
    subject: "待办事项提醒",
    html,
  };
  await sendMailFn(options, res, userInfo.user);
  notifier.notify({
    title: "待办通知",
    message: "已向xxxx发送读书通知",
    sound: "Submarine",
    closeLabel: "CANCEL",
    actions: "OK",
  });
}

router.post("/task", (req, res) => {
  let { userEmail, reminderContent, reminderTime, taskId } = req.body;

  // 定时任务：在提醒时间发送提醒邮件
  schedule.scheduleJob(reminderTime, async () => {
    try {
      await sendMail(userEmail, reminderContent, res);
      // 更新提醒的状态为已提醒
      let completeTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      let sqlStr =
        "UPDATE task_info SET status = 1, complete_time = ? WHERE task_id = ?";
      handleQueryDb(sqlStr, [completeTime, taskId], res, "✅任务提醒发送成功~");
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
