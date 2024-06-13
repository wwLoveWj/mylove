const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("node:fs");
const dayjs = require("dayjs");

const mailInfo = yaml.load(
  fs.readFileSync(path.join(__dirname, "./mail/mail.yaml"), "utf-8")
);
// 首先初始化一下邮件服务
const transport = nodemailer.createTransport({
  // service: "qq", //服务商
  host: "smtp.163.com", //qq的为"smtp.qq.com"
  port: 465,
  secure: true, //是否开启https
  auth: {
    user: mailInfo.user, //邮箱
    pass: mailInfo.pass, //密码|授权码
  },
});
// 发送邮件函数
async function sendMail(text, html) {
  let info = await transport.sendMail({
    from: `亲爱的老公<${mailInfo.user}>`, // sender address
    to: `亲爱的老婆<${mailInfo.to}>`, // list of receivers
    subject: "亲爱的老婆", // Subject line
    text: text, // plain text body
    html,
  });
  console.log("发送成功", info);
}

//测试一下
// sendMail("你好呀，我的宝贝老婆！");

//每天下午5点21分发送
schedule.scheduleJob({ hour: 15, minute: 35 }, function () {
  console.log("启动任务:" + new Date());
  let sendTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  sendMail(
    "你好呀，我的宝贝老婆！",
    "<h1>系统邮件，请勿回复</h1><p>今天你看书了嘛？不看等下回来挨打</p>" +
      "<b>发送时间:" +
      sendTime +
      "</b>"
  );
});
