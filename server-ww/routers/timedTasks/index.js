const schedule = require("node-schedule");
const notifier = require("node-notifier"); //在 Node.js 中发送跨平台通知的工具
const dayjs = require("dayjs");
const { sendMailFn } = require("../../utils");
const { mailInfoFn } = require("../../utils/config");

// 发送邮件函数
async function sendMail(text, html) {
  const userInfo = mailInfoFn("blww885@163.com");
  let options = {
    from: `亲爱的老公<${userInfo.user}>`, // sender address
    to: `亲爱的老婆<${userInfo.current}>`, // list of receivers
    subject: "亲爱的老婆",
    text,
    html,
  };
  await sendMailFn(options, null, userInfo.user);
  notifier.notify({
    title: "待办通知",
    message: "已向xxxx发送读书通知",
    sound: "Submarine",
    closeLabel: "CANCEL",
    actions: "OK",
  });
}

// { hour: 15, minute: 31 }
// "*/5 * * * * *"
//每天下午5点21分发送
schedule.scheduleJob({ hour: 15, minute: 31 }, function () {
  let sendTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(`✅任务创建成功，执行频率5s，` + sendTime);
  sendMail(
    "你好呀，我的宝贝老婆！",
    "<h1>系统邮件，请勿回复</h1><p>今天你看书了嘛？不看等下回来挨打</p>" +
      "<b>发送时间:" +
      sendTime +
      "</b>"
  );
});
